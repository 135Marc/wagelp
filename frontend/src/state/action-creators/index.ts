import { Dispatch } from "redux"
import { Action } from "../actions"

export const addID = (tableID:number) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:"addID",
            payload: tableID
        })
    }
}

export const changeID = (tableID:number) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:"changeID",
            payload: tableID
        })
    }
}

export const addType = (tableType:number) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:"addType",
            payload: tableType
        })
    }
}

export const changeType = (tableType:number) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:"changeType",
            payload: tableType
        })
    }
}