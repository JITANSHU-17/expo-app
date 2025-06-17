import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ReceiptScreen() {
  const route = useRoute();
  const { order } = route.params;

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No order data found.</Text>
      </View>
    );
  }

  const { product, buyer, date } = order;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🧾 Receipt</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Product:</Text>
        <Text style={styles.value}>{product.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={styles.value}>₹ {product.price}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Buyer Name:</Text>
        <Text style={styles.value}>{buyer.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Delivery Address:</Text>
        <Text style={styles.value}>{buyer.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Payment Method:</Text>
        <Text style={styles.value}>{buyer.paymentMethod}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2c3e50',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: 'red',
  },
});
