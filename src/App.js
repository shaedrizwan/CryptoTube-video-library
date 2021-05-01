import './App.css';
import {Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import {VideoDetails} from "./pages/VideoDetails";
import {Explore} from "./pages/Explore";
import {History} from "./pages/History";
import {LikedVideos} from "./pages/LikedVideos";
import {Playlist} from "./pages/Playlist";
import {WatchLater} from "./pages/WatchLater";
import {NavAside} from "./nav";

function App() {
  return ( 
    <div className="App">
      <nav>
        <NavAside/>
      </nav>
      <div className="main">
         <Routes>
           <Route end path="/" element={<Home/>}/>
           <Route path="explore" element={<Explore/>}/>
           <Route path="history" element={<History/>}/>
           <Route path="liked-videos" element={<LikedVideos/>}/>
           <Route path="playlist" element={<Playlist/>}/>
           <Route path="watch-later" element={<WatchLater/>}/>
           <Route path="/video/:slug" element={<VideoDetails/>}/>
         </Routes>
      </div>
    </div>
  );
}

export default App;
