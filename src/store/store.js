import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../redux-toolkit/productsSlice";
import filtersSlice from "../redux-toolkit/filtersSlice";
import cartSlice from "../redux-toolkit/cartSlice";
import orderListSlice from "../redux-toolkit/orderListSlice";
const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        filters: filtersSlice.reducer,
        cart: cartSlice.reducer,
        orderlist: orderListSlice.reducer,
    }
})
export default store;