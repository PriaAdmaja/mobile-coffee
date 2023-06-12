import { createSlice } from "@reduxjs/toolkit";

const deliveryStatusSlice = createSlice({
    name: "deliveryStatus",
    initialState: {
            deliveryId: null,
            notes: null
        
    },
    reducers: {
        submitDeliveryId: (prevState, action) => {
            return {
                ...prevState,
                deliveryId: action.payload
            }
        },
        submitDeliveryNotes: (prevState, action) => {
            return {
                ...prevState,
                notes: action.payload
            }
        },
        deleteDelivery: (prevState) => {
            return {
                ...prevState,
                deliveryId: null,
                notes: null
            }
        }
    }
})

export const deliveryStatusAction = deliveryStatusSlice.actions;
export default deliveryStatusSlice.reducer;