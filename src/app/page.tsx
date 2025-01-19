'use client'
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, role } = useAuth();
  
  useEffect(() => {
    // Cek apakah pengguna sudah login
    if (!isAuthenticated) {
      router.push('/login');  // Redirect ke halaman login jika belum login
    } else {
      
      // Jika role adalah 'ADMIN', arahkan ke halaman admin
      if (role === 'ADMIN') {
        router.push('/admin');
      }
      // Jika role adalah 'USER', arahkan ke halaman user
      else if (role === 'USER') {
        router.push('/todo');
      }
    }
  }, [isAuthenticated, router]);
}
