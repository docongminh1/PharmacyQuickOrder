import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../hooks/useCart';
import { CartItemCard } from '../components/CartItemCard';
import { EmptyState } from '../components/EmptyState';
import { formatCurrency } from '../utils/formatCurrency';

export const CartScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { cartItems, updateQuantity, deleteProduct, getTotals, clearCart } =
    useCart();

  const totals = getTotals();

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState message="Your cart is empty" />
      </View>
    );
  }

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.label}>Items:</Text>
          <Text style={styles.value}>{totals.totalSKUs}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.label}>Total Quantity:</Text>
          <Text style={styles.value}>{totals.totalQuantity}</Text>
        </View>
        <View style={[styles.totalRow, styles.totalAmount]}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(totals.totalAmount)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() =>
            Alert.alert('Clear Cart', 'Remove all items from cart?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Clear',
                style: 'destructive',
                onPress: () => clearCart(),
              },
            ])
          }
        >
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.product.id.toString()}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onUpdateQty={updateQuantity}
            onDelete={deleteProduct}
          />
        )}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingVertical: 8,
    paddingBottom: 40,
  },
  footer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 40,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalAmount: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  clearButton: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
