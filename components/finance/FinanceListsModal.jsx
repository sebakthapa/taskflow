"use client"

import TaskItem from './FinanceItem'
import { getDate, getDateth, getDayName, getFullDateFromStr, getFullDateStr, getMonth, getMonthName, getTimeFromStr, getYear } from '@/lib/date'
import { auth, db } from '@/lib/firebase'
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, where, writeBatch } from 'firebase/firestore'
import moment from 'moment/moment'
import { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsPlus } from 'react-icons/bs'
import AddFinance from './AddFinance'
import FinanceItem from "./FinanceItem"
import { PersonalFinanceContext, TeamFinanceContext } from '@/context/financeContext'


const TaskListsModal = ({ type }) => {
    type = type.toLowerCase();

    const [user, loading, error] = useAuthState(auth);
    const {personalFinance, setPersonalFinance} = useContext(PersonalFinanceContext)
    const {teamFinance, setTeamFinance} = useContext(TeamFinanceContext)


    //managing variables for different types
    let setFinance, collectionName, snapQuery;
    const [finance, setDataFinance] = useState(null);

    
    //managing tabs
    const [selectedTab, setSelectedTab] = useState("monthly");
    const [monthlyCount, setMonthlyCount] = useState(0);
    const [dailyCount, setdailyCount] = useState(0);
    const [filteredFinance, setFilteredFinance] = useState(finance)


    const [showAddFinanceForm, setShowAddFinanceForm] = useState(false)




    if (type == "personal") {
        setFinance = setPersonalFinance;
        collectionName = "personal_finance";
    } else {
        setFinance = setTeamFinance;
        collectionName = "team_finance"
    }



    useEffect(() => {
        // console.log("dtask>", personalFinance)
        if (type == "personal") {
            setDataFinance(personalFinance)
        } else {
            setDataFinance(teamFinance)
        }


    }, [type,personalFinance, teamFinance, finance])


    useEffect(() => {
        if (user?.uid) {
            if (type == "personal") {
                snapQuery = query(collection(db, collectionName), where("uid", "==", user?.uid), where("createdAt", "==", getFullDateStr()), orderBy("createdAt", "desc"));
            } else {
                snapQuery = query(collection(db, collectionName), where("uid", "==", user?.uid), where("createdAt", "==", `${getYear()}${getMonth()}`),  orderBy("createdAt", "desc"));
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
                setFinance(fetchedTasks);

            });
        }
    }, [user])



    const formatDateToDisplay = (time) => {
        if (type == "personal") {
            return time != `${getFullDateStr()}235900` ? moment(getTimeFromStr(time), "hhmm").format("hh:mm A") : "";
        } else {
            return time != `${getYear()}${getMonth()}32000000` ? moment(getFullDateFromStr(time), "YYYYMMDD").format("Do MMMM") : "";

        }

    }



    return (
        <div className='todayTask w-2/5 bg-[rgba(180,180,200,.2)] py-5 px-7 rounded-2xl ml-5 mt-5 bg_blur '>
            <div className="header flex justify-between mt-3">
                <div className="title">
                    <h2 className='title text-2xl font-semibold capitalize'>{type} Finance</h2>
                    <p className='text-zinc-600'>
                        {
                            type === "personal" ? (
                                `${getDayName()}, ${getDateth()} ${getMonthName()} `
                            ) : (
                                `${getMonthName()}, ${getYear()} `
                            )
                        }</p>
                </div>
                <button className={`add-task flex items-center gap-1 font-medium hover:-translate-y-1 transition  p-2 pr-4 cursor-pointer rounded-xl active:scale-90 ${showAddFinanceForm ? "bg-red-200 text-red-700" : "bg-indigo-200 text-blue-700"}`} onClick={() => setShowAddFinanceForm((prev) => !prev)}>
                    <BsPlus className={`h-7 w-7 ${showAddFinanceForm && "rotate-45"}`} />
                    <p className="text  text-xl capitalize">{showAddFinanceForm ? "Cancel add" : "New Item"}</p>
                </button>
            </div>
           
            <div className="tasklists pt-5 max-h-[450px] overflow-auto pr-3">
                {
                    showAddFinanceForm && (
                        <AddFinance  type="add" uid={user?.uid} collectionName={collectionName} setShowAddFinanceForm={setShowAddFinanceForm} />
                    )
                }
                {


                    finance?.length > 0 ? (
                        <>
                            {
                                finance.map(({ title, description, startTime, endTime, id, status }, idx) => {
                                    return <FinanceItem
                                        setShowFinanceAddForm={setShowAddFinanceForm}
                                        key={idx}
                                        id={id}
                                        ItemName={itemName}
                                        collectionName={collectionName} />
                                })
                            }
                        </>
                    ) : (
                        <>
                            {
                                showAddFinanceForm || (
                                    <div className="notasks flex flex-col items-center py-10">
                                        <h2 className='w-fit font-medium text-xl text-gray-500'>Nothing available to display</h2>
                                        <h2 className='w-fit  text-gray-400'>No finance records found</h2>
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
