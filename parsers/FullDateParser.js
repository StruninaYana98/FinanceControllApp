export function parseToFullDateString(date){
    return date.getDate() + "." + (date.getMonth()+1)+"."+ date.getFullYear();
}