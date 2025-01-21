'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LoginCredentials, AuthContextType } from '../types/auth';
import api from '../lib/axios'


// Membuat context Auth
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// AuthProvider untuk membungkus komponen dan memberikan state autentikasi ke aplikasi
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [role, setRole] = useState<string | null>(null); // Menyimpan role
  const [fullName, setFullName] = useState<string | null>(null); // Menyimpan role

  // Mengecek token di localStorage untuk memastikan apakah sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role'); // Ambil role dari localStorage
    const storedFullName = localStorage.getItem('fullName');

    console.log('Token di localStorage:', token); // Debugging log token
    if (token) {
      // Jika token ada, set status autentikasi menjadi true dan ambil data pengguna
      setIsAuthenticated(true);
      setRole(storedRole);
      setFullName(storedFullName)
      api.defaults.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Setelah status autentikasi selesai diperiksa, set loading ke false
  }, []);

 
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/login', credentials); // Memanggil API untuk login
      const { token, user } = response.data.content;
      const { fullName, role } = user; 

      // Menyimpan data pengguna dan token di localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('fullName', fullName); 
      localStorage.setItem('role', role); 
      setIsAuthenticated(true);
      setRole(role);
      setFullName(fullName);
      api.defaults.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
          console.log('Login Successful! Role:', role);  // Verifikasi role yang didapat
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Menghapus data autentikasi dari localStorage dan set status logout
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
    setFullName(null);
  };

  return (
    // Menyediakan nilai autentikasi kepada komponen children

    <AuthContext.Provider value={{ isAuthenticated, loading, fullName, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook untuk mengakses AuthContext
export const useAuth = () => useContext(AuthContext);