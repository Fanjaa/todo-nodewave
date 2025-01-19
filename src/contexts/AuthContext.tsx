'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LoginCredentials, RegisterCredentials } from '../types/auth';
import api from '../lib/axios'

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  role: string | null;  // Menambahkan role
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [role, setRole] = useState<string | null>(null); // Menyimpan role

  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role'); // Ambil role dari localStorage

    console.log('Token di localStorage:', token); // Debugging log token
    if (token) {
      setIsAuthenticated(true);
      setRole(storedRole);
      api.defaults.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Setelah status autentikasi selesai diperiksa, set loading ke false
  }, []);

 
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/login', credentials);
      const { token, user } = response.data.content;
      const { role } = user; 
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); 
      setIsAuthenticated(true);
      setRole(role);
      api.defaults.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
          console.log('Login Successful! Role:', role);  // Verifikasi role yang didapat

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
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);