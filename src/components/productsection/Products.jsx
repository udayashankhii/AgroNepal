// import { useSearchParams, useNavigate } from "react-router-dom";
// import NavigationBar from "../user/home/navigation";
// import ProductCard from "./ProductCard";

// function Products() {
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category");
//   const navigate = useNavigate();

//   // Filter products by category if specified
//   const filteredProducts = products.filter((product) =>
//     category ? product.category.toLowerCase() === category.toLowerCase() : true
//   );

//   return (
//     <>
//       {/* Navigation Bar */}
//       <NavigationBar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold">
//             {category
//               ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
//               : "All Products"}
//           </h1>
//         </div>
//         {/* Grid of Products */}
//         {filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onClick={() => navigate(`/products/${product.id}`)}
//               />
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No products found.</p>
//         )}
//       </div>
//     </>
//   );
// }

// const products = [
//   {
//     id: "1",
//     name: "Cabbage",
//     price: "120",
//     image: "/cabbage.jpg",
//     category: "Vegetables",
//     description: "Fresh cabbage grown organically on sustainable farms.",
//   },
//   {
//     id: "2",
//     name: "Organic Green Tea",
//     price: "550",
//     image: "/Tea.webp",
//     category: "Tea",
//     description:
//       "A refreshing organic green tea perfect for boosting health and wellness.",
//   },
//   {
//     id: "3",
//     name: "Lentils",
//     price: "180",
//     image: "/lentils.jpg",
//     category: "Pulses",
//     description:
//       "Nutrient-rich lentils grown in Nepal's fertile soil, perfect for dal and other traditional dishes.",
//   },
//   {
//     id: "4",
//     name: "Ginger",
//     price: "90",
//     image: "/ginger.jpg",
//     category: "Spices",
//     description:
//       "Fresh, aromatic ginger cultivated in the hills of Nepal, known for its medicinal properties.",
//   },
//   {
//     id: "5",
//     name: "Cardamom",
//     price: "1200",
//     image: "/cardamom.jpg",
//     category: "Spices",
//     description:
//       "High-quality large cardamom, a prized export crop grown in eastern Nepal.",
//   },
//   {
//     id: "6",
//     name: "Mustard Oil",
//     price: "250",
//     image: "/mustard-oil.jpg",
//     category: "Oilseeds",
//     description:
//       "Pure mustard oil extracted from locally grown mustard seeds, popular in Nepali cuisine.",
//   },
//   {
//     id: "7",
//     name: "Buckwheat",
//     price: "160",
//     image: "/buckwheat.jpg",
//     category: "Cereals",
//     description:
//       "Nutritious buckwheat grown in high-altitude regions, used in traditional Nepali dishes.",
//   },
//   {
//     id: "8",
//     name: "Turmeric",
//     price: "140",
//     image: "/turmeric.jpg",
//     category: "Spices",
//     description:
//       "Vibrant yellow turmeric powder, cultivated for its flavor and health benefits.",
//   },
//   {
//     id: "9",
//     name: "Millet",
//     price: "110",
//     image: "/millet.jpg",
//     category: "Cereals",
//     description:
//       "Hardy millet grains, a staple food in hilly regions of Nepal.",
//   },
//   {
//     id: "10",
//     name: "Jackfruit",
//     price: "80",
//     image: "/jackfruit.jpg",
//     category: "Fruits",
//     description:
//       "Large, versatile jackfruit grown in tropical regions of Nepal, used in various dishes.",
//   },
//   {
//     id: "11",
//     name: "Soybean",
//     price: "130",
//     image: "/soybean.jpg",
//     category: "Pulses",
//     description:
//       "Protein-rich soybeans cultivated in diverse regions of Nepal, often intercropped with maize.",
//   },
//   {
//     id: "12",
//     name: "Taro",
//     price: "70",
//     image: "/taro.jpg",
//     category: "Roots & Tubers",
//     description:
//       "Starchy taro roots, a traditional crop in Nepal used in various culinary preparations.",
//   },
// ];

// export default Products;

import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import products from "./productData.js";

function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    category ? product.category.toLowerCase() === category.toLowerCase() : true
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
              : "All Products"}
          </h1>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </>
  );
}

export default Products;
