import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import {Toaster} from "react-hot-toast"
import 'react-modern-drawer/dist/index.css'


export default async function Layout({ children }){
  return(
    <>
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
    </>
  )
}