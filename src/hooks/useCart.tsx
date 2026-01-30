import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, CartItem } from '../types';

const CART_KEY = '@cart';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, newQty: number) => void;
  deleteProduct: (productId: number) => void;
  getQuantity: (productId: number) => number;
  getTotals: () => {
    totalSKUs: number;
    totalQuantity: number;
    totalAmount: number;
  };
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem(CART_KEY);
      if (data) {
        setCartItems(JSON.parse(data));
      }
    } catch (error) {
      console.error('Load cart error:', error);
    }
  };

  const saveCart = async (cart: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Save cart error:', error);
    }
  };

  useEffect(() => {
    if (cartItems.length >= 0) {
      saveCart(cartItems);
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id,
      );

      if (existingIndex >= 0) {
        const currentQty = prevCart[existingIndex].quantity;
        if (currentQty < 99) {
          const newCart = [...prevCart];
          newCart[existingIndex].quantity = currentQty + 1;
          return newCart;
        }
        return prevCart;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId: number, newQty: number) => {
    if (newQty < 0 || newQty > 99) return;

    setCartItems(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === productId,
      );

      if (existingIndex >= 0) {
        if (newQty === 0) {
          return prevCart.filter(item => item.product.id !== productId);
        } else {
          const newCart = [...prevCart];
          newCart[existingIndex].quantity = newQty;
          return newCart;
        }
      }
      return prevCart;
    });
  };

  const deleteProduct = (productId: number) => {
    setCartItems(prevCart =>
      prevCart.filter(item => item.product.id !== productId),
    );
  };

  const getQuantity = (productId: number): number => {
    const cartItem = cartItems.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getTotals = () => {
    const totalSKUs = cartItems.length;
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return { totalSKUs, totalQuantity, totalAmount };
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        deleteProduct,
        getQuantity,
        getTotals,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
