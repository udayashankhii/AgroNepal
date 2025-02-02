import { Link, useLocation } from "react-router-dom";
import { User, Package, Heart, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

function Account() {
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState("Profile");

  const navigation = [
    { name: "Profile", href: "/account", icon: User },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Settings", href: "/account/settings", icon: SettingsIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {navigation.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                to={href}
                onClick={() => setActiveComponent(name)}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  location.pathname === href
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Render Active Component */}
        <div className="lg:col-span-3">
          {activeComponent === "Profile" && <Profile />}
          {activeComponent === "Orders" && <Orders />}
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            defaultValue="+977 9812345678"
            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Order #12345</span>
            <span className="text-sm text-gray-500">March 15, 2024</span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Status: <span className="text-green-600">Delivered</span></p>
            <p>Total: NPR 2,500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
