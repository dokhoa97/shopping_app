import { createSelector } from "@reduxjs/toolkit"
import { priceAfterDiscount } from "../helper/helper"

export const productsSelector = (state) => state.products
export const filtersSelector = (state) => state.filters
export const filteredProducts = createSelector(
    productsSelector,
    filtersSelector,
    (products, filters) => {
        const { searchText, brand, category, price, status } = filters
        let filteredProductData = {
            data: [...products.data],
            loading: products.loading
        }
        if (searchText) {
            filteredProductData.data = filteredProductData.data.filter((p) => p?.title.toLowerCase().includes(searchText.toLowerCase()))
        }
        if (brand !== 'All') {
            filteredProductData.data = filteredProductData.data.filter((p) => p?.brand === brand)
        }
        if (category !== 'All') {
            filteredProductData.data = filteredProductData.data.filter((p) => p?.category === category)
        }
        if (price !== '0,0') {
            const [min, max] = price.split(',');
            filteredProductData.data = filteredProductData.data.filter((p) => {
                if (min !== max) {
                    let newPrice = priceAfterDiscount(p?.price, p?.discountPercentage)
                    return newPrice >= min && newPrice < max
                } else {
                    let newPrice = priceAfterDiscount(p?.price, p?.discountPercentage)
                    return newPrice >= min
                }
            })
        }
        if (status.length) {
            if (status.includes('On sale')) {
                filteredProductData.data = filteredProductData.data.filter(p => p?.discountPercentage > 0)
            }
            if (status.includes('In stock')) {
                filteredProductData.data = filteredProductData.data.filter(p => p?.stock > 0)
            }
        }

        return filteredProductData
    }
)