"use client"

import { MdOutlineDeleteOutline } from "react-icons/md"
import { BiArchiveIn, BiSolidEdit } from "react-icons/bi"
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri"
import { useContext, useState } from "react"
import { DailyTasksContext } from "@/context/taskContext"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import AddTask from "./AddTask"
import { updateDoc } from "@/lib/firebaseStore"

const TaskItem = ({ title, description, start, end, status, id, collectionName, setShowTaskAddForm }) => {
    const [showEditForm, setShowEditForm] = useState(false);


    const { dailyTasks, setDailyTasks } = useContext(DailyTasksContext)

    


    const handleTick = () => {
        const updatedTask = [];
        dailyTasks.map((task, idx) => {
            if (task.id == id) {
                task.status = status === "completed" ? "incomplete" : "completed";
                updateDoc("daily_tasks", task.id, { status: task.status })
            }
            updatedTask[idx] = task;
            setDailyTasks(updatedTask)
        });

        // setDailyTasks({...dailyTasks, updatedTask})
    }

    const handleEdit = () => {
        // setShowTaskAddForm(true)
        setShowEditForm(true)
    }


    return (
        <>
            {
                showEditForm ? (
                    <AddTask tid={id} handleEdit={handleEdit} type="update" title={title} description={description} start={start} end={end} setShowEditForm={setShowEditForm} collectionName={collectionName} />
                ): (
                    <div className='taskitem bg-zinc-100 px-5 rounded-2xl mb-5'>
                    <div className="top flex items-center justify-between pt-5 pb-3 border-b-[3px] border-solid border-gray-200">
                        <div className="texts ">
                            <p className={`title font-semibold text-xl text-gray-700 capitalize ${status === "completed" && "line-through"}`}>{title}</p>
                            <p className="description text-gray-400 mt-1">{description}</p>
                        </div>
                        <div className="checkbox active:scale-90 transition" type="checkbox" onClick={handleTick}>
                            {
                                status === "completed" ? (
                                    <RiCheckboxCircleFill className="text-blue-500 h-8 w-8 cursor-pointer" />
                                ) : (
        
                                    <RiCheckboxBlankCircleLine className=" h-8 w-8 cursor-pointer text-gray-400" />
                                )
                            }
                        </div>
                    </div>
                    <div className="bottom flex items-center justify-between py-5">
                        <div className="time flex gap-2 text-zinc-400 font-light">
                            <p className="start">{start}</p>
                            <p className="distinguisher">-</p>
                            <p className="end">{end}</p>
                        </div>
                        <div className="actions flex gap-3">
                            <button className="edit w-[25px] h-[25px] text-green-700 cursor-pointer rounded-3xl flex justify-center items-center hover:scale-125 transition active:scale-100" onClick={handleEdit}>
                                <BiSolidEdit className="h-7 w-7" />
                            </button>
                            <button className="archive w-[25px] h-[25px] text-gray-700 cursor-pointer rounded-3xl flex justify-center items-center hover:scale-125 transition active:scale-100">
                                <BiArchiveIn className="h-7 w-7" />
                            </button>
                            <button className="delete w-[25px] h-[25px] text-red-500 cursor-pointer rounded-3xl flex justify-center items-center hover:scale-125 transition active:scale-100">
                                <MdOutlineDeleteOutline className="h-7 w-7" />
                            </button>
        
        
        
                        </div>
                    </div>
        
                </div>
                )
            }
        </>
    )
}

export default TaskItem
