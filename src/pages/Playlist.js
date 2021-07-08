import "../stylesheets/history.css";
import { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import axios from "axios";
import "../stylesheets/playlist.css"
import { Link } from "react-router-dom";

export function Playlist(){
    const {token} = useAuth()
    const [list,setPlaylist] = useState();

    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                console.log(response.data.playlist)
                setPlaylist(response.data.playlist);
            }
        })()
    },[token])

    return(
        <>
        <h2>This is Playlist Page</h2>
        <div>
            {!list && <div>Please wait.. playlist is loading!</div>}
            {list && list.map(item =>{
                return <div className="playlistCard" key={item._id}>
                    <Link to={`/playlist/${item.playlistName}`}>
                    <h4>{item.playlistName}</h4>
                    <div>Total videos: {item.videos.length}</div>
                    </Link>
                </div>
            })}
            {list && list.length === 0 && <div>No saved playlist</div>}
        </div>
        </>
    ) 
}