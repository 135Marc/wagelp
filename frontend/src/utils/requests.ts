import axios, { CancelTokenSource } from "axios"
import { TableReq,YearsData,TaxTableData, BracketData } from "../interfaces/interfaces";

export async function getPromise():Promise<TableReq> {
    return axios.post<TableReq>('http://localhost:8080/regimes').then(({data}) => data)
}

export async function getYears():Promise<YearsData> {
    return axios.post<YearsData>('http://localhost:8080/years').then(({data}) => data)
}

export async function getTable(tableID:number,tableType:number,cancelToken:CancelTokenSource):Promise<TaxTableData> {
    return axios.post<TaxTableData>('http://localhost:8080/table/' + tableID + '/' + tableType,
        {cancelToken:cancelToken.token})
        .then(({data}) => data)
}

export async function getTaxPercentages(bid:number | undefined ,cancelToken:CancelTokenSource):Promise<BracketData>{
    return axios.post<BracketData>('http://localhost:8080/percentages/' + bid,
    {cancelToken:cancelToken.token})
    .then(({data}) => data)
}

export async function getIncome(money:number,tableID:number,tableType:number,dependents:number,cancelToken:CancelTokenSource):Promise<BracketData> {
    return axios.post<TaxTableData>('http://localhost:8080/income/' + money + '/' + tableID + '/' + tableType + '/' + dependents,
    {cancelToken:cancelToken.token})
    .then(({data}) => getTaxPercentages(data.data.at(0)?.Bracket_ID,cancelToken));
}