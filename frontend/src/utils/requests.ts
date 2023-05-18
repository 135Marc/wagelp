import axios, { CancelTokenSource } from "axios"
import { TableType,YearsType,TaxTableType, JSONData, BracketType } from "../interfaces/interfaces";

export async function getPromise():Promise<JSONData<TableType>> {
    return axios.post<JSONData<TableType>>('http://localhost:8080/regimes').then(({data}) => data)
}

export async function getYears():Promise<JSONData<YearsType>> {
    return axios.post<JSONData<YearsType>>('http://localhost:8080/years').then(({data}) => data)
}

export async function getTable(tableID:number,tableType:number,cancelToken:CancelTokenSource):Promise<JSONData<TaxTableType>> {
    return axios.post<JSONData<TaxTableType>>('http://localhost:8080/table/' + tableID + '/' + tableType,
        {cancelToken:cancelToken.token})
        .then(({data}) => data)
}

export async function getTaxPercentages(bid:number | undefined ,cancelToken:CancelTokenSource):Promise<JSONData<BracketType>>{
    return axios.post<JSONData<BracketType>>('http://localhost:8080/percentages/' + bid,
    {cancelToken:cancelToken.token})
    .then(({data}) => data)
}

export async function getIncome(money:number,tableID:number,tableType:number,dependents:number,cancelToken:CancelTokenSource):Promise<JSONData<BracketType>> {
    return axios.post<JSONData<TaxTableType>>('http://localhost:8080/income/' + money + '/' + tableID + '/' + tableType + '/' + dependents,
    {cancelToken:cancelToken.token})
    .then(({data}) => getTaxPercentages(data.data.at(0)?.Bracket_ID,cancelToken));
}