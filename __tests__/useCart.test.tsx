import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart } from '../src/hooks/useCart';
import { Product } from '../src/types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

// Sample Product to use in tests
const mockProduct: Product = {
  id: 1,
  name: 'Paracetamol 500mg',
  price: 15000,
  category: 'Pain Relief',
  isPrescription: false,
};

describe('useCart', () => {
  test('should add product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    const quantity = result.current.getQuantity(mockProduct.id);
    expect(quantity).toBe(1);
  });

  test('should calculate total amount', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    const totals = result.current.getTotals();
    expect(totals.totalAmount).toBe(30000);
  });

  test('should delete product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });
    expect(result.current.getQuantity(mockProduct.id)).toBe(1);

    act(() => {
      result.current.deleteProduct(mockProduct.id);
    });

    const quantity = result.current.getQuantity(mockProduct.id);
    expect(quantity).toBe(0);
  });
});
