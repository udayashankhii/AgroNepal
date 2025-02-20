// import { Box, Chip, Typography } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ProductDetailSection = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/products/${id}`
//         );
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <Box className="flex flex-col gap-8 w-[80%] shadow-lg p-8 mx-auto mt-8 bg-white rounded-lg">
//       {/* Product Image */}
//       <Box className="w-[50%] flex justify-center items-center">
//         <img
//           src={product.image}
//           alt={product.name}
//           width={400}
//           height={400}
//           className="rounded-lg object-cover"
//         />
//       </Box>

//       {/* Product Details */}
//       <Box className="flex flex-col items-start gap-4 w-[50%]">
//         <Typography variant="h5" fontWeight="bold">
//           {product.name}
//         </Typography>
//         <Chip label={product.category} color="primary" />
//         <Typography variant="h6" color="green">
//           Price: NPR {Number(product.price).toLocaleString()}
//         </Typography>
//         <Typography variant="body1" color="textSecondary">
//           Description: {product.description}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default ProductDetailSection;

import { Box, Chip, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import products from "./productData.js";

const ProductDetailSection = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <p>Product not found</p>;

  return (
    <Box className="flex flex-col gap-8 w-[80%] shadow-lg p-8 mx-auto mt-8 bg-white rounded-lg">
      <Box className="w-full flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-[50%]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg"
          />
        </div>

        {/* Product Details */}
        <Box className="w-full md:w-[50%] flex flex-col gap-4">
          <Typography variant="h3" fontWeight="bold">
            {product.name}
          </Typography>
          <Chip
            label={product.category}
            color="primary"
            sx={{
              width: "fit-content",
              padding: "0.5rem 2rem", // Adds 2rem horizontal padding
              fontSize: "1rem", // Adjust font size if needed
            }}
          />
          <Typography variant="h4" color="green">
            NPR {Number(product.price).toLocaleString()}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailSection;
