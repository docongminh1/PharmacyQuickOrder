import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          {product.isPrescription && (
            <View style={styles.rxBadge}>
              <Text style={styles.rxText}>Rx</Text>
            </View>
          )}
        </View>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      </View>

      <TouchableOpacity style={styles.cartButton} onPress={onAdd}>
        <Text style={styles.cartIcon}>🛒</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  rxBadge: {
    backgroundColor: '#FF2D55',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  rxText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  cartButton: {
    padding: 8,
  },
  cartIcon: {
    fontSize: 32,
  },
});
