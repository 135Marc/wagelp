import { BracketType} from "../interfaces/interfaces";

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

export function calculateFoodAid(tableID:number,foodAid:number,aidType:string,money:number) {

    // foodAid && tableID > 37 => (amountMoney <= 4.77 is taxFree otherwise add to IRS) 
    //                         => (amountCard <= 7.67 is Tax Free otherwise add to IRS)
    
    let res = { aid:0,income:money }

    switch (tableID > 37) {
        case (foodAid <= 4.77 && aidType==="numerario"):
            res.aid = 4.77 * 20; // MIGHT NEED SOME ADJUSTMENTS (CALENDAR TO CALCULATE USEFUL DAYS) 
            break;
        case (foodAid > 4.77 && aidType==="numerario"):
            res.aid = 4.77 * 20; // MIGHT NEED SOME ADJUSTMENTS (CALENDAR TO CALCULATE USEFUL DAYS)
            res.income += (foodAid - 4.77) * 20;
            break;
        case (foodAid <= 7.67 && aidType==="cartao"):
            res.aid = 7.67 * 20; // MIGHT NEED SOME ADJUSTMENTS (CALENDAR TO CALCULATE USEFUL DAYS)
            res.income += (foodAid - 7.67) * 20;
            break;
        default:
            break;
    }

    return res;
}

export function calculateYearlyTotals(money:number,prctSingle?:BracketType[],prctDouble?:BracketType[],prctOneHalf?:BracketType[]) {
    let res = { gross:0,IRS:0,SS:0,liquid:0}

    prctSingle?.forEach((pd) => {
        res.gross +=money*10;
        res.IRS += (money*pd.Value*10);   
        res.SS += (money*0.11)*10;
        res.liquid +=(money - (money * (pd.Value + 0.11)))*10;
    })

    prctDouble?.forEach((pd) => {
        res.gross += money * 4;
        res.IRS += (money * 2 * pd.Value) * 2;   
        res.SS += (money * 2 * 0.11)*2;
        res.liquid +=(money * 2 - (money * 2 * (pd.Value + 0.11))) *2;
    })

    return res;
}

export function setMoney(isYearly:boolean,payment:string | undefined,income:number) {
    let pay:number = 0;
    switch(String(payment)) {
        case "14m" :
            pay = income / 14;
            break;
        case "duod-full":
            pay = income / 12;
            break;
        case "duod-50":
            pay = income / 13.5;
            break;
        case "duod-5050":
            pay = income / 13;
            break;
        default: 
            break;
    }
       
    return (isYearly) ? pay : income;
}