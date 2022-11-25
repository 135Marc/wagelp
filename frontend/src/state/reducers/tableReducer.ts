import { Action } from "../actions";

export function reducer(state:number = 0, action:Action) {
    switch(action.type) {
        case "addID":
            state = action.payload;
            break;
        case "changeID":
            state = action.payload;
            break;
        case "addType":
            state = action.payload;
            break;
        case "changeType":
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
}

