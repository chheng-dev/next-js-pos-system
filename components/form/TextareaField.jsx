import React from "react";
import {Textarea} from "@nextui-org/react";


export default function TextareaField({label, placeholder, items}) {
  return(
    <Textarea
      key="flat"
      variant="flat"
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      className="col-span-12 md:col-span-6 mb-6 md:mb-0"
    />
  )
}