'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LoginCredentials, RegisterCredentials } from '../types/auth';
import api from '../lib/axios'

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token di localStorage:', token); // Debugging log token
    if (token) {
      setIsAuthenticated(true);
      api.defaults.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Setelah status autentikasi selesai diperiksa, set loading ke false
  }, []);

 
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/login', credentials);
      const { token } = response.data.content;

      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      api.defaults.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await api.post('/register', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);