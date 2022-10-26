import { CancelTokenSource } from "axios"

export interface TTProps {
    cancelToken:CancelTokenSource,
    tableID: number,
    tableType: number

}

export interface TaxTableData {
    data: TaxTableType[]
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

export interface BracketData {
    data: BracketType[];
}

export interface BracketType {
    ID:number,
    Bracket_ID:number,
    Dependents:number,
    Value:number
}

export interface TableReq {
    data:TableType[]
}

export interface TableType {
    Number:number,
    Description:string,
}

export interface YearsData {
    data: YearsType[]
}

export interface YearsType {
    Year:number,
    From:string,
    To:string,
    ID:number,
    Region:string
}

export interface RegionsData {
    data:RegionType[]
}

export interface RegionType {
    Region : string
}

export interface IncomeProps extends TTProps {
    income:number,
    dependents:number,
    type:string

}