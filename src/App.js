import './App.css';
import {Routes, Route,NavLink} from "react-router-dom";
import {Home} from "./pages/Home";
import {VideoDetails} from "./pages/VideoDetails";
import {Explore} from "./pages/Explore";
import {History} from "./pages/History";
import {LikedVideos} from "./pages/LikedVideos";
import {Playlist} from "./pages/Playlist";
import {WatchLater} from "./pages/WatchLater";

function App() {
  const linkStyle = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    padding: '1rem 0rem 0rem',
    cursor: 'pointer',
    color: "black",
    textDecoration: "none"
  }

  const linkStyleActive = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    padding: '1rem 0rem 0rem',
    cursor: 'pointer',
    color: "red",
    textDecoration: "none"
  }
  return ( 
    <div className="App">
      <nav>
        <img src="/logo.png" width="150px" height="150px" alt="Cryptotube"/>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="/">Home</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="explore">Explore</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="playlist">Playlist</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="watch-later">Watch Later</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="liked-videos">Liked Videos</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="history">History</NavLink>
      </nav>
      <div class="main">
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
