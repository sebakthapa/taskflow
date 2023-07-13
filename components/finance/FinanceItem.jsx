"use client"

import { MdOutlineDeleteOutline } from "react-icons/md"
import { BiArchiveIn, BiSolidEdit } from "react-icons/bi"
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri"
import { useContext, useState } from "react"
import { DailyTasksContext, MonthlyTasksContext } from "@/context/taskContext"
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import AddTask from "./AddFinance"
import { updateDoc } from "@/lib/firebaseStore"

const TaskItem = ({ itemName, createdAt,price, id,type, setShowFinanceAddForm, collectionName }) => {
    const [showEditForm, setShowEditForm] = useState(false);


    const { dailyTasks, setDailyTasks } = useContext(DailyTasksContext);
    const { monthlyTasks, setMonthlyTasks } = useContext(MonthlyTasksContext);


    let tasks, setTasks;
    if (collectionName === "daily_tasks") {
        tasks = dailyTasks;
        setTasks = setDailyTasks;
    } else {
        tasks = monthlyTasks;
        setTasks = setMonthlyTasks;
    }



    const handleEdit = () => {
        // setShowFinanceAddForm(true)
        setShowEditForm(true)
    }

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, collectionName, id));
        } catch (err) {
            console.log(err)

        }
    }


    return (
        <>
            {
                showEditForm ? (
                    <AddFinance tid={id} handleEdit={handleEdit} type="update" title={title} description={description} start={start} end={end} setShowEditForm={setShowEditForm} collectionName={collectionName} />
                ) : (
                    <div className='taskitem bg-zinc-100 px-5 rounded-2xl mb-5'>
                        <div className="top flex items-center justify-between pt-5 pb-3 border-b-[3px] border-solid border-gray-200">
                            <div className="texts ">
                                <p className={`title font-semibold text-xl text-gray-700 capitalize`}>{itemName}</p>
                                </div>
                                <div className="price">
                                    <p className={`description text-gray-400 mt-1 font-semibold ${type === "credit" ? "text-red-600" : "text-green-600"}`}>Rs {price}</p>
                                </div>
                            
                        </div>
                        <div className="bottom flex items-center justify-between pb-3 pt-2">
                            <div className="time flex gap-2 text-zinc-400 font-light">
                                <p className="date">{createdAt}</p>
                                
                            </div>
                            <div className="actions flex gap-3">
                                <button className="edit w-[25px] h-[25px] text-green-700 cursor-pointer rounded-3xl flex justify-center items-center hover:scale-125 transition active:scale-100" onClick={handleEdit}>
                                    <BiSolidEdit className="h-7 w-7" />
                                </button>

                                <button className="delete w-[25px] h-[25px] text-red-500 cursor-pointer rounded-3xl flex justify-center items-center hover:scale-125 transition active:scale-100" onClick={handleDelete}>
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
