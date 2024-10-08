import { Inter } from "next/font/google";
import '../styles/main.scss';
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { Providers } from "./provider";
import {Toaster} from "react-hot-toast"
import 'react-modern-drawer/dist/index.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "POS System",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster 
            position="top-center"
            reverseOrder={false}
          />
          
          <div className="flex gap-4 body-content">
            <Sidebar />
            <div className="w-full p-4 flex flex-col">
              <Header />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
