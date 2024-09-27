export default function SaleCard({title, icon, qty, date}) {
  const Icon = icon;
  return (
    <div className='bg-secondary-400 p-3 rounded-md min-w-72 lg:h-32 h-32 flex flex-col justify-between'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col'>
          <h5 className='lg:text-xs text-sm text-slate-300'>{title}</h5>
          <p className='lg:text-md font-semibold text-lg mt-2'>{qty}</p>
        </div>
        <div className='bg-customPrink-400 rounded-full lg:p-1 p-2'>
          <Icon className='lg:w-6 lg:h-6 w-5 h-5 text-black' />
        </div>
      </div>

      <div className='flex'>
        <p className='lg:text-xs text-md text-slate-400'>{date}</p>
      </div>
    </div>
  );
}
