import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataThunkAction } from "../../redux-toolkit/productsSlice";
import { filteredProducts } from "../../store/selectors";
import Spinner from "../Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
var limit = 10;
function Products() {
    const dispatch = useDispatch()
    const state = useSelector(filteredProducts)
    const totalRow = useSelector(state => state.products?.totalRow)
    useEffect(() => {
        dispatch(fetchDataThunkAction(limit))
    }, [dispatch])
    const loadMore = () => {
        limit += 10
        dispatch(fetchDataThunkAction(limit))
    }
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Products</h5>
            <InfiniteScroll
                dataLength={state.data.length}
                hasMore={limit < totalRow}
                next={loadMore}
                style={{ overflow: 'hidden' }}
                endMessage={<h2 style={{ textAlign: 'center', color: 'red' }}>You have seen it all!</h2>}
            >
                {
                    state.loading === 'loading' ? <Spinner /> : (
                        <div className="row">
                            {
                                state.data?.map((product) => (
                                    <Product key={product?.id} product={product} />
                                ))
                            }
                        </div>
                    )
                }
            </InfiniteScroll>
        </div>
    )
}

export default Products;