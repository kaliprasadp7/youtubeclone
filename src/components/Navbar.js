import React, { useContext } from 'react'
import logo from '../assets/logo.png';
import profilepic from '../assets/profile.jpg'
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import UserContext from '../context/UserContext';



function Navbar({onMenuClick}) {  
    const context = useContext(UserContext);
    const { accessToken, handleLogin, handleLogout } = context;

    return (
        <div className='flex items-center justify-between space-x-2 p-1 md:p-2'>
            <div className='flex md:space-x-2 lg:p-2 lg:space-x-3'>
                <div className="p-2 rounded-full active:bg-gray-200">
                    <FiMenu className='text-sm md:text-lg lg:text-2xl' onClick={onMenuClick} />
                </div>

                <div className="flex items-center">
                    <img src={logo} alt="logo" className="w-14 md:w-20 lg:w-24" />
                    <sup className='text-[8px] md:text-[10px] lg:text-[12px]'>IN</sup>
                </div>
            </div>

            <div className="flex space-x-2">
                <div className="flex">
                    <div className="flex items-center relative group">
                        <CiSearch className='text-lg absolute group-focus-within:text-gray-600 hidden group-focus-within:block left-3 md:text-xl' />
                        <input type="text"
                            className='w-[30vw] pl-4 focus:pl-8 border border-gray-500 outline-none rounded-l-full peer md:pl-5 md:w-[40vw] md:focus:pl-9 lg:pl-6 lg:focus:pl-10 h-full' placeholder='Search' />
                        <RxCross1 className='text-lg absolute group-focus-within:text-gray-600 hidden group-focus-within:block right-2  md:text-xl' />
                    </div>
                    <button className='w-10 border border-gray-500 border-l-0 bg-gray-100 place-items-center rounded-r-full md:w-12 lg:w-14'>< CiSearch className='text-lg md:text-xl lg:text-2xl' /></button>
                </div>

                <div className="flex justify-center items-center bg-gray-100 rounded-full">
                    <IoMdMic className='text-xl p-1 md:text-4xl md:p-2' />
                </div>
            </div>

            {accessToken ? <div className="flex items-center justify-between space-x-1 md:space-x-2 lg:space-x-3">
                < RiVideoAddLine className='text-lg md:text-xl lg:text-2xl' />
                < IoIosNotificationsOutline className='text-lg md:text-xl lg:text-2xl' />
                <img src={profilepic} alt="profileicon" className='w-5 rounded-full md:w-6 lg:w-7' onClick={handleLogout} />
            </div> :
            <div className="flex items-center gap-2 border rounded-full px-2 py-1" onClick={handleLogin}>
                <CgProfile className='text-xl'/>
                <span>Sign in</span>
            </div>
            }
        </div>
    )
}

export default Navbar
