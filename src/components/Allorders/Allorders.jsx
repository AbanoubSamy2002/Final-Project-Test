import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-emerald-500">
        Our Products Collection
      </h1>

      {loading ? (
         <div className="sk-circle flex justify-center items-center">
         <div className="flex justify-center items-center h-64">
           <div className="loader"></div>
         </div>
       </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {product.title}
                </h3>
                
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600 font-bold">
                    {product.price} EGP
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.ratingsAverage} ★
                  </span>
                </div>

                <button
                  onClick={() => openQuickView(product)}
                  className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square bg-gray-100">
                <img
                  src={selectedProduct.imageCover}
                  alt={selectedProduct.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              <div className="p-6">
                <button
                  onClick={closeQuickView}
                  className="ml-auto text-2xl text-gray-500 hover:text-gray-700 block mb-4"
                >
                  ×
                </button>

                <h2 className="text-2xl font-bold mb-4">
                  {selectedProduct.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {selectedProduct.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span className="text-emerald-600 font-bold">
                      {selectedProduct.price} EGP
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Ratings:</span>
                    <span className="text-yellow-500">
                      {selectedProduct.ratingsAverage} ★
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sold:</span>
                    <span>{selectedProduct.sold} items</span>
                  </div>
                </div>

                <Link
                  to={`/productdetails/${selectedProduct._id}`}
                  className="block w-full text-center bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}