import React from "react";
import {Input} from "@nextui-org/react";


export default function TextField({type, label, placeholder}) {

  return(
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            size="md"
            key={'outside'}
            type={type}
            label={label}
            labelPlacement={'outside'}
            placeholder={placeholder}
          />
        </div>
      </div>  
    </div>  

  )
}