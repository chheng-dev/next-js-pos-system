"use client";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import 'react-modern-drawer/dist/index.css';
import Loading from "../loading";
import { Suspense } from "react";
import { Providers } from "../provider";
import { Toaster } from "react-hot-toast";



export default function Layout({ children }) {
  return (
    <>
      <div className="flex gap-4 body-content">
        <Sidebar />
        <div className="w-full p-4 flex flex-col">
          <Header />
          <Providers>
            {children}
          </Providers>
        </div>
      </div>
    </>
  );
}
