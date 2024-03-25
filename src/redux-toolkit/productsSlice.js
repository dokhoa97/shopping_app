import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: 'idle',
        data: []
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
                state.data = action.payload
            })
    }
})
export const fetchDataThunkAction = createAsyncThunk('fetchDataThunkAction', async (limit) => {
    let res = await fetch(`https://dummyjson.com/products?limit=${limit}`)
    let data = await res.json()
    return data?.products
})
export default productsSlice;