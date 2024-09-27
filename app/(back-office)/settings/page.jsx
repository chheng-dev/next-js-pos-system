"use client"

import React, { useEffect, useState } from "react";
import {Card, CardBody} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { icons, LogOut, Settings } from "lucide-react";
import LeftProfileComp from "../../../components/profile/LeftProfileComp";
import { ProfileService } from '@/services/profileService';
import RolesList from "@/components/profile/RolesListComp";

export default function page() {
  const [selected, setSelected] = React.useState("photos");
  const [activeTab, setActiveTab] = useState('my-profile');

  const [profile, setProfile] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);

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
    return <div></div>;
  }

  const profileMenu = [
    {
      title: "My Profile",
      tab: 'my-profile',
      icon: FaUser
    },
    {
      title: "Manage Access",
      tab: 'manage-access',
      icon: Settings
    },
    {
      title: "Roles",
      tab: 'roles',
      icon: Settings
    }
  ]

  const handleSetTab = (currentTab) => {
    setActiveTab(currentTab);
  }

  const getActiveClasses = (tab) => {
    return `flex gap-2 items-center py-2 px-2 mb-2 rounded-md cursor-pointer ${
      tab === activeTab ? 'bg-primary' : ''
    }`
  } 

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Logout successful');
        localStorage.removeItem('token'); 
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/login';
      } else {
        const data = await response.json();
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full gap-4 items-star">
        <div className="left w-1/6">
          <Card className="">
            <CardBody>
              <div className="flex flex-col">
                {
                  profileMenu.map((item, idx) => {
                    const Icon = item.icon;
                    return(
                      <div className={getActiveClasses(item.tab, activeTab)} onClick={() => handleSetTab(item.tab)} key={idx}>
                        <Icon  className="w-4 h-4" />
                        <span className="text-sm">{item.title}</span>
                      </div>
                    )
                  })
                }
                
                {/* Logout Button  */}
                <div className={`flex gap-2 items-center py-2 px-2 rounded-md cursor-pointer text-red-600`} onClick={() => handleLogout()}>
                  <LogOut  className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </div>              
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="right w-5/6">
          <Card>
            <CardBody>
              {
                activeTab === 'my-profile' && (
                  <LeftProfileComp profile={profile} />
                ) 
              }
               {
                activeTab === 'roles' && (
                  selectedUser && (
                    <RolesList />
                  )
                ) 
              }
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
