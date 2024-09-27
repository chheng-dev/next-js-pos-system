"use client";
import React, { useEffect, useState } from 'react';
import { Bell, CircleChevronLeft, MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import hamburgerMenu from "../../assets/images/menu.svg"
import ModalMenu from '../ModalMenu';
import { PiLineVertical } from "react-icons/pi";
import { ProfileService } from '@/services/profileService';
import toast from "react-hot-toast";

function Header() {
  const [profile, setProfile] = useState(null);

  const pathname = usePathname();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async()=>{
      try{
        const profileData = await ProfileService.getProfile();
        setProfile(profileData);
      } catch(error){
        toast.error('Failed to fetch profile data');
      }
    }    

    fetchProfile();
  }, []);

  if (!profile) {
    return null;
  }


  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="items-center gap-2 lg:flex hidden">
        <CircleChevronLeft className='w-4 h-4' />
        <h4 className="text-sm text-white uppercase">{ pathname.replace("/", "")}</h4>
      </div>
      <div className='lg:hidden flex items-center gap-2'>
        <h4 className='font-extrabold text-customPrink-400 text-lg'>COSYPOS</h4>
      </div>
      <div className='flex gap-2 items-center'>
        <div>
          <Bell className='w-4 h-4' />
        </div>
        <div className='text-slate-400' style={{height: "50%"}}>
          <PiLineVertical />
        </div>
        <div className="relative inline-flex items-center justify-center lg:w-8 lg:h-8 w-7 h-7 overflow-hidden bg-gray-100 rounded-full">
            <span className="font-medium text-gray-600">
            {profile.imageUrl &&  (
              <img 
                src={profile.imageUrl} 
                alt="Profile Image" 
                className='bg-cover'
                width={80}
                height={80} 
              />
            )}           
          </span>
        </div>
        <div className='lg:hidden block'>
          <Image
            src={hamburgerMenu} 
            className="lg:w-6 lg:h-6 w-8 h-8 text-white cursor-pointer"
            alt="Menu"
            onClick={handleModalClick}
          />
          <ModalMenu isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
      </div>
    </div>
  );
}

export default Header;
