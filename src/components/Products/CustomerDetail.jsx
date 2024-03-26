import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from "dayjs";
const schema = yup.object({
    fullname: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.string().required(),
    orderDate: yup.string().required(),
    total: yup.string().required(),
})
function CustomerDetail() {
    const { itemId } = useParams()
    // const [detailCustomer, setDetailCustomer] = useState([])
    // const [detailCart, setDetailCart] = useState({
    //     title: '',
    //     amount: 0,
    //     quantity: 0
    // })
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        async function getDetailCustomer() {
            let res = await fetch(`http://localhost:3030/orderlist/${itemId}`, { method: 'GET' })
            let data = await res.json()
            setValue('fullname', data?.customerInfo.fullname)
            setValue('email', data?.customerInfo.email)
            setValue('mobile', data?.customerInfo.mobile)
            setValue('address', data?.customerInfo.address)
            setValue('total', data?.cartInfo.total)
            setValue('orderDate', dayjs(data?.cartInfo.orderDate).format('YYYY-MM-DD'))
            // setDetailCustomer(data)
        }
        getDetailCustomer()
    }, [itemId])
    const handleUpdateCutomerOrder = async (value) => {
        const data = {
            customerInfo: {
                fullname: value.fullname,
                email: value.email,
                address: value.address,
                mobile: value.mobile
            },
            cartInfo: {
                orderDate: value.orderDate,
                total: value.total
            }

        }
        let res = await fetch(`http://localhost:3030/orderlist/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let result = await res.json()
        console.log(result);
    }
    return (
        <form onSubmit={handleSubmit(handleUpdateCutomerOrder)}>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p>Customer Info</p>
                <div className="d-flex mb-3">
                    <div>
                        <div className="me-3">
                            <label htmlFor="" className="form-label">Fullname</label>
                            <input type="text" className={`${errors.fullname?.message ? 'is-invalid' : ''} form-control`}
                                {...register('fullname')}
                            />
                            <span className="invalid-feedback">{errors.fullname?.message}</span>
                        </div>
                        <div className="me-3">
                            <label htmlFor="" className="form-label">Email</label>
                            <input type="email" className={`${errors.email?.message ? 'is-invalid' : ''} form-control`}
                                {...register('email')}
                            />
                            <span className="invalid-feedback">{errors.email?.message}</span>
                        </div>
                        <div className="me-3">
                            <label htmlFor="" className="form-label">Mobile</label>
                            <input type="text" className={`${errors.mobile?.message ? 'is-invalid' : ''} form-control`}
                                {...register('mobile')}
                            />
                            <span className="invalid-feedback">{errors.mobile?.message}</span>
                        </div>
                    </div>
                    <div>
                        <div className="me-3">
                            <label htmlFor="" className="form-label">Order Date</label>
                            <input type="date" className={`${errors.orderDate?.message ? 'is-invalid' : ''} form-control`}
                                {...register('orderDate')}
                            />
                            <span className="invalid-feedback">{errors.orderDate?.message}</span>
                        </div>
                        <div className="me-3">
                            <label htmlFor="" className="form-label">Address</label>
                            <input type="text" className={`${errors.address?.message ? 'is-invalid' : ''} form-control`}
                                {...register('address')}
                            />
                            <span className="invalid-feedback">{errors.address?.message}</span>
                        </div>
                        <div className="me-3">
                            <label htmlFor="" className="form-label">Total</label>
                            <input type="text" className={`${errors.total?.message ? 'is-invalid' : ''} form-control`}
                                {...register('total')}
                            />
                            <span className="invalid-feedback">{errors.total?.message}</span>
                        </div>
                    </div>
                </div>
                {/* <p>Detail Cart</p> */}
                {/* <div className="d-flex">
                    {
                        detailCustomer?.cartDetails?.map(item => (
                            <div key={item.id} className="border me-2 p-2">
                                <div className="me-3 ">
                                    <label htmlFor="" className="form-label">Product Name</label>
                                    <input type="text" className="form-control form-control-sm"
                                        defaultValue={item.title}
                                        onChange={e => setDetailCart({
                                            ...detailCart,
                                            title: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="me-3">
                                    <label htmlFor="" className="form-label">Amount</label>
                                    <input type="number" className="form-control form-control-sm"
                                        defaultValue={item.amount}
                                        onChange={e => setDetailCart({
                                            ...detailCart,
                                            amount: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="me-3">
                                    <label htmlFor="" className="form-label">Total of Products</label>
                                    <input type="number" className="form-control form-control-sm"
                                        defaultValue={item.quantity}
                                        onChange={e => setDetailCart({
                                            ...detailCart,
                                            quantity: e.target.value
                                        })}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div> */}
            </div>
            <div className="d-flex flex-row-reverse bd-highlight mt-4">
                <div>
                    <button type="button" className="btn btn-dark p-2 bd-highlight">Back</button>
                </div>
                <div className="me-2">
                    <button type="submit" className="btn btn-success p-2 bd-highlight">Save</button>
                </div>
            </div>
        </form>
    )
}
export default CustomerDetail