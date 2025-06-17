import React, { useContext, useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet, TouchableOpacity,
  Image, TextInput, Alert, ScrollView, Switch
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { logout, userInfo, saveProfile } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
      setPhone(userInfo.phone || '');
      setAddress(userInfo.address || '');
      setImage(userInfo.image || null);
    }

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Permission to access gallery is required!');
      }
    })();
  }, [userInfo]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !email || !phone || !address) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    saveProfile({ name, email, phone, address, image });
    Alert.alert('Success', 'Profile details saved!');
  };

  return (
    <ScrollView style={[styles.wrapper, darkMode && styles.darkBackground]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : '#333'} />
        </TouchableOpacity>

        <Text style={[styles.header, darkMode && styles.darkText]}>Profile 👤</Text>

        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={image ? { uri: image } : require('../assets/avatar.png')}
            style={styles.avatar}
          />
          <Text style={[styles.pickText, darkMode && styles.darkText]}>Tap to change photo</Text>
        </TouchableOpacity>

        <View style={styles.form}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={darkMode ? '#aaa' : '#666'}
            style={[styles.input, darkMode && styles.darkInput]}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={darkMode ? '#aaa' : '#666'}
            style={[styles.input, darkMode && styles.darkInput]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Phone"
            placeholderTextColor={darkMode ? '#aaa' : '#666'}
            style={[styles.input, darkMode && styles.darkInput]}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Address"
            placeholderTextColor={darkMode ? '#aaa' : '#666'}
            style={[styles.input, styles.textArea, darkMode && styles.darkInput]}
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={4}
          />
        </View>

        <Button title="Save Details" onPress={handleSave} />
        <View style={{ marginTop: 30 }}>
          <Button title="Logout" color="#eb3b5a" onPress={logout} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f9fafe' },
  darkBackground: { backgroundColor: '#121212' },
  darkText: { color: '#fff' },
  darkInput: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderColor: '#555',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  header: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  container: { flex: 1, padding: 20, paddingTop: 10 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  pickText: { textAlign: 'center', marginBottom: 20, color: '#666' },
  form: { marginBottom: 20 },
  input: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 15,
  },
  textArea: { height: 80, textAlignVertical: 'top' },
});
