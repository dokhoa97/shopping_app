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
    useEffect(() => {
        dispatch(fetchDataThunkAction(limit))
    }, [])
    const loadMore = () => {
        limit += 10
        dispatch(fetchDataThunkAction(limit))
    }
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Products</h5>
            <InfiniteScroll
                dataLength={state.data.length}
                hasMore={true}
                // loader={<Spinner />}
                next={loadMore}
                style={{ overflow: 'hidden' }}
                endMessage={<p>You have seen it all!</p>}
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