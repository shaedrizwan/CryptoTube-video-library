import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useAuth } from "../authContext"
import axios from 'axios'
import "../stylesheets/history.css";
import { Link } from "react-router-dom";


export  function PlaylistVideos(){
    const {name} = useParams()
    const {token} = useAuth()
    const [playlistVideos,setPlaylistVideos] = useState([])
    
    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                const playlist = response.data.playlist.find(list=>list.playlistName === name)
                setPlaylistVideos(playlist.videos)
            }
        })()

    },[name,token])

    return(
        <>
            <h2>Playlist: {name}</h2>
            <div className="grid-card">
                {!PlaylistVideos && <div>Please wait.. Videos are loading...</div>}
                {playlistVideos.length === 0 && <div>No videos in the playlist</div>}
                {playlistVideos && playlistVideos.map(video=>{
                    return <div className="video-card" key={video._id}>
                            <Link to={`/video/${video.slug}`}>
                            <img className="thumb-img" src={video.thumbnail} alt={video.slug}/>
                            <div>{video.title}</div>
                            <div>{video.channel_name}</div>
                            <div>{video.published_date}</div>
                            </Link>
                        </div>
                })}
            </div>
        </>
    )
}