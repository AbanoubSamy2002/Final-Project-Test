import React, { useContext, useEffect, useState } from 'react';
import style from "./ProductDeta.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDeta() {
  const { addProductToCard, getLoggedUserCard, setnumberItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false); 
  let { id } = useParams();
  
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

  async function handleAddToCart() {
    if (!product) return;

    setBtnLoading(true); 
    
    try {
      let response = await addProductToCard(product._id);
      
      if (response?.data?.status === "success") {
        toast.success("✅ Product added to cart successfully!");

        let cartResponse = await getLoggedUserCard();
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
  }, [id]);

  if (loading) return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-white z-50">
    <div className="loader"></div> {/* Loader animation */}
  </div>
  );

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="flex items-center py-8 w-[100%] m-auto max-md:flex-col max-md:w-full">
      <div className="w-full md:w-1/4 flex justify-center ">
        <div className='w-full'>
          <Slider {...settings}>
            {product.images.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                className="w-full object-contain rounded-lg" 
                alt="Product Image" 
              />
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-full md:w-3/1 p-4 text-center md:text-left ">
        <h3 className="font-bold capitalize text-2xl">{product.title}</h3>
        <h4 className="text-gray-600 my-4">{product.description}</h4>
        <div className="flex justify-between my-4">
          <span className="my-2">{product.price} EGP</span>
          <span><i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}</span>
        </div>
        
      
        <button 
          onClick={handleAddToCart} 
          className={`btn-1 ${btnLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={btnLoading} 
        >
          {btnLoading ? "Adding..." : "+ Add"} 
        </button>
      </div>
    </div>
  );
}
