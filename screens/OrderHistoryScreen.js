import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem('@order_history');
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error('Error loading order history:', error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadOrders);
    return unsubscribe;
  }, [navigation]);

  const removeOrder = async (indexToRemove) => {
    try {
      const updated = orders.filter((_, index) => index !== indexToRemove);
      setOrders(updated);
      await AsyncStorage.setItem('@order_history', JSON.stringify(updated));
    } catch (err) {
      Alert.alert('Error', 'Could not remove the order.');
    }
  };

  const downloadReceipt = async (order) => {
    const html = `
      <html>
        <body style="font-family: sans-serif; padding: 20px; color: #000;">
          <h1>🧾 Payment Receipt</h1>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Product:</strong> ${order.product.title}</p>
          <p><strong>Amount Paid:</strong> ₹${order.product.price}</p>
          <p><strong>Buyer Name:</strong> ${order.buyer.name}</p>
          <p><strong>Address:</strong> ${order.buyer.address}</p>
          <p><strong>Payment Method:</strong> ${order.buyer.paymentMethod}</p>
          <p><strong>Date:</strong> ${order.date}</p>
          <hr />
          <p style="text-align:center;">Thank you for shopping with us!</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (err) {
      Alert.alert('Error', 'Failed to download receipt.');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.card, darkMode && styles.cardDark]}>
      <TouchableOpacity onPress={() => navigation.navigate('Receipt', { order: item })}>
        <Text style={[styles.title, darkMode && styles.textLight]}>{item.product.title}</Text>
        <Text style={[styles.price, darkMode && styles.textLight]}>₹ {item.product.price}</Text>
        <Text style={[styles.date, darkMode && styles.dateDark]}>
          {new Date(item.date).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: darkMode ? 'green' : '#000' },
          ]}
          onPress={() => downloadReceipt(item)}
        >
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: darkMode ? 'red' : '#555' },
          ]}
          onPress={() => removeOrder(index)}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loader, darkMode && { backgroundColor: '#121212' }]}>
        <ActivityIndicator size="large" color={darkMode ? '#fff' : '#000'} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={[styles.loader, darkMode && { backgroundColor: '#121212' }]}>
        <Header navigation={navigation} darkMode={darkMode} />
        <Text style={[styles.empty, darkMode && styles.textLight]}>No orders yet.</Text>
      </View>
    );
  }

  return (
    <View style={[{ flex: 1 }, darkMode && { backgroundColor: '#121212' }]}>
      <Header navigation={navigation} darkMode={darkMode} />
      <FlatList
        contentContainerStyle={styles.container}
        data={orders}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const Header = ({ navigation, darkMode }) => (
  <View style={[styles.header, darkMode && styles.headerDark]}>
    <Text style={[styles.headerTitle, darkMode && styles.textLight]}>Order History</Text>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : '#000'} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#555',
    marginTop: 6,
    marginBottom: 10,
  },
  dateDark: {
    color: '#aaa',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerDark: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#444',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  textLight: {
    color: '#fff',
  },
});
