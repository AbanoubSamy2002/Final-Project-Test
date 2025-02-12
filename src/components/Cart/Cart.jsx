import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getLoggedUserCard, updateCartProductQuantity, deleteCardItem, setnumberItems } = useContext(CartContext);
  const [CardDetailis, setCardDetalis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removingProduct, setRemovingProduct] = useState(null);
  const [updatingProduct, setUpdatingProduct] = useState(null); // ✅ حالة جديدة لتحميل التحديث

  async function getCardItem() {
    setLoading(true);
    try {
      let response = await getLoggedUserCard();
      if (response.data.status === "success") {
        setCardDetalis(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
    setLoading(false);
  }

  async function deleteItem(productId) {
    setRemovingProduct(productId);
    try {
      let response = await deleteCardItem(productId);
      if (response.data.status === "success") {
        toast.success("Product removed successfully");
        const updatedProducts = CardDetailis.products.filter(product => product.product.id !== productId);
        const updatedTotalPrice = updatedProducts.reduce((total, product) => total + (product.price * product.count), 0);
        setCardDetalis(prev => ({
          ...prev,
          products: updatedProducts,
          totalCartPrice: updatedTotalPrice,
        }));
        setnumberItems(updatedProducts.length);
      }
    } catch (error) {
      toast.error("Error removing product");
    }
    setRemovingProduct(null);
  }

  async function updateProduct(id, count) {
    if (count === 0) return;
    
    setUpdatingProduct(id); // ✅ تفعيل التحميل
    try {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status === "success") {
        const updatedProducts = CardDetailis.products.map(product => 
          product.product.id === id ? { ...product, count } : product
        );
        const updatedTotalPrice = updatedProducts.reduce((total, product) => total + (product.price * product.count), 0);
        setCardDetalis(prev => ({
          ...prev,
          products: updatedProducts,
          totalCartPrice: updatedTotalPrice,
        }));
        toast.success("Product updated successfully");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
    setUpdatingProduct(null); // ✅ إيقاف التحميل
  }

  useEffect(() => {
    getCardItem();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {CardDetailis?.products.length > 0 ? (
        <>
          <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize my-4">
            Total Price: {CardDetailis?.totalCartPrice.toFixed(2)} EGP
          </h2>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-16 py-3">Image</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {CardDetailis?.products.map((product) => (
                  <tr key={product.product.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="p-4">
                      <img 
                        src={product.product.imageCover} 
                        className="w-32 h-24 object-cover rounded" 
                        alt={product.product.title} 
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateProduct(product.product.id, product.count - 1)}
                          disabled={updatingProduct === product.product.id}
                          className="px-3 py-1 bg-gray-200 rounded-l disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-100 min-w-[40px] text-center">
                          {updatingProduct === product.product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            product.count
                          )}
                        </span>
                        <button 
                          onClick={() => updateProduct(product.product.id, product.count + 1)}
                          disabled={updatingProduct === product.product.id}
                          className="px-3 py-1 bg-gray-200 rounded-r disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {(product.price * product.count).toFixed(2)} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteItem(product.product.id)}
                        disabled={removingProduct === product.product.id}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        {removingProduct === product.product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          'Remove'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid */}
          <div className="lg:hidden grid gap-4">
            {CardDetailis?.products.map((product) => (
              <div key={product.product.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <img
                    src={product.product.imageCover}
                    className="w-24 h-24 object-cover rounded"
                    alt={product.product.title}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{product.product.title}</h3>
                    <p className="text-emerald-600 font-bold mb-2">
                      {(product.price * product.count).toFixed(2)} EGP
                    </p>
                    <div className="flex items-center mb-2">
                      <button
                        onClick={() => updateProduct(product.product.id, product.count - 1)}
                        disabled={updatingProduct === product.product.id}
                        className="px-3 py-1 bg-gray-200 rounded-l disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100 min-w-[40px] text-center">
                        {updatingProduct === product.product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          product.count
                        )}
                      </span>
                      <button
                        onClick={() => updateProduct(product.product.id, product.count + 1)}
                        disabled={updatingProduct === product.product.id}
                        className="px-3 py-1 bg-gray-200 rounded-r disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => deleteItem(product.product.id)}
                      disabled={removingProduct === product.product.id}
                      className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                    >
                      {removingProduct === product.product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        'Remove Item'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              to="/checkout"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h1 className="text-3xl text-red-600 font-bold mb-4">Your Cart is Empty</h1>
          <Link
            to="/products"
            className="text-emerald-600 hover:underline text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}