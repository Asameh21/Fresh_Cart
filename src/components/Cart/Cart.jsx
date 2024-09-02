import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // Make sure to import Swal
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    clearCartItems,
    numberItems,
    setnumberItems,
  } = useContext(CartContext);
  const [cartDetails, setcartDetails] = useState(null);
  const [loader, setloader] = useState(true);
  const [counterLoader, setcounterLoader] = useState(false);
  const [clearLoader, setclearLoader] = useState(false);
  const [currentId, setcurrentId] = useState(0);

  async function getCartItems() {
    try {
      let response = await getLoggedUserCart();
      if (
        response?.data &&
        response?.data?.status === "success" &&
        response?.data?.data?.products?.length >= 0
      ) {
        setcartDetails(response.data.data);
      } else {
        setcartDetails(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch cart items", {
        position: "bottom-right",
        className: "custom-toast",
      });
    } finally {
      setloader(false);
    }
  }

  async function updateProduct(id, count) {
    setcurrentId(id);
    setcounterLoader(true);
    if (count === 0) {
      deleteItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status === "success") {
        toast.success("Product updated successfully", {
          position: "bottom-right",
          className: "custom-toast",
        });
        setcartDetails(response.data.data);
      } else {
        toast.error("There is a problem");
      }
      setcounterLoader(false);
    }
  }

  async function deleteItem(productId) {
    setloader(true);
    try {
      let response = await deleteCartItem(productId);
      if (response.data.status === "success") {
        toast.success("Product deleted successfully", {
          position: "bottom-right",
          className: "custom-toast",
        });
        setcartDetails(response.data.data);
        setnumberItems(numberItems - 1);
      } else {
        toast.error("There is a problem");
      }
    } finally {
      setloader(false);
      setcounterLoader(false);
    }
  }

  async function clearCart() {
    setclearLoader(true);
    let response = await clearCartItems();
    if (response.data.message === "success") {
      toast.success("Your cart cleared successfully", {
        position: "bottom-right",
        className: "custom-toast",
      });
      setnumberItems(0);
      setcartDetails(null);
    } else {
      toast.error("There is a problem");
    }
    setclearLoader(false);
  }

  const cartAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to clear the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
      }
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {loader ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : cartDetails?.products?.length > 0 ? (
        <>
          <h2 className="capitalize text-emerald-600 font-bold text-center text-2xl my-4">
            Total Price: {cartDetails?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products?.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={counterLoader}
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center disabled:bg-red-800 disabled:cursor-wait justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>
                            {counterLoader &&
                            product.product.id === currentId ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              product.count
                            )}
                          </span>
                        </div>
                        <button
                          disabled={counterLoader}
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex disabled:bg-red-800 disabled:cursor-wait items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/checkout">
            <button className="w-full bg-emerald-600 rounded-xl disabled:cursor-wait text-white font-semibold text-2xl py-4 mt-4">
              Checkout
            </button>
          </Link>
          <button
            onClick={cartAlert}
            className="w-full bg-red-600 rounded-xl disabled:cursor-wait text-white font-semibold text-2xl py-4 my-4"
            disabled={clearLoader}
          >
            {clearLoader ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Clear Cart"
            )}
          </button>
        </>
      ) : (
        <h1 className="text-3xl font-bold bg-red-600 rounded-xl p-4 text-white capitalize m-auto  text-center my-8">
          There are no products in the cart yet
        </h1>
      )}
    </>
  );
}
