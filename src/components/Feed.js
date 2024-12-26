import React, { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext'
import VideoCard from './VideoCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { CgProfile } from "react-icons/cg";


function Feed({isOpen}) {
  const context = useContext(DataContext);
  const { fetchVideos, data, fetchmorevideos, totalResults } = context;

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='flex gap-2 mx-1'>
      <div className='flex flex-col'>
        <div className="flex flex-col items-center gap-2 pt-4 pb-4 rounded-xl hover:bg-[#f2f2f2]">
          <IoMdHome className='text-2xl' />
          <span className='text-[10px]'>Home</span>
        </div>
        <div className="flex flex-col items-center gap-2 pt-4 pb-4 rounded-xl hover:bg-[#f2f2f2]">
          <SiYoutubeshorts className='text-2xl' />
          <span className='text-[10px]'>Shorts</span>
        </div>
        <div className="flex flex-col items-center gap-2 pt-4 pb-4 rounded-xl hover:bg-[#f2f2f2]">
          <MdOutlineOndemandVideo className='text-2xl' />
          <span className='text-[10px]'>Subscriptions</span>
        </div>
        <div className="flex flex-col items-center gap-2 pt-4 pb-4 rounded-xl hover:bg-[#f2f2f2]">
          <CgProfile className='text-2xl' />
          <span className='text-[10px]'>You</span>
        </div>
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchmorevideos}
        hasMore={data.length < totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className={`p-1 md:p-2 grid grid-cols-1 gap-4 md:grid-cols-2 ${isOpen && 'lg:grid-cols-3 lg:pl-[12vw]'} ${ !isOpen && 'lg:grid-cols-4'}  `}>
          {data.map((video) => {
            return <VideoCard key={video.id} data={video} />
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Feed
