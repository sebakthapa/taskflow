"use client"

import TaskItem from '@/components/TaskItem'
import { DailyTasksContext, MonthlyTasksContext } from '@/context/taskContext'
import { getDate, getDateth, getDayName, getMonthName } from '@/lib/date'
import { auth, db } from '@/lib/firebase'
import { Timestamp, addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import moment from 'moment/moment'
import { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsPlus } from 'react-icons/bs'
import TasksList from './TasksList'


const TaskListsModal = ({ duration }) => {
    duration = duration.toLowerCase();
    const [user, loading, error] = useAuthState(auth);

    // add task data
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const { dailyTasks, setDailyTasks } = useContext(DailyTasksContext);
    const { monthlyTasks, setMonthlyTasks } = useContext(MonthlyTasksContext);

    // console.log()


    const [showAddTaskForm, setShowAddTaskForm] = useState(false)

    const getTimestamp = (time) => {
        return time ? Timestamp.fromDate(new Date(moment(time, "hh mm").format("lll"))) : null
    }


    const handleTaskAdd = async (e) => {
        e.preventDefault();
        if (!title) {
            alert("Title is required Field")
        } else {
            const startTime = start ? getTimestamp(start) : null;
            const endTime = end ? getTimestamp(end) : null;

            const data = {
                startTime,
                endTime,
                title,
                description: description ? description : null,
                status: "incomplete",
                uid: user.uid,
                createdAt: getTimestamp(new Date())
            }

            try {
                const docRef = await addDoc(collection(db, collectionName), data);
                // console.log({ ...docRef.data(), id: doc.id })

                console.log("data added successfully")
                setShowAddTaskForm(false)
                // console.log(await getDoc())
            } catch (err) {
                console.log(err)
            }

            // console.log(Timestamp.fromDate(`${get}`))
            // console.log(new Date(moment(start, "hh mm").format("lll")))

            // console.log("timestamp date", getTimestamp(new Date()))
            // console.log(getTimestamp())
            // console.log(getTimestamp(new Date()))
            // console.log(Date.now())
            // console.log(tasks);
        }

    }


    let setTasks, collectionName;
    const [tasks, setDataTasks] = useState(null)
    if (duration == "daily") {
        setTasks = setDailyTasks;
        collectionName = "daily_tasks"
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

    }, [dailyTasks, monthlyTasks, tasks])

    useEffect(() => {
        if (user?.uid) {
            const q = query(collection(db, collectionName), where("uid", "==", user?.uid), orderBy("createdAt", "desc"));
            onSnapshot(q, (querySnapshot) => {
                const fetchedTasks = [];
                querySnapshot.forEach((doc) => {
                    fetchedTasks.push(doc.data());
                });
                setTasks(fetchedTasks);
            });
        }
    }, [user])



    return (
        <div className='todayTask w-2/5 bg-[rgba(180,180,200,.2)] py-5 px-7 rounded-2xl ml-5 mt-5 bg_blur max-h-[600px] overflow-auto'>
            <div className="header flex justify-between mt-3">
                <div className="title">
                    <h2 className='title text-2xl font-semibold capitalize'>{duration} Tasks</h2>
                    <p className='text-zinc-600'>{`${getDayName()}, ${getDateth()} ${getMonthName()} `}</p>
                </div>
                <button className={`add-task flex items-center gap-1 font-medium hover:-translate-y-1 transition  p-2 pr-4 cursor-pointer rounded-xl active:scale-90 ${showAddTaskForm ? "bg-red-200 text-red-700" : "bg-indigo-200 text-blue-700"}`} onClick={() => setShowAddTaskForm((prev) => !prev)}>
                    <BsPlus className={`h-7 w-7 ${showAddTaskForm && "rotate-45"}`} />
                    <p className="text  text-xl capitalize">{showAddTaskForm ? "Cancel add" : "New Task"}</p>
                </button>
            </div>
            <div className="nav flex justify-between items-center py-5 mt-4 text-gray-500">
                <p className='cursor-pointer border-r-[3px] border-gray-300 border-solid pr-5 flex items-center'>All <span className='text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5'>10</span></p>
                <p className='cursor-pointer pr-3 flex items-center'>Open <span className='text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5'>10</span></p>
                <p className='cursor-pointer pr-3 flex items-center'>Closed <span className='text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5'>10</span></p>
                <p className='cursor-pointer pr-3 flex items-center'>Archived <span className='text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5'>10</span></p>
            </div>
            <div className="tasklists pt-5">
                {
                    showAddTaskForm && (
                        <div className="addtask mb-5">
                            <div className='taskitem bg-zinc-100 px-5 rounded-2xl'>
                                <div className="top flex items-center justify-between pt-5 pb-3 ">
                                    <div className="texts ">
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title*' required className="title font-semibold text-xl text-gray-700 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full focus:border-indigo-400" />
                                        <textarea rows={1} value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' className="description h-fit text-gray-400 mt-1 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none w-full mt-5 focus:border-indigo-400" />
                                    </div>

                                </div>
                                <div className="bottom flex items-center justify-between py-5">

                                    <div className="time flex gap-2 text-zinc-400 font-light">
                                        <div>
                                            <input value={start} onChange={(e) => setStart(e.target.value)} type="time" className="start px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
                                            <p className="start text-sm mt-2">Start Time</p>
                                        </div>
                                        <p className="distinguisher">-</p>
                                        <div>
                                            <input value={end} onChange={(e) => setEnd(e.target.value)} type="time" placeholder='End-time' className="end px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
                                            <p className="end text-sm mt-2">End Time</p>
                                        </div>
                                    </div>


                                    <div className="actions flex gap-3">
                                        <button className='bg-green-500 hover:bg-green-400 transition  active:scale-90 rounded py-2 px-5 font-medium' onClick={handleTaskAdd}>Add</button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }
                {


                    tasks?.length > 0 ? (
                        <>
                            {
                                tasks.map(({ title, description, startTime, endTime, id, status }, idx) => {
                                    // console.log("startTime>", startTime.toDate().toLocaleDateString())
                                    // console.log(new Date().toLocaleDateString() === startTime.toDate().toLocaleDateString() )
                                    return <TaskItem key={idx} id={id} title={title} description={description} status={status} start={startTime?.toDate().toLocaleTimeString()} end={endTime?.toDate().toLocaleTimeString()} />
                                })
                            }
                        </>
                    ) : (
                        <>
                            {
                                showAddTaskForm || (
                                    <div className="notasks flex flex-col items-center py-10">
                                        <h2 className='w-fit font-medium text-xl text-gray-500'>No Tasks to display</h2>
                                        <h2 className='w-fit  text-gray-400'>Create new task or <span className='font-medium underline text-blue-400 cursor-pointer'>add last day's incomplete tasks</span> </h2>
                                    </div>
                                )
                            }
                        </>

                    )

                }
                {/* <TaskItem title="Pick up Adam" description="Pick Adam from school" start="10:00 PM" end="11:20 PM" /> */}
                {/* <div className="notasks flex flex-col items-center py-10">
    <h2 className='w-fit font-medium text-xl text-gray-500'>No Tasks to display</h2>
    <h2 className='w-fit  text-gray-400'>Create new task or <span className='font-medium underline text-blue-400 cursor-pointer'>add last day's incomplete tasks</span> </h2>
  </div> */}
                {/* <div className="addtask">
                    <div className='taskitem bg-zinc-100 px-5 rounded-2xl'>
                        <div className="top flex items-center justify-between pt-5 pb-3 ">
                            <div className="texts ">
                                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title*' required className="title font-semibold text-xl text-gray-700 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full focus:border-indigo-400" />
                                <textarea rows={1} value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' className="description h-fit text-gray-400 mt-1 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none w-full mt-5 focus:border-indigo-400" />
                            </div>

                        </div>
                        <div className="bottom flex items-center justify-between py-5">

                            <div className="time flex gap-2 text-zinc-400 font-light">
                                <div>
                                    <input value={start} onChange={(e) => setStart(e.target.value)} type="time" className="start px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
                                    <p className="start text-sm mt-2">Start Time</p>
                                </div>
                                <p className="distinguisher">-</p>
                                <div>
                                    <input value={end} onChange={(e) => setEnd(e.target.value)} type="time" placeholder='End-time' className="end px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
                                    <p className="end text-sm mt-2">End Time</p>
                                </div>
                            </div>


                            <div className="actions flex gap-3">
                                <button className='bg-green-500 hover:bg-green-400 transition  active:scale-90 rounded py-2 px-5 font-medium' onClick={handleTaskAdd}>Add</button>

                            </div>
                        </div>

                    </div>
                </div> */}


            </div>
        </div>
    )
}








export default TaskListsModal
