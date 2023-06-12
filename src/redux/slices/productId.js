import { createSlice } from '@reduxjs/toolkit';

const productIdSlice = createSlice({
    name: 'productId',
    initialState: {
        productId: ''
    },
    reducers: {
        inputProductId: (prevState, action) => {
            return {
                ...prevState,
                productId: action.payload
            }
        },
        removeProductId: (prevState) => {
            return {
                ...prevState,
                category: ''
            }
        },
    }
});

export const productIdAction = productIdSlice.actions
export default productIdSlice.reducer