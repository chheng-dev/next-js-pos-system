"use client"
import SaleCard from '@/components/dashboard/SaleCard';
import PopularItem from '@/components/dashboard/PopularItem';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { ClipboardPlus, DollarSignIcon, HandPlatter } from 'lucide-react';

import khmerFood from "../../../assets/images/images.jpeg";
import baychha from "../../../assets/images/baychha.jpeg";
import burger from "../../../assets/images/burger-with-melted-cheese.jpg";
import hotDog from "../../../assets/images/hot-dog.jpg";
import Link from 'next/link';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const MyChart = dynamic(() => import('../../../components/dashboard/MyChart'), { ssr: false });

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);
  console.log(status);
  console.log({data: session});
  return (
    <div className='w-full overflow-x-auto mt-4'>
      <div>
      </div>
      <div className="flex lg:grid lg:grid-cols-4 grid-cols-1 gap-3 overflow-auto">
        <SaleCard 
          title="Daily Sales"
          icon={DollarSignIcon}
          qty="$ 2K"
          date="9 February 2024"
        />
        <SaleCard 
          title="Monthly Revenue"
          icon={ClipboardPlus}
          qty="$ 55K"
          date="1 Jan - 1 Feb"
        />
        <SaleCard 
          title="Table Occupancy"
          icon={HandPlatter}
          qty="25 Tables"
        />
        <SaleCard 
          title="Customer"
          icon={DollarSignIcon}
          qty="200 Persons"
        />
      </div>

      {/* Popular Items */}
      <div className='lg:flex grid grid-cols-1 items-center justify-between gap-3 mt-6'>
        <div className='bg-secondary-400 p-4 lg:w-1/2 w-full rounded-md'>
          <div className='flex justify-between items-center'>
            <div>
              <h5 className='lg:text-sm text-lg'>Popular Items</h5>
            </div>
            <div>
              <Link href="">
                <p className='text-customPink-400 lg:text-xs text-sm underline'>See all</p>
              </Link>
            </div>
          </div>

          {/* Items */}
          <div className='mt-6 lg:h-64 h-72 overflow-y-auto'>
            <PopularItem 
              title="Num Panhjok"
              image={khmerFood}
              price="$55.00"
              unit="Serving 01 person"
              stock="In Stock"
            />
            <PopularItem 
              title="បាយឆា"
              image={baychha}
              price="$5.00"
              unit="Serving 100 persons"
              stock="In Stock"
            />
            <PopularItem 
              title="Burger"
              image={burger}
              price="$5.00"
              unit="Serving 10 persons"
              stock="In Stock"
            />
            <PopularItem 
              title="Hot Dog"
              image={hotDog}
              price="$4.00"
              unit="Serving 10 persons"
              stock="Out of Stock"
            />
            <PopularItem 
              title="Burger"
              image={burger}
              price="$5.00"
              unit="Serving 10 persons"
              stock="In Stock"
            />
          </div>
        </div>

        <div className='bg-secondary-400 p-4 lg:w-1/2 w-full rounded-md'>
          <div className='flex justify-between items-center'>
            <div>
              <h5 className='lg:text-sm text-lg'>More Popular Items</h5>
            </div>
            <div>
              <Link href="">
                <p className='text-customPink-400 lg:text-xs text-sm underline'>See all</p>
              </Link>
            </div>
          </div>

          {/* Items */}
          <div className='mt-6 lg:h-64 h-72 overflow-y-auto'>
            <PopularItem 
              title="Num Panhjok"
              image={khmerFood}
              price="$55.00"
              unit="Serving 01 person"
              stock="In Stock"
            />
            <PopularItem 
              title="បាយឆា"
              image={baychha}
              price="$5.00"
              unit="Serving 100 persons"
              stock="In Stock"
            />
            <PopularItem 
              title="Burger"
              image={burger}
              price="$5.00"
              unit="Serving 10 persons"
              stock="In Stock"
            />
            <PopularItem 
              title="Hot Dog"
              image={hotDog}
              price="$4.00"
              unit="Serving 10 persons"
              stock="Out of Stock"
            />
            <PopularItem 
              title="Burger"
              image={burger}
              price="$5.00"
              unit="Serving 10 persons"
              stock="In Stock"
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className='bg-secondary-400 mt-4 rounded-md p-4'>
        <MyChart />
      </div>
    </div>
  );
}
