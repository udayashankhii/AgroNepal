import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const token = localStorage.getItem('accessToken') // Replace with actual token management

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/vendor/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setVendor(response.data);
      })
      .catch((err) => {
        if (err.response && err.response.data.error === "Vendor profile not found") {
          setVendor(null);
        } else {
          setError("Error fetching vendor profile");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pan_number_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    try {
      await axios.post("http://127.0.0.1:8000/api/vendor/register/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/vendor-dashboard");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  if (loading) return <p className="text-center text-green-600">Loading...</p>;

  if (error) return <p className="text-center text-red-600">{error}</p>;

  if (vendor) {
    if (!vendor.is_verified) {
      return (
        <div className="max-w-lg mx-auto p-6 bg-yellow-100 border border-yellow-400 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-yellow-700">Vendor Profile</h2>
          <p><strong>Shop Name:</strong> {vendor.shop_name}</p>
          <p><strong>Phone Number:</strong> {vendor.phone_number}</p>
          <p><strong>Address:</strong> {vendor.address}</p>
          <p><strong>Status:</strong> KYC Pending</p>
        </div>
      );
    } else {
      return (
        <div className="max-w-lg mx-auto p-6 bg-green-100 border border-green-400 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-700">Vendor Profile</h2>
          <p><strong>Shop Name:</strong> {vendor.shop_name}</p>
          <p><strong>Phone Number:</strong> {vendor.phone_number}</p>
          <p><strong>Address:</strong> {vendor.address}</p>
          <p><strong>Status:</strong> KYC Verified</p>
          <img src={`http://localhost:8000/${vendor.pan_number_image}`} alt="PAN" className="mt-4 w-full h-40 object-cover rounded-lg" />
        </div>
      );
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-green-50 border border-green-400 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Vendor Profile Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="shop_name" placeholder="Shop Name" value={formData.shop_name} onChange={handleChange} required className="w-full p-2 border border-green-300 rounded-md" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border border-green-300 rounded-md"></textarea>
        <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required className="w-full p-2 border border-green-300 rounded-md" />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border border-green-300 rounded-md" />
        <input type="file" name="pan_number_image" onChange={handleFileChange} required className="w-full p-2 border border-green-300 rounded-md" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default VendorProfile;
