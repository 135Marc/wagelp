import { configureStore } from "@reduxjs/toolkit"
import { paymentSlice } from "./reducers/PaymentReducer";
import { tableSlice } from "./reducers/TableReducer"


export const globalStore = configureStore({
    reducer: {
        table : tableSlice.reducer,
        payment: paymentSlice.reducer
    }
})

export default globalStore;

export type StoreState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;