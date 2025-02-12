import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';
import { CardLikeContext } from '../Context/CarLikeContext';
import "./Navbar.module.css";
import { initFlowbite } from 'flowbite';

export default function Navbar() {
  let { UserLogin, setUserLogin } = useContext(UserContext);
  let { numberItems } = useContext(CartContext);
  let { wishlistCount } = useContext(CardLikeContext);
  let navigate = useNavigate();

  // تهيئة Flowbite عند تحميل المكون
  useEffect(() => {
    initFlowbite();
  }, []);

  function LogOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-[#F8F9FA] border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <i className="fa-solid fa-cart-shopping fa-xl icon-cart"></i>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Fresh Cart
            </span>
          </Link>

          <div className="flex items-center md:order-3 space-x-3">
            {UserLogin && (
              <NavLink to="/cart" className="hidden md:block p-2 text-slate-600 hover:bg-gray-100 rounded-full relative">
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
                {numberItems > 0 && (
                  <div className="absolute top-[-5px] right-[-5px] bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {numberItems}
                  </div>
                )}
              </NavLink>
            )}

            {UserLogin && (
              <NavLink to="/wishlist" className="hidden md:block p-2 text-slate-600 hover:bg-gray-100 rounded-full relative">
                <i className="fa-solid fa-heart text-2xl"></i>
                {wishlistCount > 0 && (
                  <div className="absolute top-[-5px] right-[-5px] bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {wishlistCount}
                  </div>
                )}
              </NavLink>
            )}

            <div className="hidden md:flex items-center gap-4">
              {UserLogin ? (
                <button onClick={LogOut} className="px-3 py-2 text-red-600 hover:bg-gray-100 rounded-sm">
                  Log Out
                </button>
              ) : (
                <>
                  <Link to="/register" className="px-3 py-2 text-slate-600 hover:bg-gray-100 rounded-sm">
                    Register
                  </Link>
                  <Link to="/login" className="px-3 py-2 text-slate-600 hover:bg-gray-100 rounded-sm">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            data-collapse-toggle="navbar-menu"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>

          <div className="hidden w-full md:flex md:w-auto md:order-2 md:flex-1" id="navbar-menu">
            {UserLogin ? (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-6 md:mt-0 md:border-0 md:mx-auto">
                <li><NavLink to="/" className="block py-2 text-slate-600">Home</NavLink></li>
                <li><NavLink to="/cart" className="block py-2 text-slate-600">Cart</NavLink></li>
                <li><NavLink to="/products" className="block py-2 text-slate-600">Products</NavLink></li>
                <li><NavLink to="/categories" className="block py-2 text-slate-600">Categories</NavLink></li>
                <li><NavLink to="/brands" className="block py-2 text-slate-600">Brands</NavLink></li>

                {/* Mobile-only items */}
                <li className="md:hidden flex items-center gap-4">
                  <NavLink to="/cart" className="relative block py-2 text-slate-600">
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    {numberItems > 0 && (
                      <div className="absolute top-[-5px] right-[-5px] bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {numberItems}
                      </div>
                    )}
                  </NavLink>
                  <NavLink to="/wishlist" className="relative block py-2 text-slate-600">
                    <i className="fa-solid fa-heart text-2xl"></i>
                    {wishlistCount > 0 && (
                      <div className="absolute top-[-5px] right-[-5px] bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {wishlistCount}
                      </div>
                    )}
                  </NavLink>
                  <button onClick={LogOut} className="block py-2 text-red-600 hover:text-red-700">
                    Log Out
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="md:hidden flex flex-col p-4 mt-4 font-medium rounded-lg">
                <li><Link to="/login" className="block py-2 text-slate-600">Login</Link></li>
                <li><Link to="/register" className="block py-2 text-slate-600">Register</Link></li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}