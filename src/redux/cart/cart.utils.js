export const addCartItem = (cartItems, cartItem) => {
  const existingItem = cartItems.find((item) => item.id === cartItem.id);
  if (existingItem) {
    return cartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cartItems, { ...cartItem, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItem) => {
  if (cartItem.quantity > 1) {
    return cartItems.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity -= 1;
        return {...item};
      }
      return item;
    });
  }
  return cartItems.filter((item) => item.id !== cartItem.id);
};
