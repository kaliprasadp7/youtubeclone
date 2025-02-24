import React, { useState } from "react";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DataState from "./context/DataState";
// import VideoCard from "./components/VideoCard";
import UserState from "./context/UserState";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  return (
    <div className="relative">
      <UserState>
        <DataState>
          <Navbar onMenuClick={toggleSidebar} />
          <Sidebar onMenuClick={toggleSidebar} isOpen={isSidebarOpen} />
          <Feed isOpen={isSidebarOpen} />
          {/* <VideoCard /> */}
        </DataState>
      </UserState>
    </div>
  );
}

export default App;
