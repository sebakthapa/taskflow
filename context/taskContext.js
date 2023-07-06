import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const DailyTasksContext = createContext("");

const fetchTasks = async (collectionName, setTasks) => {
    await getDocs(collection(db, collectionName))
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setTasks(newData);
            // console.log(todos, newData);
        })
}

export const DailyTaskProvider = ({ children }) => {
    const [dailyTasks, setDailyTasks] = useState(null);

    return (
        <DailyTasksContext.Provider value={{ dailyTasks, setDailyTasks, sebak: "thapa" }}>
            {children}
        </DailyTasksContext.Provider>
    )
}

export const MonthlyTasksContext = createContext("");

export const MonthlyTasksProvider = ({ children }) => {
    const [monthlyTasks, setMonthlyTasks] = useState(null);

    return (
        <MonthlyTasksContext.Provider value={{ monthlyTasks, setMonthlyTasks }}>
            {children}
        </MonthlyTasksContext.Provider>
    )
}

