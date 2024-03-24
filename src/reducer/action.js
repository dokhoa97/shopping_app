export function fetchData(payload) {
    return {
        type: 'products/fetchData',
        payload
    }
}
export function searchText(payload) {
    return {
        type: 'filters/searchText',
        payload
    }
}
export function searchBrand(payload) {
    return {
        type: 'filters/brand',
        payload
    }
}
export function searchCategory(payload) {
    return {
        type: 'filters/category',
        payload
    }
}
export function searchPrice(payload) {
    return {
        type: 'filters/price',
        payload
    }
}
export function searchStatus(payload) {
    return {
        type: 'filters/status',
        payload
    }
}