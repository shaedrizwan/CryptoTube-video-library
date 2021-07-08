import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import {Home} from "./pages/Home";
import {VideoDetails} from "./pages/VideoDetails";
import {Explore} from "./pages/Explore";
import {History} from "./pages/History";
import {LikedVideos} from "./pages/LikedVideos";
import {Playlist} from "./pages/Playlist";
import {WatchLater} from "./pages/WatchLater";
import {NavAside} from "./nav";
import {Login} from "./pages/Login";
import {NoMatch} from "./pages/404";
import { useAuth } from './authContext';
import {PlaylistVideos} from "./pages/playlistvideos"

function App() {
  const {login} = useAuth();

  function PrivateRoute({login,path,...props}){
    return login?<Route path={path} {...props}/>:<Navigate state={{from:path}} replace to="/login"/>
  }
  return ( 
    <div className="App">
      <nav>
        <NavAside/>
      </nav>
      <div className="main">
         <Routes>
           <Route end path="/" element={<Home/>}/>
           <Route path="/explore" element={<Explore/>}/>
           <Route path="/history" element={<History/>}/>
           <PrivateRoute path="/liked-videos" element={<LikedVideos/>} login = {login}/>
           <Route path="/playlist" element={<Playlist/>}/>
           <Route path="/watch-later" element={<WatchLater/>}/>
           <Route path="/video/:slug" element={<VideoDetails/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/playlist/:name" element={<PlaylistVideos/>}/>
           <Route path="*" element={<NoMatch/>}/>
         </Routes>
      </div>
    </div>
  );
}

export default App;
