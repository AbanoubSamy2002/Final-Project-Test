import React, { useContext, useEffect, useState } from 'react';
import style from "./ProductDeta.module.css";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import Footer from './../Footer/Footer';

export default function ProductDeta() {
  const { addProductToCard, getLoggedUserCard, setnumberItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [relatedproduct, setrelatedproduct] = useState([]);
  let { id, category } = useParams();
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  async function getProduct(id) {
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
    }
  }

  async function getAllProducts() {
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      const related = res.data.data.filter(product => product.category.name === category);
      setrelatedproduct(related);
    } catch (error) {
      console.error("Error fetching products:", error);
      setrelatedproduct([]);
    }
  }

  async function handleAddToCart(productId) {
    setBtnLoading(true);
    try {
      const response = await addProductToCard(productId);
      
      if (response?.data?.status === "success") {
        toast.success("✅ Product added to cart successfully!");
        const cartResponse = await getLoggedUserCard();
        setnumberItems(cartResponse.data.numOfCartItems);
      } else {
        toast.error("❌ Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("❌ Error adding product");
    }
    setBtnLoading(false);
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  if (loading) return (
    <div className="relative min-h-[60vh]">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="loader"></div>
      </div>
    </div>
  );

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <>
     <div className="flex flex-col lg:flex-row gap-8 items-start py-12 max-w-7xl mx-auto px-4">
  {/* Image Gallery */}
  <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
    <Slider {...settings} className="slick-gallery">
      {product.images.map((src, index) => (
        <div key={index} className="relative h-96">
          <img
            src={src}
            className="w-full h-full object-contain rounded-2xl"
            alt={`Product view ${index + 1}`}
          />
        </div>
      ))}
    </Slider>
  </div>

  {/* Product Info */}
  <div className="w-full lg:w-1/2 space-y-6">
    {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
      <span>/</span>
      <span className="font-medium text-blue-600">{product.category?.name}</span>
    </div>

    {/* Title */}
    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
      {product.title}
    </h1>

    {/* Rating & Price */}
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
        <svg 
          className="w-5 h-5 text-amber-500" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span className="font-medium">{product.ratingsAverage}</span>
      </div>
      <span className="text-2xl font-bold text-gray-900">
        {product.price} EGP
      </span>
    </div>

    {/* Description */}
    <p className="text-lg text-gray-600 leading-relaxed border-b pb-6">
      {product.description}
    </p>

    {/* CTA Button */}
    <button 
      onClick={() => handleAddToCart(product._id)}
      className={`w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 cursor-pointer
        text-white rounded-xl transition-all transform
        ${btnLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'}`}
      disabled={btnLoading}
    >
      {btnLoading ? (
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
          Adding to Cart...
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Add to Cart
        </div>
      )}
    </button>

    {/* Product Highlights */}
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-500 mb-1">Free Shipping</h4>
        <p className="text-sm text-gray-600">Delivery within 3-5 days</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-500 mb-1">Warranty</h4>
        <p className="text-sm text-gray-600">2 years manufacturer warranty</p>
      </div>
    </div>
  </div>
</div>

      {/* Related Products Section */}
      {relatedproduct.length > 0 && (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
      Related Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {relatedproduct.map((relatedProd) => (
        <div
          key={relatedProd._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <Link to={`/productdetails/${relatedProd._id}/${relatedProd.category.name}`}>
            <div className="relative">
              <img
                src={relatedProd.imageCover}
                alt={relatedProd.title}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
              />
              <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                {relatedProd.ratingsAverage} <i className="fas fa-star"></i>
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {relatedProd.title}
              </h3>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">
                  {relatedProd.price} EGP
                </span>
              </div>
            </div>
          </Link>

          <button
            onClick={() => handleAddToCart(relatedProd._id)}
            className={` cursor-pointer w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-3 font-semibold text-lg transition-all duration-300 hover:opacity-90 ${
              btnLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={btnLoading}
          >
            {btnLoading ? "Adding..." : "+ Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  </div>
)}
<Footer/>
    </>
  );
}