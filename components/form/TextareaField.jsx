import React from "react";
import {Textarea} from "@nextui-org/react";


export default function TextareaField({label, placeholder, register, value, onChange, name, ...rest}) {
  return(
    <div className="mb-3" style={{position: 'relative', zIndex: 0}}>
      <Textarea
        key="flat"
        variant="flat"
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        className="col-span-12 md:col-span-6 md:mb-0"
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  )
}