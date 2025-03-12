import type { Metadata } from "next";
import "./globals.css";
import { lexend } from "@/components/ui/font";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/app/context/AuthProvider";


export const metadata: Metadata = {
  title: "CSC",
  description: "Classic School And College",
};


export default function RootLayout({  
  children,  
}: Readonly<{  
  children: React.ReactNode;  
}>) {  
  return (  
    <html lang="en">  
      <AuthProvider>  
          <body className={`${lexend.className} antialiased`}>  
            <div>  
              <Navbar />  
              <div>{children}</div>   
              <Footer />  
            </div>  
          </body>  

      </AuthProvider>  
    </html>  
  );  
}  
