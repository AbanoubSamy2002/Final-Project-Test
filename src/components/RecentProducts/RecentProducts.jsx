import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { CardLikeContext } from '../Context/CarLikeContext';
import toast from 'react-hot-toast';
import Footer from './../Footer/Footer';

export default function RecentProducts() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedProducts, setLikedProducts] = useState([]);
  const [loadingLike, setLoadingLike] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { addProductToCard, setnumberItems, numberItems } = useContext(CartContext);
  const { addProductToLike, removeProductFromLike, getLoggedUserWishlist } = useContext(CardLikeContext);

  useEffect(() => {
    setInitialLoading(true);
    getProducts();
    fetchWishlist()
      .finally(() => setInitialLoading(false));
  }, []);

  async function addToCart(id) {
    setCurrentId(id);
    try {
      const response = await addProductToCard(id);
      if (response.data.status === "success") {
        setnumberItems(numberItems + 1);
        toast.success("Product added to cart!");
      }
    } catch (error) {
      toast.error("Error adding product to cart");
    }
    setCurrentId(null);
  }

  async function toggleLike(id) {
    setLoadingLike(id);
    try {
      if (likedProducts.includes(id)) {
        await removeProductFromLike(id);
        setLikedProducts(prev => prev.filter(productId => productId !== id));
        toast.success("Removed from wishlist!");
      } else {
        await addProductToLike(id);
        setLikedProducts(prev => [...prev, id]);
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      toast.error("Operation failed");
    }
    setLoadingLike(null);
  }

  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => setProducts(res.data.data))
      .catch((error) => console.log(error));
  }

  async function fetchWishlist() {
    try {
      const response = await getLoggedUserWishlist();
      if (response.data.status === "success") {
        setLikedProducts(response.data.data.map(item => item._id));
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || product.category.name === selectedCategory)
  );

  const categories = ['All', ...new Set(products.map(product => product.category.name))];

  return <>
  <div className="min-h-screen bg-gray-50">
      
      
      <div className="container mx-auto px-4 py-12 relative">
        {initialLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 z-40 flex items-center justify-center rounded-xl">
            <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          </div>
        )}

        <div className="mb-12 space-y-6">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="🔍 Search products..."
              className="w-full px-6 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-emerald-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col h-full"
            >
              <Link 
                to={`/productdetails/${product._id}/${product.category.name}`} 
                className="block relative flex-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
                </div>

                <div className="p-6 flex-1">
                  <span className="text-sm font-medium text-emerald-600">
                    {product.category.name}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 line-clamp-2 min-h-[56px]">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">
                      {product.price} EGP
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-5 h-5 ${
                            index < Math.round(product.ratingsAverage)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>

              <div className="px-6 pb-6 flex justify-between items-center mt-auto">
                <button
                  onClick={() => toggleLike(product._id)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  disabled={loadingLike === product._id}
                >
                  {loadingLike === product._id ? (
                    <i className="fas fa-spinner fa-spin text-gray-400 text-xl"></i>
                  ) : (
                    <i
                      className={`fa-heart text-xl ${
                        likedProducts.includes(product._id)
                          ? 'fas text-red-500'
                          : 'far text-gray-400'
                      }`}
                    ></i>
                  )}
                </button>

                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-medium"
                  disabled={currentId === product._id}
                >
                  {currentId === product._id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart"></i>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {!initialLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-500 mb-4">No products found</h3>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory('All');
              }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  
  </>
}