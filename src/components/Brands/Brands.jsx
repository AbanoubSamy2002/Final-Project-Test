import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const openModal = (brand) => {
    setSelectedBrand(brand);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBrand(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-emerald-600">
        All Brands
      </h2>

      {loading ? (
        <div className="relative min-h-[60vh]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                onClick={() => openModal(brand)}
              >
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="w-full h-28 object-contain p-2"
                  loading="lazy"
                />
                <h3 className="text-sm font-medium text-gray-700 mt-2 text-center">
                  {brand.name.toUpperCase()}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brand Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="relative bg-white p-6 rounded-lg w-[90%] max-w-[400px] mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-gray-500 text-3xl hover:text-gray-700"
        >
          &times;
        </button>

        <div className="text-center space-y-4">
          <img
            src={selectedBrand?.image}
            alt={selectedBrand?.name}
            className="w-40 h-40 mx-auto object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedBrand?.name}
          </h2>
          <p className="text-gray-500 text-sm">
            {selectedBrand?.slug}
          </p>
        </div>

        <button
          onClick={closeModal}
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}