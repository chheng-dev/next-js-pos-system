"use client"

import CategoryItem from "@/components/cateogry/CategoryItem";
import { Button } from "@nextui-org/react";
import { PiHamburgerBold } from "react-icons/pi";
import { GiFullPizza, GiChickenOven, GiBread, GiSadCrab } from "react-icons/gi";
import { RiDrinks2Line } from "react-icons/ri";
import { LayoutGridIcon } from "lucide-react";
import { useState } from "react";
import SpecailMenuItem from "@/components/cateogry/SpecailMenuItem";
import TableItem from "@/components/cateogry/TableItem";
import AddCategoryModal from "@/components/cateogry/AddCategoryModal";



export default function page() {
  const items = [
    {
      title: "All",
      icon: LayoutGridIcon,
      qty: "116 Items"
    },
    {
      title: "Pizza",
      icon: GiFullPizza,
      qty: "20 Items"
    },
    {
      title: "Burger",
      icon: PiHamburgerBold,
      qty: "16 Items"
    },
    {
      title: "Chicken",
      icon: GiChickenOven,
      qty: "10 Items"
    },
    {
      title: "Bakery",
      icon: GiBread,
      qty: "18 Items"
    },
    {
      title: "Beverage",
      icon: RiDrinks2Line,
      qty: "12 Items"
    },
    {
      title: "Seafood",
      icon: GiSadCrab,
      qty: "10 Items" 
    }
  ]

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };


  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <div>
          <h3>Categories</h3>
        </div>
        <div>
          <Button className="bg-customPrink-400" size="sm" onClick={handleModalClick}>
            Add New Category
          </Button>
        </div>
      </div>

      {/* Category Item  */}
      <div className="lg:flex grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {
          items.map((item, idx) => {
            return (
              <CategoryItem
                key={idx}
                title={item.title}
                icon={item.icon}
                qty={item.qty}
                isActive={activeTab === idx} 
                onClick={() => handleTabClick(idx)} 
              />
            )
          })
        }
      </div>

      <div>
        {/* Specail Menu Item  */}
        <SpecailMenuItem />
        <TableItem />
        <AddCategoryModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </div>
  );
}
