import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: uuidv4(),
        cartInfo: {
            subtotal: 0,
            shipping: 0,
            total: 0,
            subQuantity: 0,
            orderDate: new Date().valueOf()
        },
        cartDetails: [],
        customerInfo: {
            fullname: '',
            address: '',
            email: '',
            mobile: ''
        }
    },
    reducers: {
        addToCart: (state, action) => {
            let cartItem = state.cartDetails.find(item => item.id === action.payload.id)
            if (cartItem?.id) {
                cartItem.quantity = Number(cartItem.quantity) + 1
                cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)
            } else {
                state.cartDetails.push({
                    ...action.payload,
                    quantity: 1,
                    amount: action.payload.newPrice
                })
            }
            let newSubtotal = 0;
            for (let item of state.cartDetails) {
                newSubtotal += Number(item.amount)
            }
            let newSubQuantity = 0;
            for (let item of state.cartDetails) {
                newSubQuantity += Number(item.quantity)
            }
            let newTotal = newSubtotal + Number(state.cartInfo.shipping)
            state.cartInfo.subtotal = newSubtotal
            state.cartInfo.total = newTotal
            state.cartInfo.subQuantity = newSubQuantity
        },
        increamentQuantity: (state, action) => {
            let cartItem = state.cartDetails.find(item => item.id === action.payload.id)
            cartItem.quantity = Number(cartItem.quantity) + 1
            cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)
            let newSubtotal = 0;
            for (let item of state.cartDetails) {
                newSubtotal += Number(item.amount)
            }
            let newSubQuantity = 0;
            for (let item of state.cartDetails) {
                newSubQuantity += Number(item.quantity)
            }
            let newTotal = newSubtotal + Number(state.cartInfo.shipping)
            state.cartInfo.subtotal = newSubtotal
            state.cartInfo.total = newTotal
            state.cartInfo.subQuantity = newSubQuantity
        },
        decreamentQuantity: (state, action) => {
            let cartItem = state.cartDetails.find(item => item.id === action.payload.id)
            cartItem.quantity = Number(cartItem.quantity) - 1
            cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)
            let newSubtotal = 0;
            for (let item of state.cartDetails) {
                newSubtotal += Number(item.amount)
            }
            let newSubQuantity = 0;
            for (let item of state.cartDetails) {
                newSubQuantity += Number(item.quantity)
            }
            let newTotal = newSubtotal + Number(state.cartInfo.shipping)
            state.cartInfo.subtotal = newSubtotal
            state.cartInfo.total = newTotal
            state.cartInfo.subQuantity = newSubQuantity
        },
        removeCartItem: (state, action) => {
            state.cartDetails = state.cartDetails.filter(item => item.id !== action.payload)
            let newSubtotal = 0;
            for (let item of state.cartDetails) {
                newSubtotal += Number(item.amount)
            }
            let newSubQuantity = 0;
            for (let item of state.cartDetails) {
                newSubQuantity += Number(item.quantity)
            }
            let newTotal = newSubtotal + Number(state.cartInfo.shipping)
            state.cartInfo.subtotal = newSubtotal
            state.cartInfo.total = newTotal
            state.cartInfo.subQuantity = newSubQuantity
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutThunkAction.fulfilled, (state, action) => {
                state.cartId = uuidv4()
                state.cartInfo = {
                    subtotal: 0,
                    shipping: 0,
                    total: 0,
                    subQuantity: 0,
                    orderDate: new Date().valueOf()
                }
                state.cartDetails = []
                state.customerInfo = {
                    fullname: '',
                    address: '',
                    email: '',
                    mobile: ''
                }
            }
            )
    }
})
export const checkoutThunkAction = createAsyncThunk('cart/checkout', async (data) => {
    console.log(data);
})
export default cartSlice