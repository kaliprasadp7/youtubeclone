import React,{useContext, useEffect} from 'react'
import DataContext from '../context/DataContext'
import VideoCard from './VideoCard'

function Feed() {
  const context = useContext(DataContext);
  const {fetchVideos, data} = context;

  useEffect(()=>{
    fetchVideos();
    // eslint-disable-next-line
  },[])

  return (
    <div className='p-1 md:p-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {data.map((video) => {
        return <VideoCard key={video.id} data={video}/>
      })}
    </div>
  )
}

export default Feed
