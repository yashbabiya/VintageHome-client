export const getDateInFormat = (_date) =>{
    const d = new Date(_date);
    return !_date ? "In progress" : d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();
}