import { useEffect, useState } from "react";
import axios from "axios";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get("http://127.0.0.1:8000/api/vendor/profile/", config);
        setShopName(response.data.shop_name);
      } catch (error) {
        console.error("Error fetching vendor profile:", error);
        setError(error);
      }
    };

    fetchVendorProfile();
  }, []);

  useEffect(() => {
    if (!shopName) return;
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/orders/");
        const filteredOrders = response.data.filter(order => order.shop_name === shopName);
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [shopName]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching data!</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Payment Status</th>
              <th className="py-2 px-4">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2 px-4 text-center">{order.id}</td>
                <td className="py-2 px-4">
                  {order.customer.first_name} {order.customer.last_name}
                  <br />
                  <span className="text-sm text-gray-500">{order.customer.phone}</span>
                </td>
                <td className="py-2 px-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="text-sm">
                      {item.name} (x{item.quantity}) - NRS {item.price}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 text-center font-semibold">NPR-{order.total_amount}</td>
                <td className={`py-2 px-4 text-center font-semibold ${order.payment_status === 'pending' ? 'text-red-500' : 'text-green-500'}`}>
                  {order.payment_status}
                </td>
                <td className="py-2 px-4 text-center text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;