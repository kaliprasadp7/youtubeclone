import React from 'react'
import { BsDot } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";


function VideoCard(props) {
    const { data } = props;
    if (!data || !data.snippet) {
        return null; // Handle missing data
    }

    const views = (num) => {
        if (num < 1000) {
            return num.toString();
        }
        if (num >= 1000 && num < 100000) {
            if (num % 1000 === 0 || num % 1000 < 100) {
                return Math.floor(num / 1000) + "K";
            }
            return (num / 1000).toFixed(1) + "K";
        }
        if (num >= 100000 && num < 10000000) {
            if (num % 100000 === 0 || num % 100000 < 10000) {
                return Math.floor(num / 100000) + " lakhs";
            }
            return (num / 100000).toFixed(1) + " lakhs";
        }
        if (num >= 10000000) {
            if (num % 10000000 === 0 || num % 10000000 < 1000000) {
                return Math.floor(num / 10000000) + " crore";
            }
            return (num / 10000000).toFixed(1) + " crore";
        }
    }

    function timeAgo(inputDate) {
        const date = new Date(inputDate);
        const now = new Date();
        const diff = now - date; // Difference in milliseconds
      
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
      
        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
      }
      

    return (
        <div>
            <img src={data.snippet.thumbnails.medium.url} alt="videothumbnail" className='w-full rounded-xl' />
            <div className='flex gap-2 mt-3'>
                <div>
                    <img src={data.icon} alt="channelicon" className='w-10 rounded-full' />
                </div>
                <div>
                    <h2 className='font-bold'>{data.snippet.title}</h2>
                    <div className='flex items-center gap-1'>
                        <span>{data.snippet.channelTitle}</span>
                        {data.badge === true ? <IoIosCheckmarkCircle className='text-sm' /> : ""}
                    </div>

                    <div className='flex  items-center'>
                        <span>{views(data.statistics.viewCount) + " views"}</span>
                        <BsDot />
                        <span>{timeAgo(data.snippet.publishedAt)}</span>
                    </div>
                </div>
                <div>
                    <HiOutlineDotsVertical className='text-xl' />
                </div>
            </div>
        </div>
    )
}

export default VideoCard
