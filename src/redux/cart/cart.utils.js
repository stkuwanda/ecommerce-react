export const addCartItem = (cartItems, cartItem) => {
  const existingItem = cartItems.find((item) => item.id === cartItem.id);
  if (existingItem) {
    return cartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cartItems, { ...cartItem, quantity: 1 }];
};
