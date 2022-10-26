export const hh = () => console.log("");

const shortMonths:{original:string,new:string}[] = [
    {original:"JAN",new:"Janeiro"},
    {original: "FEB",new:"February"},
    {original: "MAR",new:"Março"},
    {original: "APR",new:"April"},
    {original: "MAY",new:"Maio"},
    {original: "JUN",new:"Junho"},
    {original: "JUL",new:"Julho"},
    {original: "AUG",new:"Agosto"},
    {original: "SEP",new:"Setembro"},
    {original: "OCT",new:"Outubro"},
    {original: "NOV",new:"Novembro"},
    {original: "DEC",new:"Dezembro"}
];

export function monthShortToLong(input_string:string) {
    return shortMonths.filter((or) => or.original === input_string ).at(0)?.new; 
}

export const translateRegion = (reg:string) => {
    let ret_var:string = "";
    switch(reg){
        case "Mainland":
            ret_var = "Continente";
            break;
        case "Azores":
            ret_var = "Açores";
            break;
        default:
            ret_var=reg;
            break;
    }
    return ret_var;
}

export const dependents_arr = () => [0,1,2,3,4,5]
export const months_number = () => [1,2,3,4,5,6,7,8,9,10,11,12]
