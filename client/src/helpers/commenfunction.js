export const countlenght = (str,wordlenght)=>{
    if(str.length > wordlenght) str = str.substring(0,wordlenght);

    return `${str} ...`;

}