import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const orderListSlice = createSlice({
    name: 'orderlist',
    initialState: {
        dataList: [],
        loading: 'idle',
        detailList: []
    },
    reducers: {
        openDetail: (state, action) => {
            state.detailList = action.payload
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(orderListThunkAction.pending, (state, action) => {
                state.loading = 'loading'
            })
            .addCase(orderListThunkAction.fulfilled, (state, action) => {
                state.dataList = action.payload
            })
    }
})
export const orderListThunkAction = createAsyncThunk('orderListThunkAction', async () => {
    let res = await fetch('http://localhost:3030/orderlist')
    let data = await res.json()
    return data
})
export const removeCustomerThunkAction = createAsyncThunk('removeCustomerThunkAction', async (data) => {
    let res = await fetch(`http://localhost:3030/orderlist/${data.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let result = await res.json()
    return result
})
export const openCustomerDetailThunkAction = createAsyncThunk('openCustomerDetailThunkAction', async (data) => {
    let res = await fetch(`http://localhost:3030/orderlist/${data}`, {
        method: 'GET'
    })
    let result = await res.json()
    return result
})
export default orderListSlice