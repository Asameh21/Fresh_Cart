import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import { WishlistContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  let { getAllWishlistProducts, deleteWishlistProduct } =
    useContext(WishlistContext);

  let { addProductToCart } = useContext(CartContext);
  const [data, setdata] = useState(null);
  const [toggleLoading, settoggleLoading] = useState(false);
  const [loader, setloader] = useState(true);

  async function getAll() {
    let { data } = await getAllWishlistProducts();
    setdata(data.data);
    settoggleLoading(false);
    setloader(false);
  }

  async function addCart(id) {
    await addProductToCart(id);
    handleDelete(id);
    toast.success("Product added to cart successfuly", {
      position: "bottom-right",
    });
  }

  useEffect(() => {
    getAll();
  }, []); // Run only on mount

  async function handleDelete(productId) {
    await deleteWishlistProduct(productId);
    getAll(); // Refresh the wishlist after deletion
  }

  return (
    <>
      {loader ? (
        <div className="top-0 fixed left-0 right-0 bottom-0 z-[900] bg-[#ffffff90] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {toggleLoading ? (
            <div className="top-0 fixed left-0 right-0 bottom-0 z-[900] bg-[#ffffff90] flex items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : null}

          {data?.length > 0 ? (
            <>
              <h2 className="capitalize text-emerald-600 font-bold text-center text-2xl my-4">
                Count of products: {data?.length}
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
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Remove
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Add to cart
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((product) => (
                      <tr
                        key={product.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => {
                              settoggleLoading(true);
                              handleDelete(product.id);
                            }}
                            className="cursor-pointer font-medium bg-red-600 text-white p-2 px-3 rounded-lg"
                          >
                            Remove
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => {
                              settoggleLoading(true);
                              addCart(product.id);
                            }}
                            className="cursor-pointer font-medium bg-emerald-600 text-white p-2 px-3 rounded-lg"
                          >
                            Add
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : data?.length == 0 ? (
            <h1 className="text-3xl font-bold bg-red-600 rounded-xl p-4 text-white capitalize m-auto  text-center my-8">
              There are no products in the wishlist yet
            </h1>
          ) : null}
        </>
      )}
    </>
  );
}
