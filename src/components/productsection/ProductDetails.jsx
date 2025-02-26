// ProductDetailSection.jsx
import { useEffect, useState } from "react";
import { Box, Chip, Typography, Button, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useCart from "../cart/useCarts";

const ProductDetailSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    // Check for token and redirect if not logged in
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/vendor/products/public/${id}/`
        );
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading)
    return <p className="text-center">Loading product details...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center">Product not found</p>;

  return (
    <Box className="flex flex-col gap-8 w-[80%] shadow-lg p-8 mx-auto mt-8 bg-white rounded-lg">
      <Box className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[50%]">
          <img
            src={
              product.image
                ? `http://localhost:8000/${product.image}`
                : "https://via.placeholder.com/300"
            }
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg"
          />
        </div>

        <Box className="w-full md:w-[50%] flex flex-col gap-4">
          <Typography variant="h3" fontWeight="bold">
            {product.name}
          </Typography>
          <Chip
            label={product.category}
            color="primary"
            sx={{
              width: "fit-content",
              padding: "0.5rem 2rem",
              fontSize: "1rem",
            }}
          />
          <Typography variant="h4" color="green">
            NPR {Number(product.price).toLocaleString()}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="body2" color="textSecondary">
            Shop: {product.shop_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            In Stock: {product.stock}
          </Typography>
          <Stack direction="row" spacing={2} className="mt-4">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => addItem(product)}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => {
                addItem(product);
                navigate("/cart");
              }}
            >
              Buy Now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailSection;
