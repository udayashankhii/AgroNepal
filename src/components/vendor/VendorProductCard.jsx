import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const VendorProductCard = ({ product, onUpdate, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      onDelete(product.id);
    }
  };

  return (
    <Box className="w-[350px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out overflow-hidden bg-white border border-gray-200">
      <Box className="h-[200px] w-full overflow-hidden">
        <img
          src={product.image ? `http://localhost:8000${product.image}` : "https://via.placeholder.com/300"}
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </Box>

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
          <Chip label={product.category} color="secondary" className="font-bold" />
        </Box>

        <Typography variant="body2" className="text-gray-500">
          Stock: <strong>{product.stock}</strong>
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-600 hover:bg-blue-700 w-full"
            onClick={() => onUpdate(product)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            className="bg-red-600 hover:bg-red-700 w-full"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VendorProductCard;
