import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Error fetching categories");
        setLoading(false);
      });
  }, []);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h2 className="text-3xl font-bold mb-8 text-center text-emerald-600">
        Shop by Category
      </h2>

      {/* Loader في المنطقة الرئيسية */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-90 z-40 flex items-center justify-center rounded-xl">
          <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 text-center cursor-pointer border border-gray-100 hover:border-emerald-50"
            onClick={() => setSelectedImage(category.image)}
          >
            <div className="relative aspect-square mb-3">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-scale-down p-1 mix-blend-multiply"
              />
            </div>
            <h3 className="text-base font-medium text-gray-700 capitalize group-hover:text-emerald-600 transition-colors">
              {category.name}
            </h3>
          </div>
        ))}
      </div>

      {/* نافذة الصورة المنبثقة */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg bg-black/30">
          <div className="relative max-w-4xl w-[90%]">
            <button
              className="absolute -top-8 -right-8 bg-white/80 text-gray-600 p-2 rounded-full text-xl hover:bg-white hover:text-gray-800 transition-all shadow-lg z-10"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Category"
              className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border-8 border-white/20 bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}