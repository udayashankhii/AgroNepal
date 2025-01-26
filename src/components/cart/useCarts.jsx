import { atom, useAtom } from "jotai";

const cartAtom = atom([]);

function useCart() {
  const [cart, setCart] = useAtom(cartAtom);

  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
    itemCount,
  };
}
export default useCart;
