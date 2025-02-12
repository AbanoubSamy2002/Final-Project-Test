import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getLoggedUserCard, updateCartProductQuantity, deleteCardItem, setnumberItems } = useContext(CartContext);
  const [CardDetailis, setCardDetalis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removingProduct, setRemovingProduct] = useState(null); // ✅ حالة تحميل عند الحذف

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
    setRemovingProduct(productId); // ✅ تفعيل التحميل عند الحذف
  
    try {
      let response = await deleteCardItem(productId);
      if (response.data.status === "success") {
        toast.success("Product removed successfully");

        const updatedProducts = CardDetailis.products.filter(product => product.product.id !== productId);
        const updatedTotalPrice = updatedProducts.reduce((total, product) => total + (product.price * product.count), 0);

        setCardDetalis(prev => ({
          ...prev,
          products: updatedProducts,
          totalCartPrice: updatedTotalPrice, // ✅ تحديث `Total Price`
        }));

        setnumberItems(updatedProducts.length);
      } else {
        toast.error("Error removing product");
      }
    } catch (error) {
      toast.error("Error removing product");
      console.error("Error deleting cart item:", error);
    }

    setRemovingProduct(null); // ✅ إيقاف التحميل بعد الحذف
  }

  async function updateProduct(id, count) {
    if (count === 0) {
      deleteItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status === "success") {
        const updatedProducts = CardDetailis.products.map(product => 
          product.product.id === id ? { ...product, count } : product
        );
        const updatedTotalPrice = updatedProducts.reduce((total, product) => total + (product.price * product.count), 0);

        setCardDetalis(prev => ({
          ...prev,
          products: updatedProducts,
          totalCartPrice: updatedTotalPrice, // ✅ تحديث `Total Price`
        }));

        toast.success("Product updated successfully");
      } else {
        toast.error("Error updating product");
      }
    }
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
    <>
      {CardDetailis?.products.length > 0 ? (
        <>
          <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize my-4">
            Total Price: {CardDetailis?.totalCartPrice} EGP
          </h2>

          <div className="container mx-auto px-4 py-6">
            <div className="hidden lg:block relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    <tr key={product.product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4">
                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{product.product.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button onClick={() => updateProduct(product.product.id, product.count - 1)} className="btn">-</button>
                          <span className="mx-2">{product.count}</span>
                          <button onClick={() => updateProduct(product.product.id, product.count + 1)} className="btn">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{product.price * product.count} EGP</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => deleteItem(product.product.id)} 
                          className={`text-red-600 hover:underline cursor-pointer ${removingProduct === product.product.id ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={removingProduct === product.product.id}
                        >
                          {removingProduct === product.product.id ? (
                            <i className="fas fa-spinner fa-spin"></i> // ✅ إظهار `spinner` عند الحذف
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link to="/checkout">
                <button className="btn my-5">Checkout</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          <h1 className="capitalize text-3xl text-center text-red-700 font-bold my-8">No product added</h1>
        </div>
      )}
    </>
  );
}
