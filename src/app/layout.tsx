  import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import Navbar from "./_Components/Navbar/Navbar";
  import Footer from "./_Components/Footer/Footer";
  import { Toaster } from "_/components/ui/sonner";
import MySessionProvider from "./_Components/MySessionProvider/MySessionProvider";
import { WishlistProvider } from "_/context/WishlistContext";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "EagleMart",
    description: "E-commerce website",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <MySessionProvider >

  <WishlistProvider>



          <Navbar />
          {children}
          <Toaster />
          <Footer />
  </WishlistProvider>

          </MySessionProvider>
        </body>
      </html>
    );
  }
