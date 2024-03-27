import dayjs from "dayjs"
import { useEffect } from "react"
import { FaUser, FaUserCog, FaUserTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { orderListThunkAction, removeCustomerThunkAction } from "../../redux-toolkit/orderListSlice";
import { orderListSelector } from "../../store/selectors";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function CustomerList() {
    const dispatch = useDispatch()
    const { dataList } = useSelector(orderListSelector)
    useEffect(() => {
        dispatch(orderListThunkAction())
    }, [])
    const handleRemoveCustomer = (item) => {
        Swal.fire({
            title: `Are you sure remove ${item.customerInfo.fullname}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeCustomerThunkAction(item))
                dispatch(orderListThunkAction())
                toast.info('Remove is succeed')
            }
        })
    }
    return (
        <table className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
            <thead className="table-secondary">
                <tr>
                    <th className="text-center">#ID</th>
                    <th className="text-center">Fullname</th>
                    <th className="text-center">Mobile</th>
                    <th className="text-center">Order Date</th>
                    <th className="text-center">Bill Total Amount</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataList?.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-center ">{index + 1}</td>
                            <td className="text-center text-primary">{item.customerInfo.fullname}</td>
                            <td className="text-center ">{item.customerInfo.mobile}</td>
                            <td className="text-center text-warning">{dayjs(item.cartInfo.orderDate).format('MMM DD YYYY')}</td>
                            <td className="text-center text-danger ">${item.cartInfo.subtotal}</td>
                            <td className="text-center ">
                                <div className="d-flex align-items-center justify-content-center">
                                    <FaUserTimes size={15} role="button"
                                        title="Remove!!"
                                        className="me-2 text-danger"
                                        onClick={() => handleRemoveCustomer(item)}
                                    />
                                    <Link to={`/orderlist/${item.id}`}>
                                        <FaUser size={12}
                                            role="button"
                                            className="text-primary me-2"
                                            title="Detail Customer"

                                        />
                                    </Link>
                                    <FaUserCog size={15} role="button" className="text-warning" />
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
export default CustomerList