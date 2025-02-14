import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import Wish from './components/Wish/Wish';
import Usercontextprovider from './components/Context/UserContext';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import ProductDeta from './components/ProductDeta/ProductDeta';
import CartContextProvider from './components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import CardLikeContextProvider from './components/Context/CarLikeContext';
import PasswordProcess from './components/PasswordProcess/PasswordProcess';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
      { path: "products", element: <ProtectRoute><Products /></ProtectRoute> },
      { path: "cart", element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: "brands", element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: "productdetails/:id/:category", element: <ProtectRoute><ProductDeta /></ProtectRoute> },
      { path: "categories", element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: "checkout", element: <ProtectRoute><Checkout /></ProtectRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "/passwordProcess", element: <PasswordProcess /> },
      { path: "passwordProcess/verifyCode", element: <VerifyCode/> },
      { path: "passwordProcess/resetPassword", element: <ResetPassword/> },

      { path: "wishlist", element: <ProtectRoute><Wish /></ProtectRoute> },
      { path: "allorders", element: <ProtectRoute><Allorders/></ProtectRoute> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Usercontextprovider>
        <CartContextProvider>
          <CardLikeContextProvider>
            <RouterProvider router={x} />
          </CardLikeContextProvider>
        </CartContextProvider>
      </Usercontextprovider>
      <Toaster />
    </>
  );
}

export default App;
