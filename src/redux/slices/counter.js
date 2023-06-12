import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        number: 0,
    },
    reducers: {
        increment: (prevState) => {
            return {
                ...prevState,
                number: prevState.number + 1
            }
        },
        decrement: (prevState) => {
            return {
                ...prevState,
                number: prevState.number - 1
            }
        },
    }
})

export const counterAction = counterSlice.actions
export default counterSlice.reducer;