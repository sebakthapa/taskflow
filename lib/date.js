const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];  
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



export const getYear = () => new Date().getFullYear();
export const getMonth = () => {
    const m = new Date().getMonth() + 1;
    return  m < 10 ? `0${m}` : m
}
export const getDay = () => new Date().getDay();

export const getDate = () => {
    const m = new Date().getDate();
    return  m < 10 ? `0${m}` : m

}

export const getDateth = () => {
    const date = +getDate();
    if (date == 1) {
        return `${date}st`
    } else if (date == 2) {
        return `${date}nd`
        
    } else if (date == 3) {
        return `${date}rd`
    } else {
        return `${date}th`
    }
};

export const getHour = () => {
    const m = new Date().getHours();
    return  m < 10 ? `0${m}` : m

}

export const getMinute = () => {
    const m = new Date().getMinutes();
    return  m < 10 ? `0${m}` : m
}




export const getMonthName = () => monthNames[+getMonth()-1];
export const getDayName = () => dayNames[+getDay()];



export const getFullDateStr = () => {
    return `${getYear()}${getMonth()}${getDate()}`
}

export const getHourFromStr = (time) => {
    return time.slice(8, 10)
}
export const getMinuteFromStr = (time) => {
    return time.slice(10, 12)
}

export const getTimeFromStr = (time) => {
    return `${getHourFromStr(time)}${getMinuteFromStr(time)}`
}

export const getYearFromStr = (time) => {
    return time.slice(0, 4)
}
export const getMonthFromStr = (time) => {
    return time.slice(4, 6)
}
export const getDateFromStr = (time) => {
    return time.slice(6, 8)
}

export const getFullDateFromStr = (time) => {
    return `${getYearFromStr(time)}${getMonthFromStr(time)}${getDateFromStr(time)}`
}



