import React from "react";
import MainLayout from "../layouts/MainLayout";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../store/selectors";
import cartSlice, { checkoutThunkAction } from "../redux-toolkit/cartSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const schema = yup.object({
    fullname: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.string().required()
})
function CartPage() {
    const { cartId, cartDetails, cartInfo } = useSelector(cartSelector)
    const dispatch = useDispatch()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const handleIncreament = (item) => {
        if (item.quantity < item.stock) {
            dispatch(cartSlice.actions.increamentQuantity(item))
        } else {
            toast.warning(`You can't buy this product ${item.stock}`)
        }
    }
    const handleDecreament = (item) => {
        if (item.quantity > 1) {
            dispatch(cartSlice.actions.decreamentQuantity(item))
        } else {
            Swal.fire({
                title: `Are you sure remove ${item.title}?`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(cartSlice.actions.removeCartItem(item.id))
                    toast.info('Remove is succeed')
                }
            })
        }
    }
    const handleRemove = (item) => {
        Swal.fire({
            title: `Are you sure remove ${item.title}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cartSlice.actions.removeCartItem(item.id))
                toast.info('Remove is succeed')
            }
        })
    }
    const handleCreateCustomerInfo = (values) => {
        Swal.fire({
            title: `Are you sure to checkout cart ?`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(checkoutThunkAction({
                    cartId: cartId,
                    cartDetails: [...cartDetails],
                    cartInfo: {
                        ...cartInfo
                    },
                    customerInfo: {
                        ...values
                    }
                }))
                toast.info('Checkout is succeed')
                reset()
            }
        })
    }
    return (
        <MainLayout>
            <div className="container mt-1">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className=" py-2">Cart Detail</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <table className="table cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="text-end">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-end">Total</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartDetails?.map((item) => (
                                        <tr key={item.id}>
                                            <td style={{ maxWidth: '200px' }}>
                                                <div className="d-flex align-items-center">
                                                    <img className="product-image" src={item?.images[0]} alt="" />
                                                    <div className="d-inline">
                                                        <div className="d-block fw-bolder mb-2">{item?.title.toLocaleUpperCase()}</div>
                                                        <div className="d-block">{item?.brand.toLocaleUpperCase()}</div>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="text-end">
                                                ${item.newPrice}
                                            </td>
                                            <td >
                                                <div className="cart-quantity-wrap">
                                                    <div className="cart-quantity">
                                                        <span
                                                            role="button"
                                                            onClick={() => handleDecreament(item)}
                                                        >
                                                            -
                                                        </span>
                                                        <span>{item?.quantity}</span>
                                                        <span
                                                            role="button"
                                                            onClick={() => handleIncreament(item)}
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="text-end">
                                                ${item?.amount}
                                            </td>
                                            <td>
                                                <div className="action-wrap">
                                                    <span className="btn-remove"
                                                        role="button"
                                                        onClick={() => handleRemove(item)}
                                                    >
                                                        &times;
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="row col-md-12">
                            <Link to={'/'}>
                                <FaArrowLeft /> Countinue shopping
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4" style={{ minWidth: '300px' }}>
                        <div className="order-summary p-3">
                            <h3 className="border-bottom py-2">Order Summary</h3>
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Subtotal</span>
                                    <span className="fw-bolder">${cartInfo?.subtotal}</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Shipping</span>
                                    <span className="fw-bolder">
                                        {
                                            cartInfo?.shiping ? '$' + cartInfo?.shiping : 'Free'
                                        }
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Total number of products</span>
                                    <span className="fw-bolder">{cartInfo?.subQuantity}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top mt-2 py-2">
                                <span className="fs-6">Total amount</span>
                                <span className="fw-bolder fs-6">${cartInfo?.total}</span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleCreateCustomerInfo)}>
                            <div className="customer-info p-3">
                                <h3 className="border-bottom py-2">Customer Info</h3>
                                <div className="form-group mb-3">
                                    <label className="form-label">Fullname</label>
                                    <input type="text"
                                        className={`${errors.fullname?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Fullname"
                                        {...register('fullname')}
                                    />
                                    <span className="invalid-feedback">{errors.fullname?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text"
                                        className={`${errors.address?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Address"
                                        {...register('address')}
                                    />
                                    <span className="invalid-feedback">{errors.address?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text"
                                        className={`${errors.email?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Email"
                                        {...register('email')}
                                    />
                                    <span className="invalid-feedback">{errors.email?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Mobile</label>
                                    <input type="text"
                                        className={`${errors.mobile?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Mobile"
                                        {...register('mobile')}
                                    />
                                    <span className="invalid-feedback">{errors.mobile?.message}</span>
                                </div>
                            </div>
                            <div className="py-3 bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout">
                                <button type="submit" className="btn btn-block flex-grow-1">
                                    CHECKOUT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default CartPage