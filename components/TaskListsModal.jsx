"use client"

import TaskItem from '@/components/TaskItem'
import { DailyTasksContext, MonthlyTasksContext } from '@/context/taskContext'
import { getDate, getDateth, getDayName, getFullDateFromStr, getFullDateStr, getMonth, getMonthName, getTimeFromStr, getYear } from '@/lib/date'
import { auth, db } from '@/lib/firebase'
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, where, writeBatch } from 'firebase/firestore'
import moment from 'moment/moment'
import { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsPlus } from 'react-icons/bs'
import AddTask from './AddTask'


const TaskListsModal = ({ duration }) => {
    duration = duration.toLowerCase();
    const [user, loading, error] = useAuthState(auth);

    const { dailyTasks, setDailyTasks } = useContext(DailyTasksContext);
    const { monthlyTasks, setMonthlyTasks } = useContext(MonthlyTasksContext);


    //managing variables for different durations
    let setTasks, collectionName, snapQuery;
    const [tasks, setDataTasks] = useState(null);


    //managing tabs
    const [selectedTab, setSelectedTab] = useState("all");
    const [allCount, setAllCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [filteredTasks, setFilteredTasks] = useState(tasks)



    const [showAddTaskForm, setShowAddTaskForm] = useState(false)




    if (duration == "daily") {
        setTasks = setDailyTasks;
        collectionName = "daily_tasks";
    } else {
        setTasks = setMonthlyTasks;
        collectionName = "monthly_tasks"
    }



    useEffect(() => {
        // console.log("dtask>", dailyTasks)
        if (duration == "daily") {
            setDataTasks(dailyTasks)
        } else {
            setDataTasks(monthlyTasks)
        }

        selectedTab === "all" && setFilteredTasks(tasks)

    }, [dailyTasks, monthlyTasks, tasks])


    let startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    let endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    // ref.where('start','>=',startOfToday).where('start', '<=', endOfToday)
    // console.log("start of today >>>>>>>>>>>>", startOfToday);




    const handleTaskFilter = async (tab, data) => {
        const newTaskArr = [];
        const array = data ? data : tasks;
        await array?.map((task) => {
            if (tab == "completed") {
                if (task.status == "completed") {
                    newTaskArr.push(task)
                }
            } else if (tab == "pending") {
                if (task.status == "pending") {
                    newTaskArr.push(task)
                }
            } else if (tab == "all") {
                newTaskArr.push(task)
            } else {
                console.error("handleFilterTask error: line 91")
            }
        });
        setFilteredTasks(newTaskArr);
    }


    const handleTaskImport = async () => {
        console.log(collectionName)
        let importQuery;
        const date = getDate();
        const month = getMonth()
        const lastDay = `${getYear()}${getMonth()}${date < 10 ? `0${date - 1}` : date - 1}`;
        const lastMonth = `${getYear()}${month < 10 ? `0${month - 1}` : month - 1}`;

        // const collectionRef = collection(db, collectionName)

        if (duration == "daily") {
            importQuery = query(collection(db, collectionName), where("uid", "==", user?.uid), where("createdAt", "==", lastDay), where("status", "==", "pending"), orderBy("status", "desc"), orderBy("startTime", "asc"), orderBy("endTime", "asc"),);
        } else {
            importQuery = query(collection(db, collectionName), where("uid", "==", user?.uid), where("createdAt", "==", lastMonth), where("status", "==", "pending"), orderBy("status", "desc"), orderBy("startTime", "asc"), orderBy("endTime", "asc"), orderBy("createdAt", "desc"));
        }
        try {

            // Get a new write batch
            const batch = writeBatch(db);

            const querySnapshot = await getDocs(importQuery);
            const importedData = await querySnapshot.docs;

            if (importedData.length > 0) {
                if (confirm(`All the previous ${duration === "daily" ? "day's" : "month's"} will be added`)) {
                    importedData.map((document) => {
                        console.log("I RAN")
                        const oldData = document.data();
                        console.log(oldData)
    
                        const newData = { ...oldData, createdAt: duration === "daily" ? getFullDateStr() : `${getYear()}${getMonth()}` }
    
                        // doc ref
                        console.log("before docref")
                        const docRef = doc(db, collectionName, document.id);
    
    
                        // Set the value of 'NYC'
                        batch.update(docRef, newData)
    
                        // return { ...document.data(), id: doc.id }
    
                    });
                    // console.log(newData)
    
                    // Commit the batch
                    await batch.commit();
                    console.log("DONE")
                }
                
            } else {
                alert(`NO pending task of last ${duration == "daily" ? "day" : "month"}`);
                return;
            }



        } catch (err) {
            console.log(err)

        }
    }




    useEffect(() => {
        handleTaskFilter(selectedTab, tasks)
    }, [selectedTab, tasks])


    useEffect(() => {
        if (user?.uid) {
            if (duration == "daily") {
                snapQuery = query(collection(db, collectionName), where("uid", "==", user?.uid), where("createdAt", "==", getFullDateStr()), orderBy("status", "desc"), orderBy("startTime", "asc"), orderBy("endTime", "asc"),);
            } else {
                snapQuery = query(collection(db, collectionName), where("uid", "==", user?.uid), orderBy("status", "desc"), where("createdAt", "==", `${getYear()}${getMonth()}`), orderBy("startTime", "asc"), orderBy("endTime", "asc"), orderBy("createdAt", "desc"));
            }

            const q = snapQuery;
            onSnapshot(q, (querySnapshot) => {
                setPendingCount(0)
                setCompletedCount(0)
                setAllCount(0)

                const fetchedTasks = [];
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    fetchedTasks.push({ ...docData, id: doc.id });


                    if (docData.status === "pending") {
                        setPendingCount((prev) => ++prev)
                    } else if (docData.status = "completed") {
                        setCompletedCount((prev) => ++prev)
                    }
                    setAllCount((prev) => ++prev)
                });
                setTasks(fetchedTasks);

            });
        }
    }, [user])



    const formatDateToDisplay = (time) => {
        if (duration == "daily") {
            return time != `${getFullDateStr()}235900` ? moment(getTimeFromStr(time), "hhmm").format("hh:mm A") : "";
        } else {
            return time != `${getYear()}${getMonth()}32000000` ? moment(getFullDateFromStr(time), "YYYYMMDD").format("Do MMMM") : "";

        }

    }



    return (
        <div className='todayTask w-2/5 bg-[rgba(180,180,200,.2)] py-5 px-7 rounded-2xl ml-5 mt-5 bg_blur '>
            <div className="header flex justify-between mt-3">
                <div className="title">
                    <h2 className='title text-2xl font-semibold capitalize'>{duration} Tasks</h2>
                    <p className='text-zinc-600'>
                        {
                            duration === "daily" ? (
                                `${getDayName()}, ${getDateth()} ${getMonthName()} `
                            ) : (
                                `${getMonthName()}, ${getYear()} `
                            )
                        }</p>
                </div>
                <button className={`add-task flex items-center gap-1 font-medium hover:-translate-y-1 transition  p-2 pr-4 cursor-pointer rounded-xl active:scale-90 ${showAddTaskForm ? "bg-red-200 text-red-700" : "bg-indigo-200 text-blue-700"}`} onClick={() => setShowAddTaskForm((prev) => !prev)}>
                    <BsPlus className={`h-7 w-7 ${showAddTaskForm && "rotate-45"}`} />
                    <p className="text  text-xl capitalize">{showAddTaskForm ? "Cancel add" : "New Task"}</p>
                </button>
            </div>
            <div className="nav flex justify-between items-center py-5 px-5 mt-4 text-gray-500">
                <p onClick={() => { setSelectedTab("all") }} className={`cursor-pointer border-r-[2px] border-gray-400  border-solid pr-10 flex items-center ${selectedTab == "all" && "font-medium text-indigo-500 pointer-events-none"}`}>All <span className={`text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5 ${selectedTab == "all" && "font-medium text-gray-50 bg-indigo-500"}`}>{allCount}</span></p>
                <p onClick={() => { setSelectedTab("pending") }} className={`cursor-pointer pr-5 flex items-center ${selectedTab == "pending" && "font-medium text-indigo-500 pointer-events-none"}`}>Pending <span className={`text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5 ${selectedTab == "pending" && "font-medium text-gray-50 bg-indigo-500"}`}>{pendingCount}</span></p>
                <p onClick={() => { setSelectedTab("completed") }} className={`cursor-pointer pr-5 flex items-center ${selectedTab == "completed" && "font-medium text-indigo-500 pointer-events-none"}`}>Completed <span className={`text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5 ${selectedTab == "completed" && "font-medium text-gray-50 bg-indigo-500"}`}>{completedCount}</span></p>


            </div>
            <div className="tasklists pt-5 max-h-[450px] overflow-auto pr-3">
                {
                    showAddTaskForm && (
                        <AddTask type="add" uid={user?.uid} collectionName={collectionName} setShowAddTaskForm={setShowAddTaskForm} />
                    )
                }
                {


                    filteredTasks?.length > 0 ? (
                        <>
                            {
                                filteredTasks.map(({ title, description, startTime, endTime, id, status }, idx) => {
                                    return <TaskItem
                                        setShowTaskAddForm={setShowAddTaskForm}
                                        key={idx}
                                        id={id}
                                        title={title}
                                        description={description}
                                        status={status}
                                        start={formatDateToDisplay(startTime)}
                                        end={formatDateToDisplay(endTime)}
                                        collectionName={collectionName} />
                                })
                            }
                        </>
                    ) : (
                        <>
                            {
                                showAddTaskForm || (
                                    <div className="notasks flex flex-col items-center py-10">
                                        <h2 className='w-fit font-medium text-xl text-gray-500'>No Tasks to display</h2>
                                        {selectedTab === "all" && <h2 className='w-fit  text-gray-400'>Create new task or <span className='font-medium underline text-blue-400 cursor-pointer' onClick={handleTaskImport}>add last {duration === "daily" ? "day's" : "month's"} pending tasks</span> </h2>}
                                    </div>
                                )
                            }
                        </>

                    )

                }
            </div>
        </div>
    )
}








export default TaskListsModal
