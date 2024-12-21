import React from 'react'
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import logo from '../assets/logo.png';
import { GoHistory } from "react-icons/go";
import { CgPlayList } from "react-icons/cg";
import { CiYoutube } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";



function Sidebar({ onMenuClick, isOpen }) {

  let sidebarobj1 = [{
    title: "Home",
    icon: <IoMdHome />
  },
  {
    title: "Shorts",
    icon: <SiYoutubeshorts />
  },
  {
    title: "Subscriptions",
    icon: <MdOutlineOndemandVideo />
  },
  ];

  let sidebarobj2 = [{
    title: "History",
    icon: <GoHistory />
  },
  {
    title: "Playlists",
    icon: <CgPlayList />
  },
  {
    title: "Your videos",
    icon: <CiYoutube />
  },
  {
    title: "Your courses",
    icon: <HiOutlineLightBulb />
  },
  {
    title: "Watch Later",
    icon: <MdOutlineWatchLater />
  },
  {
    title: "Liked videos",
    icon: <BiLike />
  }];


  return (
    <div className={`w-[40vw] md:w-[30vw] lg:w-[17vw] border border-red-900 p-2 h-[100vh] z-50 fixed top-0 bg-white transform transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className='flex md:space-x-2 lg:p-2 lg:space-x-3'>
        <div className="p-2 rounded-full active:bg-gray-200">
          <FiMenu className='text-sm md:text-lg lg:text-xl' onClick={onMenuClick} />
        </div>

        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-14 md:w-20 lg:w-28" />
          <sup className='text-[8px] md:text-[10px] lg:text-[12px]'>IN</sup>
        </div>
      </div>
      <div>
        {sidebarobj1.map((item, index) => (
          <div key={index} className="p-2 rounded-md flex items-center space-x-2  hover:bg-[#f2f2f2] active:bg-[#f2f2f2]">
            <span className='text-lg md:text-xl lg:text-2xl'>{item.icon}</span>
            <span className='text-xs md:text-sm lg:text-base active:font-medium'>{item.title}</span>
          </div>
        ))}
      </div>
      <hr className='mt-2 mb-2' />
      <div className="flex items-center space-x-1 mb-2 pl-2">
        <span className='font-bold'>You</span>
        <MdKeyboardArrowRight className='text-xl' />
      </div>
      {sidebarobj2.map((item, index) => (
        <div key={index} className="p-2 rounded-md flex items-center space-x-5 hover:bg-[#f2f2f2] active:bg-[#f2f2f2]">
          <span className='text-lg md:text-xl lg:text-2xl'>{item.icon}</span>
          <span className=''>{item.title}</span>
        </div>
      ))}
      <hr className='mt-2 mb-2'/>
    </div>
  )
}

export default Sidebar
