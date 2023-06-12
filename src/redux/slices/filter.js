import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'category',
    initialState: {
        category: null,
        sort: null
    },
    reducers: {
        inputCategory: (prevState, action) => {
            return {
                ...prevState,
                category: action.payload
            }
        },
        inputSort: (prevState, action) => {
            return {
                ...prevState,
                Sort: action.payload
            }
        },
        resetFilter: (prevState) => {
            return {
                ...prevState,
                category: null,
                sort: null
            }
        },
    }
});

export const filterAction = filterSlice.actions
export default filterSlice.reducer