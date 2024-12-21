import React, { useState } from 'react'
import DataContext from './DataContext';

function DataState(props) {
  const dataInitial = [];
  const host = 'https://youtube.googleapis.com/youtube/v3';
  const [data, setData] = useState(dataInitial);
  const apikey = process.env.REACT_APP_YOUTUBE_API_KEY;

  // const isubscribed = async () => {
  //   //API call
  //   const response = await fetch(`${host}/subscriptions?part=snippet&mine=true&key=${apikey}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': localStorage.getItem('token')
  //     }
  //   })
  //   const json = await response.json();
  //   setNotes(json);
  // }

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${host}/videos?part=snippet,statistics&chart=mostPopular&key=${apikey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const json = await response.json();
      if (json && json.items) {
        json.items.map(async (video)=> {
          const channelresponse = await fetch(`${host}/channels?part=status,snippet&id=${video.snippet.channelId}&key=${apikey}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const channeljson = await channelresponse.json();
          // console.log(channeljson)
          video.icon = channeljson.items[0].snippet.thumbnails.default.url;
          video.badge = channeljson.items[0].status.isLinked;
          // const channeldatawithvideo = video.push(icon, badge);
          // console.log(video)
          // video.push(icon, badge);
          // console.log(video)
        })
        // console.log(channeldatawithvideo)
        // setData(channeldatawithvideo);
        setData(json.items)
        // console.log(json.items)
      } else {
        console.error('No videos found in API response:', json);
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setData([]);
    }
  };  


  return (
    <div>
      <DataContext.Provider value={{ fetchVideos, data }}>
        {props.children}
      </DataContext.Provider>
    </div>
  )
}

export default DataState
