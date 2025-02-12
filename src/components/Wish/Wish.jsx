import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import "./Wish.css";
import { CardLikeContext } from "../Context/CarLikeContext";
import { CartContext } from "../Context/CartContext"; 

export default function Wish() {
  let { getLoggedUserWishlist, removeProductFromLike } = useContext(CardLikeContext);
  let { addProductToCard, getLoggedUserCard, setnumberItems } = useContext(CartContext); 

  const [CartLike, setCartLike] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(null); 

  
  async function likeCart() {
    setIsLoading(true);
    try {
      let response = await getLoggedUserWishlist();
      if (response.data.status === "success") {
        setCartLike(response.data.data);
      } else {
        toast.error("Failed to load wishlist");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    likeCart();
  }, []);

  
  async function deleteItem(productId) {
    try {
      let response = await removeProductFromLike(productId);
      if (response.data.status === "success") {
        toast.success("Product removed from wishlist");
        likeCart();
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      toast.error("Error removing product");
      console.error("Error deleting wishlist item:", error);
    }
  }

  
  async function addToCartAndRemove(productId) {
    setLoadingProduct(productId); 
    try {
      let response = await addProductToCard(productId);
      if (response?.data?.status === "success") {
        toast.success("Product added to cart successfully!");
        await deleteItem(productId); 
        let cartResponse = await getLoggedUserCard();
        setnumberItems(cartResponse.data.numOfCartItems);
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      toast.error("Error adding product to cart");
      console.error("Error adding to cart:", error);
    }
    setLoadingProduct(null);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-emerald-600 mb-6 text-center">Your Wishlist</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div> 
        </div>
      ) : CartLike.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CartLike.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
              <img src={product.imageCover} alt={product.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link to={`/products/${product._id}`} className="hover:text-emerald-600 transition">
                    {product.title}
                  </Link>
                </h3>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => deleteItem(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-600 transition duration-200"
                  >
                    <FaTrash className="mr-2" /> Remove
                  </button>
                  <button
                    onClick={() => addToCartAndRemove(product._id)}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-200 ${
                      loadingProduct === product._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loadingProduct === product._id}
                  >
                    {loadingProduct === product._id ? "Adding..." : <><FaShoppingCart className="mr-2" /> Add to Cart</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <h1 className="text-3xl font-bold text-gray-600">No products in wishlist</h1>
        </div>
      )}
    </div>
  );
}
