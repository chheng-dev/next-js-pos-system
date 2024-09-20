"use client";
import React, { useState, useEffect } from "react";
import CategoryItem from "@/components/cateogry/CategoryItem";
import { Button, Skeleton } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import AddCategoryModal from "@/components/cateogry/AddCategoryModal";
import SpecialMenuItem from "@/components/cateogry/SpecailMenuItem";
import TableItem from "@/components/cateogry/TableItem";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategoriesList = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/categories", {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const result = await response.json();
        setItems(result);
      } catch (error) {
        toast.error('An error occurred while making the request');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesList();
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleModalClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <h3>Categories</h3>
        <Button className="bg-customPrink-400" size="sm" onClick={handleModalClick}>
          Add New Category
        </Button>
      </div>

      {/* Category Item */}
      <div className="lg:flex grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {loading ? (
          Array.from({ length: 7 }).map((_, idx) => (
            <Skeleton
              key={idx}
              animate="true"
              css={{ borderRadius: "$md" }}
              className="bg-secondary-400 rounded-md"
              style={{ height: '100px' }}
            />
          ))
        ) : (
          items.map((item, idx) => (
            <CategoryItem
              key={idx}
              title={item.title}
              icon={item.icon}
              qty={item.qty}
              isActive={activeTab === idx}
              onClick={() => handleTabClick(idx)}
            />
          ))
        )}
      </div>

      <div>
        {/* Special Menu Item */}
        <SpecialMenuItem />
        <TableItem />
        <AddCategoryModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose} 
          handleGetCategoriesList={() => fetchCategoriesList()} 
        />
      </div>
    </div>
  );
};

export default Page;
