import React, { useContext } from 'react';
import {
  View, Text, FlatList, Button,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext'; // <-- dark mode context

export default function CartScreen() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleBuy = (product) => {
    navigation.navigate('BuyerDetails', { product });
  };

  return (
    <View style={[styles.wrapper, darkMode && styles.wrapperDark]}>
      <TouchableOpacity
        style={[styles.backButton, darkMode && styles.backButtonDark]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : '#333'} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={[styles.header, darkMode && styles.darkText]}>Your Cart 🛒</Text>

        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text style={[styles.empty, darkMode && styles.darkText]}>
              Your cart is empty
            </Text>
          }
          renderItem={({ item }) => (
            <View style={[styles.item, darkMode && styles.itemDark]}>
              <Text style={[styles.name, darkMode && styles.darkText]}>{item.title}</Text>
              <Text style={[styles.price, darkMode && { color: '#ccc' }]}>₹ {item.price}</Text>

              <View style={styles.buttonsRow}>
                <View style={styles.buttonWrapper}>
                  <Button title="Remove" color="#eb3b5a" onPress={() => removeFromCart(item.id)} />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button title="Buy" color="#20bf6b" onPress={() => handleBuy(item)} />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f9fafe',
  },
  wrapperDark: {
    backgroundColor: '#121212',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
  },
  backButtonDark: {
    backgroundColor: '#1e1e1e',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  darkText: {
    color: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});
