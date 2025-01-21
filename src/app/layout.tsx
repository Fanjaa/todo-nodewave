import type { Metadata } from "next";
import { Inter, Poppins, Roboto, Rubik } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

const rubik = Rubik({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rubik',
})

export const metadata: Metadata = {
  title: "Todo Nodewave",
  description: "Website Todo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable} ${inter.variable} ${rubik.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}