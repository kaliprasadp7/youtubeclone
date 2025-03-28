import React, { useContext, useEffect, useState } from 'react'
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
import { CgProfile } from 'react-icons/cg';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import UserContext from '../context/UserContext';


function Sidebar({ onMenuClick, isOpen }) {

  const context = useContext(UserContext);
  const { accessToken, handleLogin, subscriptions, fetchSubscriptions } = context;
  // console.log(accessToken)
  // console.log(subscriptions)

  // State to control the "Show More" / "Show Less" for subscriptions
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
    // eslint-disable-next-line
  }, [accessToken])

  let sidebarobj1 = [{ title: "Home", icon: <IoMdHome /> },
  { title: "Shorts", icon: <SiYoutubeshorts /> },
  { title: "Subscriptions", icon: <MdOutlineOndemandVideo /> }];

  let sidebarobj2 = [{ title: "History", icon: <GoHistory /> },
  { title: "Playlists", icon: <CgPlayList /> },
  { title: "Your videos", icon: <CiYoutube /> },
  { title: "Your courses", icon: <HiOutlineLightBulb /> },
  { title: "Watch Later", icon: <MdOutlineWatchLater /> },
  { title: "Liked videos", icon: <BiLike /> }];

  const toggleShowSubscriptions = () => {
    setShowAllSubscriptions(!showAllSubscriptions);
  };


  return (
    <div className={`overflow-hidden hover:overflow-auto w-[40vw] md:w-[30vw] lg:w-[17vw] p-2 h-[100vh] z-50 fixed top-0 bg-white transform transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className='flex md:space-x-2 lg:p-2 lg:space-x-3'>
        <div className="p-2 rounded-full active:bg-gray-200">
          <FiMenu className='text-sm md:text-lg lg:text-xl' onClick={onMenuClick} />
        </div>

        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-14 md:w-20 lg:w-24" />
          <sup className='text-[8px] md:text-[10px] lg:text-[12px]'>IN</sup>
        </div>
      </div>
      <div>
        {sidebarobj1.map((item, index) => (
          <div key={index} className="p-2 rounded-md cursor-pointer flex items-center space-x-2  hover:bg-[#f2f2f2] active:bg-[#f2f2f2]">
            <span className='text-lg md:text-xl lg:text-2xl'>{item.icon}</span>
            <span className='text-xs md:text-sm lg:text-base active:font-medium'>{item.title}</span>
          </div>
        ))}
      </div>
      <hr className='mt-2 mb-2' />
      <div className="flex items-center space-x-1 mb-2 pl-2 cursor-pointer">
        <span className='font-bold'>You</span>
        <MdKeyboardArrowRight className='text-xl' />
      </div>
      {sidebarobj2.map((item, index) => (
        <div key={index} className="p-2 rounded-md flex items-center cursor-pointer space-x-3 md:space-x-4 lg:space-x-5 hover:bg-[#f2f2f2] active:bg-[#f2f2f2]">
          <span className='text-lg md:text-xl lg:text-2xl'>{item.icon}</span>
          <span className='text-xs md:text-sm lg:text-base active:font-medium'>{item.title}</span>
        </div>
      ))}
      <hr className='mt-2 mb-2' />
      {accessToken ? <div>
        <span className='font-bold'>Subscription</span>

        {/* Show first 8 subscriptions or all based on state */}
        {subscriptions.slice(0, showAllSubscriptions ? subscriptions.length : 8).map((item, index) => (
          <div key={index} className="p-2 rounded-md flex items-center space-x-3 md:space-x-4 lg:space-x-5 hover:bg-[#f2f2f2] active:bg-[#f2f2f2] cursor-pointer">
            <img src={item.snippet.thumbnails.default.url} alt="channelIcon" className='w-5 md:w-6 lg:w-7 rounded-full' />
            <span className='text-xs md:text-sm lg:text-base active:font-medium'>{(item.snippet.title).length > 14 ? (item.snippet.title).slice(0, 15) + "..." : (item.snippet.title)}</span>
          </div>
        ))}

        {/* Show/Hide Button */}
        <div className="p-2 rounded-md flex items-center space-x-3 md:space-x-4 lg:space-x-5 hover:bg-[#f2f2f2] active:bg-[#f2f2f2] cursor-pointer" onClick={toggleShowSubscriptions}>
          <span className='p-1'>{showAllSubscriptions ? <FaAngleUp /> : <FaAngleDown />}</span>
          <span className='text-xs md:text-sm'>{showAllSubscriptions ? "Show less" : "Show more"}</span>
        </div>
      </div> :
        // show when accessToken is not available means user not loggedIn
        <div className='flex flex-col p-3 md:p-4 lg:p-5 gap-5 items-start'>
          <p className='text-xs md:text-sm'>Sign in to like videos, comment and subscribe.</p>
          <div className="flex items-center gap-2 border rounded-full px-2 py-1" onClick={handleLogin}>
            <CgProfile className='text-sm md:text-lg lg:text-xl' />
            <span className='text-xs md:text-sm'>Sign in</span>
          </div>
        </div>
      }

    </div>
  )
}

export default Sidebar
