import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  let userId = null;

  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    }
  } catch (err) {
    console.error("Invalid or expired token:", err);
    setError("Session expired, please log in again.");
    setLoading(false);
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token || !userId) {
        setError("Authentication required.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          {
            headers: { token: token },
          }
        );
        setOrders(data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
      setError("User not authenticated.");
    }
  }, [userId, token, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center py-8">
        {error}
        <br />
        <Link to="/login" className="text-emerald-500 hover:underline">
          Login
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-600">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No orders found.</p>
          <Link
            to="/"
            className="text-emerald-500 hover:underline mt-4 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg border border-gray-200"
            >
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="mb-2">
                  <p className="font-semibold text-gray-700">
                    Order ID: <span className="text-gray-900">{order._id}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    Total: {order.totalOrderPrice} EGP
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment Method: {order.paymentMethodType}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Products:</h3>
                <div className="space-y-4">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 border-b pb-4 last:border-0"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/productdetails/${item.product._id}/${item.product.category}`}
                          className="font-medium text-gray-900 hover:text-emerald-500 block"
                        >
                          {item.product.title}
                        </Link>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <p>Quantity: {item.count}</p>
                          <p>Price: {item.price} EGP</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
