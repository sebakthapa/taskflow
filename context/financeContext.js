const { createContext, useState } = require("react");

export const PersonalFinanceContext = createContext("");

export const PersonalFinanceContextProvider = ({children}) => {
    const [personalFinance, setPersonalFinance] = useState(null);
    return (
        <PersonalFinanceContext.Provider value={{personalFinance, setPersonalFinance}}>
            {children}
        </PersonalFinanceContext.Provider>
    )
}



export const TeamFinanceContext = createContext("");

export const TeamFinanceContextProvider = ({children}) => {
    const [teamFinance, setTeamFinance] = useState(null);
    return (
        <TeamFinanceContext.Provider value={{teamFinance, setTeamFinance}}>
            {children}
        </TeamFinanceContext.Provider>
    )
}