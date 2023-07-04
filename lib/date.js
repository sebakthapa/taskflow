const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];  
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



const date = new Date();

export const getYear = () => date.getFullYear();
export const getMonth = () => date.getMonth();
export const getDay = () => date.getDay();
export const getDate = () => date.getDate();
export const getDateth = () => {
    const date = getDate();
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

export const getMonthName = () => monthNames[getMonth()];
export const getDayName = () => dayNames[getDay()];



