import React, { useState } from "react";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import YouTubeClone from "./components/YoutubeClone";
import DataState from "./context/DataState";
import VideoCard from "./components/VideoCard";

function App() {
  // const apikey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  return (
    <div className="relative">
      <DataState>
        <Navbar onMenuClick={toggleSidebar} />
        <Sidebar onMenuClick={toggleSidebar} isOpen={isSidebarOpen} />
        <Feed />
        <VideoCard/>
        <YouTubeClone />
      </DataState>
    </div>
  );
}

export default App;
