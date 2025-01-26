const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Agro Nepal</h3>
          <p className="text-sm">
            Agro Nepal is your go-to platform for authentic and quality
            agricultural products sourced directly from local farmers in Nepal.
            We aim to promote sustainable farming and ensure fresh,
            origin-verified goods for every customer.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="About" className="text-sm hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="Product" className="text-sm hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="contact" className="text-sm hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">
            <strong>Email:</strong> support@agronepal.com
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> +977-1234567890
          </p>
          <p className="text-sm">
            <strong>Address:</strong> Agro Nepal Office, Kathmandu, Nepal
          </p>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h3>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mb-4 text-gray-700 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        {/* Social Media Links */}
        <div className="mb-4 space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:underline"
          >
            LinkedIn
          </a>
        </div>
        {/* Copyright */}
        <p className="text-sm">
          &copy; 2025 Agro Nepal. All Rights Reserved. | Made with ❤️ in Nepal
        </p>
      </div>
    </footer>
  );
};

export default Footer;
