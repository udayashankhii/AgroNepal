// ProductCard.jsx
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useCart from "../cart/useCarts";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <Box className="w-[350px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out overflow-hidden bg-gradient-to-b from-white to-gray-100">
      <Link
        to={`/products/${product.id}`}
        className="h-[200px] w-full overflow-hidden block"
      >
        <img
          src={
            product.image
              ? `http://localhost:8000/${product.image}`
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <Stack spacing={2} p={3}>
        <Typography variant="h5" className="font-bold text-gray-800 truncate">
          {product.name}
        </Typography>
        <Typography variant="body2" className="text-gray-600 truncate">
          {product.description ? product.description.substring(0, 50) : ""}...
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
          onClick={() => addItem(product)}
        >
          Add to Cart
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCard;
