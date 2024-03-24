import React from "react";
import { FaCartArrowDown, FaStar, FaStarHalf } from "react-icons/fa";
import { priceAfterDiscount } from "../../helper/helper";
import CreateStar from "../Star/CreateStar";

function Product({ product }) {
    return (
        <div className="col-md-3 mb-4">
            <div className="card d-flex align-items-center pt-4">
                <img src={product?.images[0]}
                    className="card-image-top" alt=""
                    style={{ width: "90%" }}
                />
                <div className="w-100 px-4 py-3">
                    <p className="fw-bolder text-center">{product?.brand} - {product?.title}</p>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="me-1">
                            <CreateStar star={product?.rating} />
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="fs-10 badge bg-success">
                            {product?.stock} In stock
                        </div>
                        <div className="fs-10 badge bg-danger">
                            {product?.discountPercentage > 0 ? `On sale` : ''}
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <del className="line-through me-2">${product?.price}</del>
                            <span className="fs-4 text-danger fw-bolder">${priceAfterDiscount(product?.price, product?.discountPercentage)}</span>
                        </div>
                        <FaCartArrowDown size={20} className="btn-cart" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Product;