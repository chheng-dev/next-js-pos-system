import Image from 'next/image'
import React from 'react'

export default function CategoryItem({icon, title, qty, isActive, onClick}){
  const Icon = icon;
  return (
    <div
      className={`flex items-center justify-between lg:mt-4 cursor-pointer`} 
      onClick={onClick}
    >
      <div className={`lg:w-32 w-full rounded-md p-2 ${isActive ? 'bg-customPrink-400' : 'bg-secondary-400'}`}>
        <div className="flex justify-end">
          <Image 
            src={icon} 
            className={`w-6 h-6 ${isActive ? 'text-secondary-400' : "text-customPrink-400"}`}
            alt="Description of the image"
            width={500} 
            height={300} 
          />
        </div>
        <div className='block mt-3'>
          <p className={`text-sm ${isActive ? 'text-secondary-400' : "text-white"}`}>{title}</p>
          <span className={`text-xs  ${isActive ? 'text-secondary-400' : "text-gray-300 "}`}>{100}</span>
        </div>
      </div>
    </div>
  )
}

