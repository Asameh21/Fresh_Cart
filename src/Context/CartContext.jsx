import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numberItems, setnumberItems] = useState(0);
  const [loader, setloader] = useState(true);
  const [cartId, setcartId] = useState(null);

  // Function to get headers with token
  function getHeaders() {
    const token = localStorage.getItem("samehfreshCartToken");
    if (!token) {
      // If token is not found, return an error or handle as needed
      return null;
    }
    return {
      token: token,
    };
  }

  function addProductToCart(productId) {
    const headers = getHeaders();
    if (!headers) return; // Exit if no token

    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    const headers = getHeaders();
    if (!headers) return; // Exit if no token

    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => {
        setnumberItems(res.data.numOfCartItems);
        setloader(false);
        setcartId(res.data.data._id);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartProductQuantity(productId, newCount) {
    const headers = getHeaders();
    if (!headers) return; // Exit if no token

    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteCartItem(productId) {
    const headers = getHeaders();
    if (!headers) return; // Exit if no token

    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function clearCartItems() {
    const headers = getHeaders();
    if (!headers) return; // Exit if no token

    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function Checkout(cartId, url, formData) {
    const headers = getHeaders();
    if (!headers) return; // Exit if no token

    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          getLoggedUserCart,
          updateCartProductQuantity,
          deleteCartItem,
          clearCartItems,
          Checkout,
          numberItems,
          setnumberItems,
          cartId,
          loader,
        }}
      >
        {props.children}
      </CartContext.Provider>
    </>
  );
}
