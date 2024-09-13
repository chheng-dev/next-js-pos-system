
import Image from 'next/image'

export default function PopularItem({title, image, price, unit, stock}) {
  return (
    <div className='bg-customGray-400 mb-2 rounded-md'>
      <div className='flex lg:p-1.5 p-2 gap-4 justify-between'>
        <div className='flex lg:items-center justify-between gap-3'>
          <Image 
            src={image}
            alt='Khmer food'
            className='rounded-md popular-item-image w-16 h-16'
          />
          <div className='flex flex-col items-start justify-start gap-0.5'>
            <h4 className='text-xs'>{title}</h4>
            <p className='text-xs text-slate-400 mt-1'>{unit}</p>
          </div>
        </div>
        <div className='flex flex-col items-end justify-center gap-2'>
          <p className='text-customPrink-400 text-xs lg:text-sm'>{stock}</p>
          <span className='price lg:text-xs text-md'>{price}</span>
        </div>
      </div>
    </div>
  );
}
