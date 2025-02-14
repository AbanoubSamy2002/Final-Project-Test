import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import { CardLikeContext } from "../Context/CarLikeContext";
import toast from "react-hot-toast";
import Footer from './../Footer/Footer';

export default function Categories() {
  const { addProductToCard, setnumberItems } = useContext(CartContext);
  const { addProductToLike, removeProductFromLike } = useContext(CardLikeContext);
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
          axios.get("https://ecommerce.routemisr.com/api/v1/products")
        ]);
        
        setCategories(categoriesRes.data.data);
        setProducts(productsRes.data.data);
      } catch (error) {
        toast.error("Failed to load data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || product.category.name === selectedCategory)
  );

  const handleAddToCart = async (productId) => {
    setBtnLoading(productId);
    try {
      const response = await addProductToCard(productId);
      if (response.data.status === "success") {
        toast.success("Product added to cart!");
        setnumberItems(prev => prev + 1);
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    }
    setBtnLoading(null);
  };

  const toggleWishlist = async (productId) => {
    try {
      if (likedProducts.includes(productId)) {
        await removeProductFromLike(productId);
        setLikedProducts(prev => prev.filter(id => id !== productId));
        toast.success("Removed from wishlist!");
      } else {
        await addProductToLike(productId);
        setLikedProducts(prev => [...prev, productId]);
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  if (loading) return (
    <div className="absolute inset-0 bg-white bg-opacity-90 z-40 flex items-center justify-center rounded-xl">
            <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          </div>
  );

  return<>
<h2 className="text-center my-4 text-emerald-600 text-2xl font-bold ">

Categories
</h2>

   <div className="container mx-auto p-4 relative">
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-90 z-40 flex items-center justify-center rounded-xl">
          <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-6 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
        <div 
          className={`p-4 rounded-xl shadow-md cursor-pointer transition-all h-full ${
            selectedCategory === "All" ? "bg-emerald-100" : "bg-white hover:shadow-lg"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
            <i className="fas fa-boxes text-3xl text-emerald-600"></i>
          </div>
          <h3 className="text-center font-medium">All Categories</h3>
        </div>

        {categories.map(category => (
          <div 
            key={category._id} 
            className={`p-4 rounded-xl shadow-md cursor-pointer transition-all h-full ${
              selectedCategory === category.name ? "bg-emerald-100" : "bg-white hover:shadow-lg"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="text-center font-medium">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Products Display */}
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="relative flex-1">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-64 object-contain p-4"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="p-2 bg-white/80 rounded-full shadow-sm hover:bg-red-50"
                >
                  <i className={`fa-heart ${likedProducts.includes(product._id) ? 'fas text-red-500' : 'far text-gray-400'}`}></i>
                </button>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-emerald-600 font-bold">{product.price} EGP</span>
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  {product.ratingsAverage}
                </div>
              </div>
              
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2"
                disabled={btnLoading === product._id}
              >
                {btnLoading === product._id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <>
                    <i className="fas fa-cart-plus"></i>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <h3 className="text-2xl mb-4">No products found</h3>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  
  
    <Footer/>
  </>
}