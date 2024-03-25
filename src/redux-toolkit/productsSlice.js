import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: 'idle',
        data: [],
        totalRow: 0
    },
    reducers: {
        fetchData: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataThunkAction.pending, (state, action) => {
                state.loading = 'loading'
            })
            .addCase(fetchDataThunkAction.fulfilled, (state, action) => {
                state.loading = 'idle'
                state.data = action.payload?.products
                state.totalRow = action.payload?.total
            })
    }
})
export const fetchDataThunkAction = createAsyncThunk('fetchDataThunkAction', async (limit) => {
    let res = await fetch(`https://dummyjson.com/products?limit=${limit}`)
    let data = await res.json()
    return data
})
export default productsSlice;