// import { Box, Button, Chip, Stack, Typography } from "@mui/material";

// const ProductCard = ({ product, onClick }) => {
//   return (
//     <Box className="w-[350px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out overflow-hidden bg-gradient-to-b from-white to-gray-100">
//       {/* Product Image */}
//       <div className="h-[200px] w-full overflow-hidden">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="object-cover w-full h-full"
//         />
//       </div>

//       {/* Product Details */}
//       <Stack spacing={2} p={3}>
//         <Typography variant="h5" className="font-bold text-gray-800 truncate">
//           {product.name || "Unnamed Product"}
//         </Typography>
//         <Typography variant="body2" className="text-gray-600 truncate">
//           {product.description?.length > 50
//             ? `${product.description.substring(0, 50)}...`
//             : product.description}
//         </Typography>
//         <Box className="flex justify-between items-center">
//           <Typography variant="h6" className="text-gray-700">
//             Price:{" "}
//             <span className="text-green-500">
//               NPR {Number(product.price || 0).toLocaleString()}
//             </span>
//           </Typography>
//           <Chip
//             label={product.category || "Uncategorized"}
//             color="primary"
//             className="font-bold"
//           />
//         </Box>

//         {/* View Details Button */}
//         <Button
//           variant="contained"
//           color="success"
//           className="bg-green-600 hover:bg-green-700 w-full"
//           onClick={onClick}
//         >
//           View Details
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default ProductCard;
import { Box, Button, Chip, Stack, Typography } from "@mui/material";

const ProductCard = ({ product, onClick }) => {
  return (
    <Box className="w-[350px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out overflow-hidden bg-gradient-to-b from-white to-gray-100">
      <div className="h-[200px] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      <Stack spacing={2} p={3}>
        <Typography variant="h5" className="font-bold text-gray-800 truncate">
          {product.name}
        </Typography>
        <Typography variant="body2" className="text-gray-600 truncate">
          {product.description?.substring(0, 50)}...
        </Typography>
        <Box className="flex justify-between items-center">
          <Typography variant="h6" className="text-gray-700">
            Price:{" "}
            <span className="text-green-500">
              NPR {Number(product.price).toLocaleString()}
            </span>
          </Typography>
          <Chip
            label={product.category}
            color="primary"
            className="font-bold"
          />
        </Box>
        <Button
          variant="contained"
          color="success"
          className="bg-green-600 hover:bg-green-700 w-full"
          onClick={onClick}
        >
          View Details
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCard;
