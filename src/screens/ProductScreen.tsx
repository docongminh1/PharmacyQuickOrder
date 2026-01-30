import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product, Category } from '../types';
import { useCart } from '../hooks/useCart';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';

import { EmptyState } from '../components/EmptyState';
import productsData from '../data/products.json';

export const ProductScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const debouncedSearch = useDebounce(searchQuery, 300);
  const { addToCart } = useCart();

  const products: Product[] = productsData;

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory, products]);

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onAdd={() => addToCart(item)} />
        )}
        contentContainerStyle={
          filteredProducts.length === 0
            ? styles.emptyList
            : [styles.list, { paddingBottom: insets.bottom + 20 }]
        }
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
        bounces={true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingVertical: 8,
  },
  emptyList: {
    flex: 1,
  },
});
