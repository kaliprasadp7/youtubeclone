import React, { useState } from 'react'
import DataContext from './DataContext';

function DataState(props) {
  const dataInitial = [];
  const host = 'https://youtube.googleapis.com/youtube/v3';
  const [data, setData] = useState(dataInitial);
  const [totalResults, setTotalResults] = useState(0);
  const [pageToken, setPageToken] = useState("")
  const apikey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [searchlist, setSearchlist] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  //Helper function to fetch channel data
  const fetchChannelData = async (channelId) => {
    try {
      const response = await fetch(`${host}/channels?part=status,snippet&id=${channelId}&key=${apikey}`);
      const json = await response.json();
      return {
        icon: json.items?.[0]?.snippet?.thumbnails?.default?.url || null,
        badge: json.items?.[0]?.status?.isLinked || false,
      };
    } catch (error) {
      console.error('Error fetching channel details:', error);
      return { icon: null, badge: false };
    }
  };

  //Helper function to fetch video data for searched videos
  const fetchVideoData = async (videoId) => {
    try {
      const response = await fetch(`${host}/videos?part=statistics&id=${videoId}&key=${apikey}`);
      const json = await response.json();
      return { statistics: json.items?.length > 0 ? json.items[0].statistics : { viewCount: "0" } };
    } catch (error) {
      console.error('Error fetching video details:', error);
      return { statistics: { viewCount: "0" } };
    }
  };


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
            const channelData = await fetchChannelData(video.snippet.channelId); // Fetch channel data
            return { ...video, ...channelData };
          })
        );
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

      const json = await response.json();
      if (json && json.items) {
        const enrichedVideos = await Promise.all(
          json.items.map(async (video) => {
            const channelData = await fetchChannelData(video.snippet.channelId); // Fetch channel data
            return { ...video, ...channelData };
          })
        );
        setData(data.concat(enrichedVideos)); // Concatenate new videos to the existing data
        setPageToken(json.nextPageToken);
        setTotalResults(json.pageInfo.totalResults);
      }
    } catch (error) {
      console.error('Error fetching more videos:', error);
    }
  };


  //Search Videos
  const searchVideos = async (searchTerm) => {
    try {
      const response = await fetch(`${host}/search?part=snippet&type=video&maxResults=14&q=${searchTerm}&key=${apikey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (json && json.items) {
        const enrichedVideos = await Promise.all(
          json.items.map(async (video) => {
            const channelData = await fetchChannelData(video.snippet.channelId); // Fetch channel data
            const videoData = await fetchVideoData(video.id.videoId); // Fetch video statistics data -> viewcoount
            return { ...video, ...channelData, ...videoData };
          })
        );
        setSearchlist(true);
        setSearchTerm(searchTerm);
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

  // const fetchmoreSearchVideos = () => {
  //   fetchmoreSearchVideos1(searchTerm);
  // }

  const fetchmoreSearchVideos = async (searchTerm) => {
    if (!pageToken || !searchTerm) return;
    try {
      const response = await fetch(`${host}/search?part=snippet&type=video&maxResults=14&q=${searchTerm}&key=${apikey}&pageToken=${pageToken}`, {
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
            const channelData = await fetchChannelData(video.snippet.channelId); // Fetch channel data
            const videoData = await fetchVideoData(video.id.videoId); // Fetch video data
            return { ...video, ...channelData, ...videoData };
          })
        );
        setSearchlist(true);
        setSearchTerm(searchTerm);
        setData(data.concat(enrichedVideos));
        setPageToken(parsedData.nextPageToken);
        setTotalResults(parsedData.pageInfo.totalResults);

      } else {
        console.error('No videos found in API response:', parsedData);
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching more videos:', error);
      setData([]);
    }
  };

  return (
    <div>
      <DataContext.Provider value={{ fetchVideos, data, fetchmorevideos, totalResults, searchVideos, fetchmoreSearchVideos, searchlist, searchTerm }}>
        {props.children}
      </DataContext.Provider>
    </div>
  )
}

export default DataState