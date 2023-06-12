import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList: []
    },
    reducers: {
        submitCart: (prevState, action) => {
            return {
                ...prevState,
                cartList: [...prevState.cartList, action.payload]
            }
        },
        addQuantity: (prevState, action) => {
            const newData = [...prevState.cartList]
            const id = action.payload
            let newQty = newData[id].qty + 1
            const updated = {...newData[id], qty: newQty}
            newData[id] = updated
            return {
                ...prevState,
                cartList: newData
            }
        },
        subQuantity: (prevState, action) => {
            const newData = [...prevState.cartList]
            const id = action.payload
            let newQty
            newData[id].qty === 1 ? newQty = 1 : newQty = newData[id].qty - 1
            const updated = {...newData[id], qty: newQty}
            newData[id] = updated
            return {
                ...prevState,
                cartList: newData
            }
        },
        deleteCart: (prevState, action) => {
            const id = action.payload
            return {
                ...prevState,
                cartList: prevState.cartList.filter((d, i, arr) => arr[i] !== arr[id])
            }
        },
        clearCart: (prevState) => {
            return {
                ...prevState,
                cartList: []
            }
        }
    }
})

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;