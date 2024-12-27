import React, { useState } from 'react'
import DataContext from './DataContext';

function DataState(props) {
  const dataInitial = [];
  const host = 'https://youtube.googleapis.com/youtube/v3';
  const [data, setData] = useState(dataInitial);
  const [totalResults, setTotalResults] = useState(0);
  const [pageToken, setPageToken] = useState("")
  const apikey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${host}/videos?part=snippet,statistics&chart=mostPopular&maxResults=14&key=${apikey}`, {
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
        const enrichedVideos = await Promise.all(
          json.items.map(async (video) => {
            try {
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
            } catch (channelError) {
              console.error('Error fetching channel details:', channelError);
              video.icon = null;
              video.badge = false;
            }
            return video;
          })
        );
        // console.log(channeldatawithvideo)
        // setData(channeldatawithvideo);
        setData(enrichedVideos);
        setPageToken(json.nextPageToken);
        setTotalResults(json.pageInfo.totalResults);

        // console.log(enrichedVideos)
      } else {
        console.error('No videos found in API response:', json);
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setData([]);
    }
  };



  const fetchmorevideos = async () => {
    try {
      const response = await fetch(`${host}/videos?part=snippet,statistics&chart=mostPopular&key=${apikey}&pageToken=${pageToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parsedData = await response.json();
      if (parsedData && parsedData.items) {
        const enrichedVideos = await Promise.all(
          parsedData.items.map(async (video) => {
            try {
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
            } catch (channelError) {
              console.error('Error fetching channel details:', channelError);
              video.icon = null;
              video.badge = false;
            }
            return video;
          })
        );


        setData(data.concat(enrichedVideos)); // Concatenate new videos to the existing data
        setPageToken(parsedData.nextPageToken);
        setTotalResults(parsedData.pageInfo.totalResults);
      }
    } catch (error) {
      console.error('Error fetching more videos:', error);
    }
  };



  return (
    <div>
      <DataContext.Provider value={{ fetchVideos, data, fetchmorevideos, totalResults }}>
        {props.children}
      </DataContext.Provider>
    </div>
  )
}

export default DataState