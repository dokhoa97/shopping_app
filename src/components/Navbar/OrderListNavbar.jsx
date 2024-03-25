import { FaListAlt, FaSignOutAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

function OrderListNavbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container border-bottom">
                <Link to={'/orderlist/list'} className="navbar-brand d-flex align-items-center">
                    <FaListAlt size={40} className="me-2" />
                    Order List
                </Link>
                <Link to={'/'} className="btn btn-signout d-flex algin-items-center">
                    <FaSignOutAlt className="me-2" size={18} />
                    Back to Shop Mall
                </Link>
            </div>
        </nav>
    )
}
export default OrderListNavbar