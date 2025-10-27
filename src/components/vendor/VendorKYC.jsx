// VendorKycForm.js
import { useState } from "react";

function VendorKycForm() {
const [formData, setFormData] = useState({
shop_name: "",
description: "",
phone_number: "",
address: "",
pan_number_image: null,
});
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState(""); // "success" or "error"

// Handle text input changes
const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Handle file input (program takes only the first file)
const handleFileChange = (e) => {
setFormData({ ...formData, pan_number_image: e.target.files });
};

// Submit the KYC form
const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setMessage("");
setMessageType("");


const token = localStorage.getItem("accessToken");
if (!token) {
  setMessage("Error: Access token not found. Please log in.");
  setMessageType("error");
  setLoading(false);
  return;
}

try {
  // Build FormData to include both fields and file
  const payload = new FormData();
  payload.append("shop_name", formData.shop_name);
  payload.append("description", formData.description);
  payload.append("phone_number", formData.phone_number);
  payload.append("address", formData.address);
  if (formData.pan_number_image) {
    payload.append("pan_number_image", formData.pan_number_image);
  }
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vendor/kyc/`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: payload, // FormData
});

  const data = await response.json();
  if (response.ok) {
    setMessage("KYC submitted successfully!");
    setMessageType("success");
    // Clear the form upon successful submission
    setFormData({
      shop_name: "",
      description: "",
      phone_number: "",
      address: "",
      pan_number_image: null,
    });
  } else {
    setMessage(`Error: ${data.message || "Failed to submit KYC"}`);
    setMessageType("error");
  }
} catch (error) {
  setMessage("Network error. Please try again later.");
  setMessageType("error");
} finally {
  setLoading(false);
}
};

return (
<div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
<h2 className="text-2xl font-bold mb-4">Vendor KYC Form</h2>
{message && (
<p
className={mb-4 text-center ${ messageType === "error" ? "text-red-600" : "text-green-600" }}
>

</p>
)}
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="block text-sm font-medium">Shop Name</label>
<input type="text" name="shop_name" value={formData.shop_name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
</div>
<div>
<label className="block text-sm font-medium">Description</label>
<textarea name="description" value={formData.description} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" ></textarea>
</div>
<div>
<label className="block text-sm font-medium">Phone Number</label>
<input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
</div>
<div>
<label className="block text-sm font-medium">Address</label>
<input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
</div>
<div>
<label className="block text-sm font-medium">PAN Number Image</label>
<input type="file" name="pan_number_image" onChange={handleFileChange} className="w-full" />
</div>
<button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700" >
{loading ? "Submitting..." : "Submit KYC"}
</button>
</form>
</div>
);
}

export default VendorKycForm;