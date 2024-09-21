"use client";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import 'react-modern-drawer/dist/index.css';
import Loading from "../loading";
import { Suspense } from "react";


export default function Layout({ children }) {
  return (
    <>
      <div className="flex gap-4 body-content">
        <Sidebar />
        <div className="w-full p-4 flex flex-col">
          <Header />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
      </div>
    </>
  );
}
