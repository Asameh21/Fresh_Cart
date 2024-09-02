import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../../finalProject_assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { numberItems, loader } = useContext(CartContext);
  let navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function signOut() {
    localStorage.removeItem("samehfreshCartToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <>
      {/* <nav
        style={{ zIndex: 9999 }}
        className="flex justify-center fixed top-0 left-0 right-0 align-middle  p-4 px-16 bg-slate-200 flex-wrap lg:justify-between"
      >
        <div className="left-section flex align-middle">
          <Link to="">
            <img src={logo} className="w-[150px] pe-5" alt="" />
          </Link>
        </div>
        <div className="middle-section">
          {userLogin !== null ? (
            <div className="links flex gap-4">
              <NavLink className="text-slate-700" to="">
                Home
              </NavLink>
              <NavLink className="text-slate-700" to="cart">
                Cart
              </NavLink>
              <NavLink className="text-slate-700" to="products">
                Proudcts
              </NavLink>
              <NavLink className="text-slate-700" to="categories">
                Categories
              </NavLink>
              <NavLink className="text-slate-700" to="brands">
                Brands
              </NavLink>
              <NavLink className="text-slate-700" to="wishlist">
                Wishlist
              </NavLink>
            </div>
          ) : null}
        </div>
        <div className="right-section flex align-middle items-center">
          <div className="social-links flex gap-5 align-middle items-center pe-5">
            {userLogin !== null ? (
              <>
                <Link to="cart" className="ms-2 relative">
                  <i className="fa-solid fa-cart-shopping "></i>
                  <div className="absolute top-[-15px] right-[-10px] bg-emerald-400 text-white text-sm px-1 rounded-lg ">
                    {loader ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      numberItems
                    )}
                  </div>
                </Link>
                <span onClick={signOut} className="cursor-pointer" id="pointer">
                  Log out
                </span>
              </>
            ) : (
              <>
                <Link to="register">Register</Link>
                <Link to="login">Log in</Link>
              </>
            )}
          </div>
        </div>
      </nav> */}

      <nav className="bg-slate-300 border-gray-200 fixed left-0 right-0 top-0 z-[99999] w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="right-section flex align-middle items-center">
              <div className="social-links flex gap-5 align-middle items-center pe-5">
                {userLogin !== null ? (
                  <>
                    <Link to="cart" className="ms-2 relative">
                      <i className="fa-solid fa-cart-shopping "></i>
                      <div className="absolute top-[-15px] right-[-10px] bg-emerald-400 text-white text-sm px-1 rounded-lg ">
                        {loader ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          numberItems
                        )}
                      </div>
                    </Link>
                    <span
                      onClick={signOut}
                      className="cursor-pointer"
                      id="pointer"
                    >
                      Log out
                    </span>
                  </>
                ) : (
                  <>
                    <Link to="register">Register</Link>
                    <Link to="login">Log in</Link>
                  </>
                )}
              </div>
            </div>
            {userLogin !== null ? (
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded={isMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            ) : null}
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-cta"
          >
            {userLogin !== null ? (
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border gap-3 border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                <li>
                  <NavLink to="/" aria-current="page">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart">Cart</NavLink>
                </li>
                <li>
                  <NavLink to="/wishlist">Wishlist</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/categories">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/brands">Brands</NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
