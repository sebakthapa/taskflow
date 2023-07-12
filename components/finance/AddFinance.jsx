"use client"

import { getFullDateStr, getHour, getMinute, getMonth, getYear } from "@/lib/date";
import { auth, db } from "@/lib/firebase";
import { updateDoc } from "@/lib/firebaseStore";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AddFinance = ({ type, tid, collectionName, setShowAddFinanceForm, handleEdit, setShowEditForm, ...props }) => {
    const [user, loading, error] = useAuthState(auth)


    const convert12to24 = (time) => {
        return moment(time, "hh:mm:ss A").format("hh:mm")
    }

    const [itemName, setItemName] = useState(props.itemName ? props.itemName : "");
    const [price, setPrice] = useState(props.price ? props.price : "");
    const [financeType, setFinanceType] = useState(props.financeType ? props.financeType : "credit");


    const handleFinanceAdd = async (e) => {
        // e.preventDefault();
        if (!itemName || !price) {
            alert("Item name and price is required Field")
        } else {
            

            const data = {
                itemName,
                uid: user.uid,
                price: price,
                type:financeType,
                createdAt: getFullDateStr(),
            }
            console.log(data)

            // try {
            //     const docRef = await addDoc(collection(db, collectionName), data);
            //     // console.log({ ...docRef.data(), id: doc.id })

            //     console.log("data added successfully")
            //     setShowAddFinanceForm(false)
            //     // console.log(await getDoc())
            // } catch (err) {
            //     console.log(err)
            // }


        }

    }

    const handleUpdate = () => {
        
        const updatedData = {
            startTime,
            endTime,
            itemName,
            description: description ? description : null,
            createdAt: getFullDateStr(),
        }
        console.log("cname>>>>>>", collectionName)
        updateDoc(collectionName, tid, updatedData)
            .then(() => {
                setShowEditForm(false)
            })
            .catch((err) => {
            console.log(err)
        })
    }



    return (
        <div className="addFinance mb-5 ">
            <div className="">
                <div className='financeItem bg-zinc-100 px-5 rounded-2xl'>
                    <div className="top pt-5 pb-3 ">
                        <div className="texts ">
                            <input value={itemName} onChange={(e) => setItemName(e.target.value)} type="text" placeholder='Item name *' required className="title font-semibold text-xl text-gray-700 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-full focus:border-indigo-400" />
                        </div>
                    </div>
                    <div className="bottom flex items-center justify-between py-5">
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder='price *' min="0" required className="price font-semibold text-xl text-gray-700 py-2 px-3  border-solid border-b-2 border-gray-300 bg-transparent outline-none capitalize w-1/2 focus:border-indigo-400" />
                        <select defaultValue={financeType ? financeType : ""} name="" id="financeType" className="py-2 px-4  font-semibold text-gray-400 border-solid border-b-2 border-gray-300 cursor-pointer outline-none bg-gray-100 transition" >
                            <option value="" id="financeType"  className="bg-gray-300" disabled>Select Type</option>
                            <option value="credit"  id="financeType" onClick={(e) => setFinanceType("credit")}>Credit</option>
                            <option value="debit"  id="financeType" onClick={(e) => setFinanceType("debit")}>Debit</option>

                            
                        </select>
                    </div>
                    <div className="actions gap-3 flex pb-4 ">
                        <button type="submit" className='bg-green-500 hover:bg-green-400 transition  active:scale-90 rounded py-1 px-4 font-medium capitalize' onClick={type === "add" ? handleFinanceAdd : handleUpdate}>{type}</button>
                        <button className='bg-red-500 hover:bg-red-400 transition  active:scale-90 rounded py-2 px-4 font-medium capitalize' onClick={() => setShowAddFinanceForm(false) }>cancel</button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddFinance
