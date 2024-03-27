import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"


function CustomerDetail() {
    const [detailCustomer, setDetailCustomer] = useState([])
    const { userId } = useParams()
    useEffect(() => {
        async function getDetailCustomer() {
            let res = await fetch(`http://localhost:3030/orderlist/${userId}`, { method: 'GET' })
            let data = await res.json()
            setDetailCustomer(data)
        }
        getDetailCustomer()
    }, [userId])
    const { customerInfo, cartDetails } = detailCustomer
    return (
        <div className="container overflow-hidden vh-50">
            <div className="row py-3">
                <div className="col-md-5 col-lg-5 col-sm-12">
                    <div className="bg-light border p-3 d-lfex flex-column">
                        <div>
                            <h5>Information</h5>
                        </div>
                        <div className="border-top p-2 d-flex justify-content-around align-items-center">
                            <div className="me-4 text-center">
                                <p className="text-primary">Fullname</p>
                                <span className="">{customerInfo?.fullname}</span>
                            </div>
                            <div className="me-4 text-center">
                                <p className="text-primary">Phone</p>
                                <span className="">{customerInfo?.mobile}</span>
                            </div>
                        </div>
                        <div className="border-top p-2 d-flex justify-content-around align-items-center">
                            <div className="me-4 text-center">
                                <p className="text-primary">Email</p>
                                <span className="">{customerInfo?.email}</span>
                            </div>
                            <div className="me-4 text-center">
                                <p className="text-primary">Address</p>
                                <span className="">{customerInfo?.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-lg-7 col-sm-12 ">
                    <div className="bg-light border p-3">
                        <div>
                            <h5>Bought Products</h5>
                        </div>
                        {
                            cartDetails?.map((item, index) => (
                                <div key={index} className="border p-2 d-flex justify-content-around">
                                    <div className="me-4 text-center">
                                        <p className="text-primary">#ID</p>
                                        <span className="">{index + 1}</span>
                                    </div>
                                    <div className="me-4 text-center">
                                        <p className="text-primary">Product name</p>
                                        <span className="">{item.title}</span>
                                    </div>
                                    <div className="me-4 text-center">
                                        <p className="text-primary">Amopunt</p>
                                        <span className="">${item.amount}</span>
                                    </div>
                                    <div className="me-4 text-center">
                                        <p className="text-primary">Quantity</p>
                                        <span className="">{item.quantity}</span>
                                    </div>
                                    <div className="me-4 text-center">
                                        <p className="text-primary">Order Date</p>
                                        <span className="">{dayjs(detailCustomer.cartInfo.orderDate).format('DD MM YYYY')}</span>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
            <Link to={'/orderlist/list'} className="btn btn-signout-sm ">
                <FaSignOutAlt className="me-2" size={18} />
                Back to Order List
            </Link>
        </div>
    )
}
export default CustomerDetail