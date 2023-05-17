import { createSlice } from "@reduxjs/toolkit";

export const tableSlice = createSlice({
    name: "tableID",
    initialState: {
        ID: 0,
        Type: 1,
        Dependents: 0    
    },
    reducers: {
        changeID: (state,action) => {
            state.ID = action.payload;
        },
        changeType: (state,action) => {
            state.Type = action.payload;
        },
        changeDependents: (state,action) => {
            state.Dependents = action.payload;
        }
    }
})


export const {changeID,changeType,changeDependents} = tableSlice.actions;
export default tableSlice.reducer;