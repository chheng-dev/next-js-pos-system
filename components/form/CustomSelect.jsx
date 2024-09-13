import React from "react";
import {Select, SelectItem} from "@nextui-org/react";


export default function CustomSelect({label, placeholder, items}) {
  return(
    <Select
      label={label}
      placeholder={placeholder}
      className="max-w-full"
      labelPlacement="outside"
    >
      {items.map((item) => (
        <SelectItem key={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>

  )
}