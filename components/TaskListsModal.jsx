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

    //data from context api
    const { dailyTasks, setDailyTasks } = useContext(DailyTasksContext);
    const { monthlyTasks, setMonthlyTasks } = useContext(MonthlyTasksContext);
    // console.log("dailytasks>", dailyTasks)
    // console.log("monthlytasks>", monthlyTasks)



    // //showing add task form
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);





    // // manage monthly or daily
    // const [tasks, setDataTasks] = useState(undefined);

    // console.log("tasks>>>", tasks)

    // let setTasks, docRef, q;
    const manageDuration = () => {
        if (duration == "daily") {
            q = query(collection(db, "daily_tasks"), where("uid", "==", user?.uid));
            setDataTasks(dailyTasks);
            docRef = collection(db, "daily_tasks");
            setTasks = setDailyTasks;
        } else if (duration == "monthly") {
            q = query(collection(db, "monthly_tasks"), where("uid", "==", user?.uid));
            // tasks = monthlyTasks;
            setDataTasks(monthlyTasks);

            docRef = collection(db, "monthly_tasks");
            setTasks = setMonthlyTasks;
        }

    }





    const getTasks = async (q) => {
        try {
            const querySnapshot = await getDocs(q, orderBy('createdAt', "asc"));

            const newData = querySnapshot.docs.map((doc) => {
                return ({ ...doc.data(), id: doc.id })
            });
            setTasks(newData);

        } catch (err) {
            console.log(err)
        }


    }


    const [tasks, setDataTasks] = useState(undefined);
    let setTasks, docRef, q, collectionName;
    

    useEffect(() => {
        if (duration === "daily") {
            collectionName="daily_tasks"
            // q = query(collection(db, "daily_tasks"), where("uid", "==", user?.uid));
            setDataTasks(dailyTasks);
            docRef = collection(db, "daily_tasks");
            setTasks = setDailyTasks;
        } else if (duration === "monthly") {
            collectionName="monthly_tasks"
            // q = query(collection(db, "monthly_tasks"), where("uid", "==", user?.uid));
            // tasks = monthlyTasks;
            setDataTasks(monthlyTasks);
            docRef = collection(db, "monthly_tasks");
            setTasks = setMonthlyTasks;
        }
        

        if (!dailyTasks || !monthlyTasks) {
            if (user?.uid) {
                
                getTasks(q);

                // const quer = query(collection(db, duration === "daily" ? "daily_tasks" : "monthly_tasks"), orderBy('createdAt', 'asc'))
                // onSnapshot(quer, (querySnapshot) => {
                //     setTasks(querySnapshot.docs.map(doc => ({
                //         id: doc.id,
                //         data: doc.data()
                //     })))
                // })

                // console.log("setTasks", setTasks)
                // console.log("setTasks", setMonthlyTasks)
                console.log(tasks)
            }

        }

    }, [user])

    return (
        <div className='todayTask w-2/5 bg-[rgba(180,180,200,.2)] py-5 px-7 rounded-2xl ml-5 mt-5 bg_blur'>
            <div className="header flex justify-between mt-3">
                <div className="title">
                    <h2 className='title text-2xl font-semibold capitalize'>{duration} Tasks</h2>
                    <p className='text-zinc-600'>{`${getDayName()}, ${getDateth()} ${getMonthName()} `}</p>
                </div>
                <button className="add-task flex items-center gap-1 bg-indigo-200 text-blue-700 font-medium hover:-translate-y-1 transition duration-500 p-2 pr-4 cursor-pointer rounded-xl active:scale-95" onClick={() => setShowAddTaskForm((prev) => !prev)}>
                    <BsPlus className='h-7 w-7' />
                    <p className="text  text-xl">New Task</p>
                </button>
            </div>
            <div className="nav flex justify-between items-center py-5 mt-4 text-gray-500">
                <p className='cursor-pointer border-r-[3px] border-gray-300 border-solid pr-5 flex items-center'>All <span className='text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5'>10</span></p>
                <p className='cursor-pointer pr-3 flex items-center'>Open <span className='text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5'>10</span></p>
                <p className='cursor-pointer pr-3 flex items-center'>Closed <span className='text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5'>10</span></p>
                <p className='cursor-pointer pr-3 flex items-center'>Archived <span className='text-xs ml-1 rounded-xl bg-gray-300 px-2 py-0.5'>10</span></p>
            </div>
            <div className="tasklists pt-5">
                <TasksList setTasks={duration === "daily" ? setDailyTasks : setMonthlyTasks} tasks={duration === "daily" ? dailyTasks : monthlyTasks} collectionName={collectionName} showAddTaskForm={showAddTaskForm} setShowAddTaskForm={setShowAddTaskForm} />
            </div>
        </div>
    )
}
//     <div className="tasklists pt-5 ">

//         {
//             showAddTaskForm && (
//                 <div className="addtask">
//                     <div className='taskitem bg-zinc-100 px-5 rounded-2xl'>
//                         <div className="top flex items-center justify-between pt-5 pb-3 ">
//                             <div className="texts ">
//                                 <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title*' required className="title font-semibold text-xl text-gray-700 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full focus:border-indigo-400" />
//                                 <textarea rows={1} value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' className="description h-fit text-gray-400 mt-1 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none w-full mt-5 focus:border-indigo-400" />
//                             </div>

//                         </div>
//                         <div className="bottom flex items-center justify-between py-5">

//                             <div className="time flex gap-2 text-zinc-400 font-light">
//                                 <div>
//                                     <input value={start} onChange={(e) => setStart(e.target.value)} type="time" className="start px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
//                                     <p className="start text-sm mt-2">Start Time</p>
//                                 </div>
//                                 <p className="distinguisher">-</p>
//                                 <div>
//                                     <input value={end} onChange={(e) => setEnd(e.target.value)} type="time" placeholder='End-time' className="end px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
//                                     <p className="end text-sm mt-2">End Time</p>
//                                 </div>
//                             </div>


//                             <div className="actions flex gap-3">
//                                 <button className='bg-green-500 hover:bg-green-400 transition  active:scale-90 rounded py-2 px-5 font-medium' onClick={handleTaskAdd}>Add</button>

//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             )
//         }
//         {


//             tasks?.length > 0 ? (
//                 <>
//                     {
//                         tasks.map(({ title, description, startTime, endTime, id, status }, idx) => {
//                             // console.log("startTime>", startTime.toDate().toLocaleDateString())
//                             // console.log(new Date().toLocaleDateString() === startTime.toDate().toLocaleDateString() )
//                             return <TaskItem key={idx} id={id} title={title} description={description} status={status} start={startTime?.toDate().toLocaleTimeString()} end={endTime?.toDate().toLocaleTimeString()} />
//                         })
//                     }
//                 </>
//             ) : (
//                 <>
//                     {
//                         showAddTaskForm || (
//                             <div className="notasks flex flex-col items-center py-10">
//                                 <h2 className='w-fit font-medium text-xl text-gray-500'>No Tasks to display</h2>
//                                 <h2 className='w-fit  text-gray-400'>Create new task or <span className='font-medium underline text-blue-400 cursor-pointer'>add last day's incomplete tasks</span> </h2>
//                             </div>
//                         )
//                     }
//                 </>

//             )

//         }
//         {/* <TaskItem title="Pick up Adam" description="Pick Adam from school" start="10:00 PM" end="11:20 PM" /> */}
//         {/* <div className="notasks flex flex-col items-center py-10">
//     <h2 className='w-fit font-medium text-xl text-gray-500'>No Tasks to display</h2>
//     <h2 className='w-fit  text-gray-400'>Create new task or <span className='font-medium underline text-blue-400 cursor-pointer'>add last day's incomplete tasks</span> </h2>
//   </div> */}
//         {/* <div className="addtask">
//                     <div className='taskitem bg-zinc-100 px-5 rounded-2xl'>
//                         <div className="top flex items-center justify-between pt-5 pb-3 ">
//                             <div className="texts ">
//                                 <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title*' required className="title font-semibold text-xl text-gray-700 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full focus:border-indigo-400" />
//                                 <textarea rows={1} value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' className="description h-fit text-gray-400 mt-1 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none w-full mt-5 focus:border-indigo-400" />
//                             </div>

//                         </div>
//                         <div className="bottom flex items-center justify-between py-5">

//                             <div className="time flex gap-2 text-zinc-400 font-light">
//                                 <div>
//                                     <input value={start} onChange={(e) => setStart(e.target.value)} type="time" className="start px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
//                                     <p className="start text-sm mt-2">Start Time</p>
//                                 </div>
//                                 <p className="distinguisher">-</p>
//                                 <div>
//                                     <input value={end} onChange={(e) => setEnd(e.target.value)} type="time" placeholder='End-time' className="end px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
//                                     <p className="end text-sm mt-2">End Time</p>
//                                 </div>
//                             </div>


//                             <div className="actions flex gap-3">
//                                 <button className='bg-green-500 hover:bg-green-400 transition  active:scale-90 rounded py-2 px-5 font-medium' onClick={handleTaskAdd}>Add</button>

//                             </div>
//                         </div>

//                     </div>
//                 </div> */}

//     </div>

export default TaskListsModal
