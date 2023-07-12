"use client"

import { getFullDateStr, getHour, getMinute, getMonth, getYear } from "@/lib/date";
import { auth, db } from "@/lib/firebase";
import { updateDoc } from "@/lib/firebaseStore";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AddTask = ({ type, tid, collectionName, setShowAddTaskForm, handleEdit, setShowEditForm, ...props }) => {
    const [user, loading, error] = useAuthState(auth)


    const convert12to24 = (time) => {
        return moment(time, "hh:mm:ss A").format("hh:mm")
    }

    const [title, setTitle] = useState(props.title ? props.title : "");
    const [description, setDescription] = useState(props.description ? props.description : "");
    const [start, setStart] = useState(props.start ? convert12to24(props.start) : "");
    const [end, setEnd] = useState(props.end ? convert12to24(props.end) : "");


    const handleTaskAdd = async (e) => {
        e.preventDefault();
        if (!title) {
            alert("Title is required Field")
        } else {
            console.log(start)
            let startTime, endTime, createdAt;

            if (collectionName === "daily_tasks") {
                startTime = start ? `${getFullDateStr()}${start.replace(":", "")}00` : `${getFullDateStr()}235900`;
                endTime = end ? `${getFullDateStr()}${end.replace(":", "")}00` : `${getFullDateStr()}235900`;
                createdAt=`${getFullDateStr()}`;
                
            } else {
                startTime = start ? `${start.replaceAll("-", "")}000000` : `${getYear()}${getMonth()}32000000`;
                endTime = end ? `${end.replaceAll("-", "")}000000` : `${getYear()}${getMonth()}32000000`;
                createdAt=`${getYear()}${getMonth()}`;

            }

            const data = {
                startTime,
                endTime,
                title,
                description: description ? description : null,
                status: "pending",
                uid: user.uid,
                createdAt
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


        }

    }

    const handleUpdate = () => {
        console.log(start, end)
        
        let startTime, endTime;
        if (collectionName === "daily_tasks") {
            startTime = start ? `${getFullDateStr()}${start.replace(":", "")}00` : `${getFullDateStr()}235900`;
            endTime = end ? `${getFullDateStr()}${end.replace(":", "")}00` : `${getFullDateStr()}235900`;

        } else {
            startTime = start ? `${start.replaceAll("-", "")}000000` : `${getYear()}${getMonth()}32000000`;
            endTime = end ? `${end.replaceAll("-", "")}000000` : `${getYear()}${getMonth()}32000000`;

        }
        console.log(startTime, endTime)

        const updatedData = {
            startTime,
            endTime,
            title,
            description: description ? description : null,
        }
        console.log("cname>>>>>>", collectionName)
        updateDoc(collectionName, tid, updatedData)
            .then(() => {
                setShowEditForm(false)
            })
    }



    return (
        <div className="addtask mb-5 ">
            <div className="">

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
                                <input value={start} onChange={(e) => setStart(e.target.value)} type={collectionName == "daily_tasks" ? "time" : "date"} className="start px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
                                <p className="start text-sm mt-2 pl-3">Start {collectionName == "daily_tasks" ? "time" : "date"}</p>
                            </div>
                            <p className="distinguisher">-</p>
                            <div>
                                <input value={end} onChange={(e) => setEnd(e.target.value)} type={collectionName == "daily_tasks" ? "time" : "date"} placeholder='End-time' className="end px-3 py-2 border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full " />
                                <p className="end text-sm mt-2 pl-3">End {collectionName == "daily_tasks" ? "time" : "date"}</p>
                            </div>
                        </div>


                    </div>
                    <div className="actions gap-3 flex pb-4 ">
                        <button className='bg-green-500 hover:bg-green-400 transition  active:scale-90 rounded py-1 px-4 font-medium capitalize' onClick={type === "add" ? handleTaskAdd : handleUpdate}>{type}</button>
                        <button className='bg-red-500 hover:bg-red-400 transition  active:scale-90 rounded py-2 px-4 font-medium capitalize' onClick={() => type === "add" ? setShowAddTaskForm(false) : setShowEditForm(false)}>cancel</button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddTask
