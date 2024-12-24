import React, { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext'
import VideoCard from './VideoCard'
import InfiniteScroll from 'react-infinite-scroll-component';

function Feed() {
  const context = useContext(DataContext);
  const { fetchVideos, data, fetchmorevideos, totalResults } = context;

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, [])

  return (
    <InfiniteScroll
        dataLength={data.length}
        next={fetchmorevideos}
        hasMore={data.length < totalResults}
        loader={<h4>Loading...</h4>}
      >
    <div className='p-1 md:p-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {data.map((video) => {
          return <VideoCard key={video.id} data={video} />
        })}
    </div>
      </InfiniteScroll>
  )
}

export default Feed
