"use client"

import React, { useContext, useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/lib/firebase'
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import moment from 'moment'
import { DailyTasksContext, MonthlyTasksContext } from '@/context/taskContext'

const TasksList = ({ tasks, showAddTaskForm, setShowAddTaskForm, collectionName, setTasks }) => {
    const [user, loading, error] = useAuthState(auth)
    

    console.log(collectionName)
    //
    const { dailyTasks, setDailyTasks } = useContext(DailyTasksContext);
    const { monthlyTasks, setMonthlyTasks } = useContext(MonthlyTasksContext);


    // add task data
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");


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
    useEffect(() => {
        // const q = query(collection(db, collectionName), orderBy('createdAt', 'asc'))
        // onSnapshot(q, (querySnapshot) => {
        //   setTasks(querySnapshot.docs.map(doc => ({
        //     id: doc.id,
        //     data: doc.data()
        //   })))
        // })
      },[])

    //showing add task form
    // const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    return (
        <div className="tasklists pt-5 ">

            {
                showAddTaskForm && (
                    <div className="addtask mb-5">
                        <form action="" onSubmit={handleTaskAdd}>

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
                                        <button type="submit" className='bg-green-500 hover:bg-green-400 transition  active:scale-90 rounded py-2 px-5 font-medium'>Add</button>

                                    </div>
                                </div>

                            </div>
                        </form>

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
    )
}

export default TasksList
