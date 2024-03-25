import { NavLink, Outlet, useLocation } from "react-router-dom"
import OrderListLayout from "../layouts/OrderListLayout"
function OrderListPage() {
    const location = useLocation()
    const pathName = location.pathname.split('/').pop()
    const isActive = pathName === 'list' || pathName === 'orderlist'
    return (
        <OrderListLayout>
            <ul className="nav nav-tabs mb-2">
                <li className="nav-item">
                    <NavLink to={'/orderlist/list'} className={`nav-link d-flex algin-items-center ${isActive ? 'active' : ''}`}>

                        Order List
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/orderlist/detail'} className='nav-link d-flex aglin-items-center'>
                        Customer Detail
                    </NavLink>
                </li>
            </ul>
            <Outlet />
        </OrderListLayout>
    )
}
export default OrderListPage