import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQty: (productId: number, qty: number) => void;
  onDelete: (productId: number) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQty,
  onDelete,
}) => {
  const [qtyInput, setQtyInput] = useState(item.quantity.toString());
  useEffect(() => {
    setQtyInput(item.quantity.toString());
  }, [item.quantity]);
  const handleQtyChange = () => {
    const newQty = parseInt(qtyInput, 10);
    if (!isNaN(newQty) && newQty >= 0 && newQty <= 99) {
      onUpdateQty(item.product.id, newQty);
    } else {
      setQtyInput(item.quantity.toString());
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.product.name}</Text>
          {item.product.isPrescription && (
            <View style={styles.rxBadge}>
              <Text style={styles.rxText}>Rx</Text>
            </View>
          )}
        </View>
        <Text style={styles.category}>{item.product.category}</Text>
        <Text style={styles.price}>{formatCurrency(item.product.price)}</Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={[
              styles.qtyButton,
              item.quantity <= 0 && styles.qtyButtonDisabled,
            ]}
            onPress={() => {
              if (item.quantity === 1) {
                Alert.alert(
                  'Remove Item',
                  'Are you sure you want to remove this item from cart?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Remove',
                      style: 'destructive',
                      onPress: () => onUpdateQty(item.product.id, 0),
                    },
                  ],
                );
              } else {
                onUpdateQty(item.product.id, item.quantity - 1);
              }
            }}
            disabled={item.quantity <= 0}
          >
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.qtyInput}
            value={qtyInput}
            onChangeText={setQtyInput}
            onBlur={handleQtyChange}
            keyboardType="number-pad"
            maxLength={2}
          />

          <TouchableOpacity
            style={[
              styles.qtyButton,
              item.quantity >= 99 && styles.qtyButtonDisabled,
            ]}
            onPress={() => onUpdateQty(item.product.id, item.quantity + 1)}
            disabled={item.quantity >= 99}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert(
              'Delete Item',
              'Are you sure you want to remove this item from cart?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => onDelete(item.product.id),
                },
              ],
            )
          }
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyLabel: {
    fontSize: 14,
    color: '#666',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  qtyButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  qtyInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 12,
    marginTop: 8,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF3B30',
  },
});
