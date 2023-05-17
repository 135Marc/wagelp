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

export function calculateYearGross(money:number,payment?:string) {
    let factor = 0;

    switch ((String(payment))) {
        case "14m":
            factor=14;
            break;
        case "duod-50":
            factor=13.5;
            break;
        case "duod-5050":
            factor = 13;
            break;

        case "duod-full":
            factor = 12;
            break;
    }

    return money * factor;
}

export function calculateYearSS(money:number,payment?:string) {
    let factor = 0;

    switch (String(payment)) {
        case "14m":
            factor=14;
            break;
        case "duod-50":
            factor=13.5;
            break;
        case "duod-5050":
            factor = 13;
            break;

        case "duod-full":
            factor = 12;
            break;
    }

    return money * factor * 0.11;
}

export function calculateYearlyIRS(money:number,payment?:string,prctSingle?:number,prctDouble?:number,prctHalf?:number) {
    let res = 0;
    const percentageSingle = prctSingle ?? 1;
    const percentageDouble = prctDouble ?? 1;
    const percentageHalf = prctHalf ?? 1;

    switch(String(payment)) {
        case "14m":
            res = (money * percentageSingle * 10) + (2 * money * percentageSingle) * 2;
            break;
        case "duod-50":
            res = (money * percentageSingle * 10) + (1.5 * money * percentageHalf) + (2 * money * percentageDouble);
            break;
        case "duod-5050":
            res = (money * percentageSingle * 10) + (1.5 * money * percentageHalf) * 2;;
            break;
        case "duod-full":
            res = money * percentageSingle * 12;
            break;
    }

    return res;
}

export function calculateYearlyLiquid(money:number,payment?:string,prctSingle?:number,prctDouble?:number,prctHalf?:number) {
    const percentageSingle = prctSingle ?? 1;
    const percentageDouble = prctDouble ?? 1;
    const percentageHalf = prctHalf ?? 1;

    let res = (money - (money * (percentageSingle + 0.11)))*10;

    switch(String(payment)) {
        case "14m":
            res += (money * 2 - (money * 2 * (percentageDouble + 0.11))) *2;
            break;
        case "duod-50":
            res += (money * 1.5 - (money * 1.5 * (percentageHalf + 0.11))) + (money * 2 - (money * 2 * (percentageDouble + 0.11))) *2;
            break;
        case "duod-5050":
            res += (money * 1.5 - (money * 1.5 * (percentageHalf + 0.11))) * 2;
            break;
        case "duod-full":
            res += (money - (money * (percentageSingle + 0.11))) * 2;
            break;
        default:
            break;
    }

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