import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice( {
    name: "payment",
    initialState: {
        Income: 0,
        PaymentType: "14m"
    },
    reducers: {
        changeIncome: (state,action) => {
            state.Income = action.payload;
        },
        changePaymentType: (state,action) => {
            state.PaymentType = action.payload;
        }
    }
})

export const {changeIncome,changePaymentType} = paymentSlice.actions;
export default paymentSlice.reducer;