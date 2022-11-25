import { combineReducers } from "redux";
import { reducer } from "./tableReducer";

export const reducers = combineReducers({
    tableRed: reducer
});

export type State = ReturnType<typeof reducers> 