import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Products() {
  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  let { data, isError, isLoading, error } = useProducts();
  let { addProductToCart, getLoggedUserCart } = useContext(CartContext);
  let { addProductToWishlist, deleteWishlistProduct, getAllWishlistProducts } =
    useContext(WishlistContext);

  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [wishlistData, setwishlistData] = useState([]);
  const [wishLoader, setwishLoader] = useState(false);

  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      getLoggedUserCart();
      toast.success(response.data.message, {
        position: "bottom-right",
        className: "custom-toast",
      });
    } else {
      toast.error(response.data.message, {
        position: "bottom-right",
        className: "custom-toast",
      });
    }
    setLoading(false);
  }

  async function getLoggedUserWishlist() {
    setwishLoader(true);
    let response = await getAllWishlistProducts();

    setwishlistData(response.data.data);
    setwishLoader(false);
  }

  async function toggleWishlist(id) {
    setwishLoader(true);
    const isInWishlist = wishlistData.some((item) => item.id === id);

    let response;
    if (isInWishlist) {
      response = await deleteWishlistProduct(id);
      toast.success("Removed from wishlist", (position = "bottom-right"));
    } else {
      response = await addProductToWishlist(id);
      toast.success("Added to wishlist", (position = "bottom-right"));
    }

    getLoggedUserWishlist();

    toggleHeart(id, !isInWishlist);
  }

  function toggleHeart(id, isAdding) {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: isAdding,
    }));
    setwishLoader(false);
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }
  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <>
      {wishLoader ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center bg-[#ffffff90] z-[999] justify-center">
          <div className="loader"></div>
        </div>
      ) : null}
      <form className="mt-10 mx-auto max-w-screen-md">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm bg-slate-300 placeholder:text-slate-700 rounded-3xl font-semibold text-slate-700"
            placeholder="Search Mockups, Logos..."
            required
          />
        </div>
      </form>
      <div className="row">
        {filteredProducts?.map((product) => (
          <div
            className="xs:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5"
            key={product.id}
          >
            <div className="product p-3 my-2 relative">
              <i
                onClick={() => toggleWishlist(product.id)}
                className={`fa-heart absolute ${
                  checkedItems[product.id] ||
                  wishlistData.some((item) => item.id === product.id)
                    ? "text-red-600 fa-solid"
                    : "fa-regular"
                } top-6 bg-white p-2 shadow-lg rounded-lg z-50 text-xl cursor-pointer hover:scale-110 duration-200 left-6`}
                aria-label={`Toggle wishlist for ${product.title}`}
              ></i>
              <Link
                to={`/productDetails/${product.id}/${product.category.name}`}
              >
                <div className="shadow-lg p-3 duration-500 rounded-xl hover:shadow-emerald-500  relative">
                  <img
                    src={product.imageCover}
                    className="w-full"
                    alt={product.title}
                  />
                  <h3 className="text-emerald-600">{product.category.name}</h3>
                  <h3 className="mb-2 font-semibold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                disabled={loading && currentId === product.id}
                onClick={() => addToCart(product.id)}
                className="bg-emerald-700 disabled:bg-red-500 disabled:cursor-wait text-white font-semibold w-full mt-3 rounded-lg p-2 btn"
              >
                {loading && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
