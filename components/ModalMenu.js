// "use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Divider } from "@nextui-org/react";
import { Book, DollarSign, LayoutDashboard, ListOrdered, MenuSquare, User2 } from 'lucide-react'
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function ModalMenu({ isOpen, onClose }) {
  const navigationItemTop = [
    {
      title: "Dashbaord",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Menu",
      path: "/menu",
      icon: MenuSquare
    },
    {
      title: "Staff",
      path: "/staff",
      icon: User2
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
    return `px-2 py-3 ${
      pathname === path ? "text-customPrink-400" : ""
    }`;
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose} 
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 "
      }}
      size="5-xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-customPrink-400">COSYPOS</ModalHeader>
            <ModalBody>
              {
                navigationItemTop.map((item, idx) => {
                  const Icon = item.icon;
                  return(
                    <Link href={item.path} key={idx} className={getLinkClassName(item.path)} onClick={onClose}>
                      <div className="flex gap-3 items-center">
                        <Icon className="w-4 h-4" />
                        {item.title}
                      </div>  
                    </Link>
                  )
                })
              }
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
