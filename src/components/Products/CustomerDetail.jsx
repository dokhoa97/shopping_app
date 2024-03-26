import { useEffect } from "react";
import { FaAddressBook, FaMoneyBill, FaPhoneAlt, FaUser } from "react-icons/fa"
import { MdDateRange, MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { orderListSelector } from "../../store/selectors";
import dayjs from "dayjs";
function CustomerDetail() {
    const { detailList } = useSelector(orderListSelector)
    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-around">
                <div className="text-info py-2">Customer Info</div>
                <div className="text-center text-info py-2">Cart Detail</div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center w-50  ">
                    <div className="border-dashed align-items-center py-2">
                        <FaUser size={20} className="text-primary me-2" />
                        <span>{detailList.customerInfo.fullname} </span>
                    </div>
                    <div className="border-dashed align-items-center py-2">
                        <MdEmail size={20} className="text-primary me-2" />
                        <span>{detailList.customerInfo.email}</span>
                    </div>
                    <div className="border-dashed align-items-center py-2">
                        <MdDateRange size={20} className="text-primary me-2" />
                        <span>{dayjs(detailList.cartInfo.orderDate).format('DD MM YYYY')}</span>
                    </div>
                    <div className="border-dashed align-items-center py-2">
                        <FaPhoneAlt size={20} className="text-primary me-2" />
                        <span>{detailList.customerInfo.mobile}</span>
                    </div>
                    <div className="border-dashed align-items-center py-2">
                        <FaAddressBook size={20} className="text-primary me-2" />
                        <span>{detailList.customerInfo.address}</span>
                    </div>
                    <div className="border-dashed align-items-center py-2">
                        <FaMoneyBill size={20} className="text-primary me-2" />
                        <span>${detailList.cartInfo.total}</span>
                    </div>
                </div>
                <div className="w-40">
                    <table className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                        <thead>
                            <tr className="table-secondary">
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                detailList.cartDetails?.map(item => (
                                    <tr key={item.id} className="">
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.newPrice}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CustomerDetail