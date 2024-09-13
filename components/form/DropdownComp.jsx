"use client"
import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaAngleDown } from "react-icons/fa6";

export default function DropdownComp({title, items}){
  const [selectedKey, setSelectedKey] = React.useState(null);

  const handleSelect = (key) => {
    setSelectedKey(key);
  };

  const selectedValue = React.useMemo(
    () => (selectedKey ? items.find(item => item.key === selectedKey)?.label || title : title),
    [selectedKey, items, title]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
         <Button 
          variant="solid" 
          className="capitalize"
        >
          {selectedValue ||  <div>{title}  <FaAngleDown/></div>}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Dynamic Actions" 
        selectionMode="single"
        items={items}
        onAction={handleSelect}
      >
        {(item) => (
          <DropdownItem key={item.key}>
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

