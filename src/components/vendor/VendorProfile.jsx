import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VendorNavbar from "./VendorNavbar";

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    shop_name: "",
    description: "",
    phone_number: "",
    address: "",
    pan_number_image: null,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch vendor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/vendor/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendor(response.data);
        setFormData({
          shop_name: response.data.shop_name || "",
          description: response.data.description || "",
          phone_number: response.data.phone_number || "",
          address: response.data.address || "",
          pan_number_image: null,
        });
      } catch (err) {
        if (err.response && err.response.data.error === "Vendor profile not found") {
          setVendor(null);
        } else {
          setError("Error fetching vendor profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL, token]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, pan_number_image: e.target.files[0] });
  };

  // Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post(`${API_URL}/api/vendor/register/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile submitted successfully!");
      navigate("/vendor-dashboard");
    } catch (err) {
      console.error("Error submitting profile", err.response?.data || err);
      alert("Failed to submit profile.");
    }
  };

  if (loading) return <p className="text-center text-green-600">Loading...</p>;

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Vendor Profile</h2>
        {vendor ? (
          <div>
            <p><strong>Shop Name:</strong> {vendor.shop_name}</p>
            <p><strong>Phone Number:</strong> {vendor.phone_number}</p>
            <p><strong>Address:</strong> {vendor.address}</p>
            <p>
              <strong>Status:</strong>{" "}
              {vendor.is_verified ? (
                <span className="text-green-600">KYC Verified</span>
              ) : (
                <span className="text-yellow-600">KYC Pending</span>
              )}
            </p>
            {vendor.pan_number_image && (
              <img
                src={`${API_URL}${vendor.pan_number_image}`}
                alt="PAN"
                className="mt-4 w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="shop_name"
              placeholder="Shop Name"
              value={formData.shop_name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="file"
              name="pan_number_image"
              onChange={handleFileChange}
              required={!vendor?.pan_number_image}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VendorProfile;
