import { createSlice } from "@reduxjs/toolkit";

const activePromoSlice = createSlice({
    name: "activePromo",
    initialState: {
        promo: {}
    },
    reducers: {
        submitPromo: (prevState, action) => {
            return {
                ...prevState,
                promo: action.payload
            }
        }
    }
})

export const activePromoAction = activePromoSlice.actions;
export default activePromoSlice.reducer;