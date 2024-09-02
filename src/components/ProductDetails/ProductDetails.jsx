import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { id, category } = useParams();
  const [checkedItems, setCheckedItems] = useState({});
  const [wishlistData, setwishlistData] = useState([]);
  const [wishLoader, setwishLoader] = useState(false);
  let { addProductToWishlist, deleteWishlistProduct, getAllWishlistProducts } =
    useContext(WishlistContext);

  let { addProductToCart, numberItems, setNumberItems, getLoggedUserCart } =
    useContext(CartContext);

  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    try {
      let response = await addProductToCart(id);
      if (response.data.status === "success") {
        getLoggedUserCart();

        toast.success(response.data.message, {
          position: "bottom-right",
          className: "custom-toast",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  async function getProduct(id) {
    setMainLoading(true);
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch product.");
      console.error("Failed to fetch product:", error);
    } finally {
      setMainLoading(false);
    }
  }

  async function getRelatedProducts(category) {
    setRelatedLoading(true);
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setRelatedProducts(
        res.data.data.filter(
          (product) => product.category.name === category && product.id !== id
        )
      );
    } catch (error) {
      console.error("Failed to fetch related products:", error);
    } finally {
      setRelatedLoading(false);
    }
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
      toast.success("Removed from wishlist", {
        position: "bottom-right",
        className: "custom-toast",
      });
    } else {
      response = await addProductToWishlist(id);
      toast.success("Added to wishlist", {
        position: "bottom-right",
        className: "custom-toast",
      });
    }

    // Refresh the wishlist data
    getLoggedUserWishlist();

    // Toggle the visual heart icon
    toggleHeart(id, !isInWishlist);
  }

  function toggleHeart(id, isAdding) {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: isAdding,
    }));
    setwishLoader(false);
  }

  useEffect(() => {
    getProduct(id);
    getRelatedProducts(category);
    getLoggedUserWishlist();
  }, [id, category]);

  return (
    <>
      {wishLoader ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center bg-[#ffffff90] z-[999] justify-center">
          <div className="loader"></div>
        </div>
      ) : null}

      {mainLoading ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#ffffff90] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="row items-center text-start sm:flex-row flex-col gap-10 sm:gap-0">
          <div className=" sm:w-1/4 w-full relative">
            <i
              onClick={() => toggleWishlist(product?.id)}
              className={`fa-heart absolute ${
                checkedItems[product?.id] ||
                wishlistData.some((item) => item.id === product?.id)
                  ? "text-red-600 fa-solid"
                  : "fa-regular"
              } top-0 bg-white p-2 shadow-lg rounded-lg z-50 text-xl cursor-pointer hover:scale-110 duration-200 left-0`}
              aria-label={`Toggle wishlist for ${product?.title}`}
            ></i>

            {product && product?.images.length > 0 ? (
              <Slider {...settings}>
                {product?.images.map((src) => (
                  <img
                    src={src}
                    className="w-full"
                    key={src}
                    alt="Product Image"
                  />
                ))}
              </Slider>
            ) : (
              <span>Loading...</span>
            )}
          </div>
          <div className="w-full text-center sm:w-3/4 sm:text-left p-5">
            <h1 className="font-semibold capitalize text-2xl">
              {product?.title}
            </h1>
            <h4 className="text-gray-700 my-4">{product?.description}</h4>
            <h4 className="font-bold text-gray-700">
              {product?.category.name}
            </h4>
            <div className="flex justify-between items-center my-3">
              <span>{product?.price} EGP</span>
              <span>
                <i className="fas fa-star text-yellow-400"></i>{" "}
                {product?.ratingsAverage}
              </span>
            </div>
            <button
              className="hover:bg-emerald-700 disabled:bg-red-500 disabled:cursor-wait bg-emerald-500 text-white font-semibold w-full mt-3 rounded-lg p-2"
              onClick={() => addToCart(product.id)}
              disabled={loading && currentId === product.id}
            >
              {loading && currentId === product.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        </div>
      )}

      <div className="row">
        {relatedLoading ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#ffffff90] flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
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
                    <h3 className="text-emerald-600">
                      {product.category.name}
                    </h3>
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
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </>
  );
}
