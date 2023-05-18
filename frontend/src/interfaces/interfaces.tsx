import { CancelTokenSource } from "axios"

/* PROPS */

export interface TaxTableProps {
    cancelToken:CancelTokenSource,
}

export interface IncomeProps extends TaxTableProps {
    isYearly:boolean,
    bonusPeriodicity?:number
}

export interface ResultsBodyProps {
    percentageData : BracketType[] | undefined,
    money:number,
    separator?:string
}

export interface ResultsHeaderProps {
    headers: string[]
}

export interface YearlyIncomeProps {
    money: number,
    payment?: string,
    percentage?: number,
    percentageOneHalf?: number,
    percentageDouble?: number
}

/* POST REQUEST DATA */

export interface JSONData<T> {
    data: T[]
}

export interface TaxTableType  {
    ID : number,
    Region: string,
    Year: number,
    From:string,
    To:string,
    TableNum:number
    Minimum:number,
    Maximum:number,
    Bracket_ID:number,
}

export interface BracketType {
    ID:number,
    Bracket_ID:number,
    Dependents:number,
    Value:number
}

export interface TableType {
    Number:number,
    Description:string,
}

export interface YearsType {
    Year:number,
    From:string,
    To:string,
    ID:number,
    Region:string
}