import { createContext, useState } from "react";

export const DailyTasksContext = createContext("");

export const DailyTaskProvider = ({ children }) => {
    const [dailyTasks, setDailyTasks] = useState(null)
    return (
        <DailyTasksContext.Provider value={{ dailyTasks, setDailyTasks, sebak:"thapa" }}>
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

