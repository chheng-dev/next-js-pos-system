"use client"
import { Book, DollarSign, Folder, LayoutDashboard, ListOrdered, LogOutIcon, UsersRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'


function Sidebar() {

  const navigationItemTop = [
    {
      title: "Dashbaord",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Menu",
      path: "/menu",
      icon: Folder
    },
    {
      title: "Staff",
      path: "/staff",
      icon: UsersRound
    },
    {
      title: "Reports",
      path: "/reports",
      icon: DollarSign
    },
    {
      title: "Order/Table",
      path: "/orders",
      icon: ListOrdered
    },
    {
      title: "Reservation",
      path: "/reservation",
      icon: Book
    },
  ]

  const pathname = usePathname();

  const getLinkClassName = (path) => {
    return `py-1 flex flex-col items-center mb-4 text-white ${
      pathname === path ? "bg-custom-pink text-gray-700 rounded-lg" : ""
    }`;
  };

  return (
    <div className="w-24 h-screen shadow-xl py-4 flex flex-col sidebar-content sticky top-0 lg:block">
      <div className="logo flex items-center justify-center mb-6">
        <h4 className="text-sm text-custom-pink font-bold">SYSTEM</h4>
      </div>
      <div className="navigation flex-1 text-center">
        <ul className="w-full px-4">
          {navigationItemTop.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link href={item.path} key={idx}>
                <li className={getLinkClassName(item.path)}>
                  <div className="w-full flex justify-center mb-1 content-icon">
                    <Icon className="w-6 h-6 icon-circle text-custom-pink p-1" />
                  </div>
                  <span className="text-xs">
                    <small>{item.title}</small>
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="w-full flex justify-center mb-4">
        <Link href="/logout">
          <li className="py-1 flex flex-col items-center text-white">
            <div className="w-full flex justify-center mb-1 content-icon">
              <LogOutIcon className="w-6 h-6 icon-circle text-custom-pink p-1" />
            </div>
            <span className="text-xs">
              <small>Logout</small>
            </span>
          </li>
        </Link>
      </div>
    </div>
  );

}

export default Sidebar
