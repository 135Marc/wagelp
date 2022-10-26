import axios, { CancelTokenSource } from "axios"
import { TableReq,YearsData,TaxTableData } from "../interfaces/interfaces";

export async function getPromise(cancelToken:CancelTokenSource):Promise<TableReq> {
    return axios.post<TableReq>('http://localhost:8080/regimes',
    {cancelToken:cancelToken.token}).then(({data}) => data)
}

export async function getYears(cancelToken:CancelTokenSource):Promise<YearsData> {
    return axios.post<YearsData>('http://localhost:8080/years',
           {cancelToken: cancelToken.token})
           .then(({data}) => data)
}

export async function getTable(tableID:number,tableType:number,cancelToken:CancelTokenSource):Promise<TaxTableData> {
    return axios.post<TaxTableData>('http://localhost:8080/table/' + tableID + '/' + tableType,
        {cancelToken:cancelToken.token})
        .then(({data}) => data)
}