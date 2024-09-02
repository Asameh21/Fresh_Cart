import axios from "axios";
import React, { createContext } from "react";
import toast from "react-hot-toast";

// Correct export
export const WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  function addProductToWishlist(productId) {
    const headers = {
      token: localStorage.getItem("samehfreshCartToken"),
    };

    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then((res) => res);
  }

  function getAllWishlistProducts() {
    const headers = {
      token: localStorage.getItem("samehfreshCartToken"),
    };

    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((res) => res);
  }

  function deleteWishlistProduct(id) {
    const headers = {
      token: localStorage.getItem("samehfreshCartToken"),
    };

    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => {
        res;
      });
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getAllWishlistProducts,
        deleteWishlistProduct,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
