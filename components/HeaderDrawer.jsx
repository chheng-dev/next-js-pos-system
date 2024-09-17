import { FaChevronCircleRight } from "react-icons/fa";
import React from 'react'


export default function HeaderDrawer({title, onClick}){
  return(
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <h4>{title}</h4>
        </div>
        <div>
          <FaChevronCircleRight className="w-6 h-6 cursor-pointer" onClick={onClick}/>
        </div>
      </div>
      <div className="mt-4 border-b border-[#585858]" />
    </div>
  )
}

