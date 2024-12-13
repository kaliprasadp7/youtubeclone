import React,{useState} from "react";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const apikey = process.env.REACT_APP_YOUTUBE_API_KEY;
  console.log(apikey)
    
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative">
    <Navbar onMenuClick={toggleSidebar}/>
    <Sidebar onMenuClick={toggleSidebar} isOpen={isSidebarOpen}/>
    <Feed/>
    </div>
  );
}

export default App;
