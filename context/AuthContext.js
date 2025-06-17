import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token and profile on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const profile = await AsyncStorage.getItem('userInfo');

        if (token) setAccessToken(token);
        if (profile) setUserInfo(JSON.parse(profile));
      } catch (e) {
        console.error('Failed to load auth/profile data:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const login = async (username, password) => {
    if (username && password) {
      await AsyncStorage.setItem('token', 'dummy-token');
      setAccessToken('dummy-token');
    }
  };

  const signup = async (email, password) => {
    if (email && password) {
      await AsyncStorage.setItem('token', 'dummy-token');
      setAccessToken('dummy-token');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userInfo');
    setAccessToken(null);
    setUserInfo(null);
  };

  const saveProfile = async (profile) => {
    try {
      setUserInfo(profile);
      await AsyncStorage.setItem('userInfo', JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      accessToken,
      userInfo,
      loading,
      login,
      signup,
      logout,
      saveProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
