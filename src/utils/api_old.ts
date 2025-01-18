// utils/api.ts
import axios from "axios";
import { Router } from "next/router";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL; // API Base URL

if (!apiUrl) {
    throw new Error('API Base URL is not defined!');
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { email, password });
    // return response.data;
    const token = response.data.content.token; // Mendapatkan token
    console.log('Token:', token);
    
    // Menyimpan token di localStorage
    localStorage.setItem('token', token);

    return true; 

  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};
