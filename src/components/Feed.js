import React, { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext'
import VideoCard from './VideoCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Spinner from './Spinner'
import Scrollbar from './Scrollbar';


function Feed({ isOpen }) {
  const context = useContext(DataContext);
  const { fetchVideos, data, fetchmorevideos, totalResults, fetchmoreSearchVideos, searchlist, searchTerm} = context;

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, [])

  const quickaccess = [{
    title: 'Home',
    icon: <IoMdHome />
  },
  {
    title: 'Shorts',
    icon: <SiYoutubeshorts />
  },
  {
    title: 'Subscriptions',
    icon: <MdOutlineOndemandVideo />
  },
  {
    title: 'You',
    icon: <CgProfile />
  }]

  return (
    <div className='flex gap-2 mx-1'>
      <div className='hidden xl:flex flex-col'>
        {quickaccess.map((item, index) => {
          return <div key={index} className="flex flex-col items-center gap-2 pt-4 pb-4 rounded-xl hover:bg-[#f2f2f2]">
            <span className='text-2xl'>{item.icon}</span>
            <span className='text-[10px]'>{item.title}</span>
          </div>
        })}
      </div>
      <div>
        <Scrollbar isOpen={isOpen} />

        <InfiniteScroll
          dataLength={data.length}
          next={searchlist ? () => fetchmoreSearchVideos(searchTerm) : fetchmorevideos} // Fetch more data
          hasMore={data.length < totalResults}
          loader={<Spinner />}
        >
          <div className={`p-1 md:p-2 grid grid-cols-1 gap-4 md:grid-cols-2 ${isOpen && 'lg:grid-cols-3 lg:pl-[12vw]'} ${!isOpen && 'lg:grid-cols-4'}`}>
            {data.map((video, index) => {
              return <VideoCard key={index} data={video} />
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Feed
