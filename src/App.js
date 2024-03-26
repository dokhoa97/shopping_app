
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderListPage from './pages/OrderListPage';
import CustomerList from './components/Products/CustomerList';
import CustomerDetail from './components/Products/CustomerDetail';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/orderlist' element={<OrderListPage />} >
          <Route index element={<CustomerList />} />
          <Route path='list' element={<CustomerList />} />
          <Route path=':itemId' element={<CustomerDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
