import OrderListFooter from "../components/Footer/OrderListFooter";
import OrderListNavbar from "../components/Navbar/OrderListNavbar";

function OrderListLayout({ children }) {
    return (
        <>
            <OrderListNavbar />
            <div className="container d-flex">
                <div className="flex-grow-1">
                    {children}
                </div>
            </div>
            <OrderListFooter />
        </>
    )
}
export default OrderListLayout