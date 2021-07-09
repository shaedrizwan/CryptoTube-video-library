import {useParams} from "react-router-dom";
import { useAuth } from "../authContext";
import '../stylesheets/videodetails.css';
import {useVideo} from "../videoContext";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

toast.configure()

export function VideoDetails(){
    const {slug} = useParams();
    const {token} = useAuth();

    const {videosDB} = useVideo();
    const video = videosDB.find(vid=>vid.slug === slug);
    const [playlistPopup,setPlaylistPopup] = useState(false)
    const [playlist,setPlaylist] = useState({})

    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
                headers:{
                    Authorization:token
                }
            })
            setPlaylist(response.data.playlist)
        })()
    },[token])

    const updateVideoList = async(id,type) =>{
        try{
            const response = await axios.post(`https://cryptotube-backend.herokuapp.com/user/addTo${type}`,{
                videoId:id
            },{
            headers:{
                Authorization:token
            }
            })
            if(response.status === 200){
                toast.success(`Video successfully added to ${type}!!`,{
                    position:toast.POSITION.BOTTOM_RIGHT
                })
            }
        }catch{
            toast.error(`Failed to add video to ${type}!`,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    const addToPlaylist = async (list,videoId) =>{
        console.log(list,videoId)
        const response = await axios.post(`https://cryptotube-backend.herokuapp.com/user/addToPlaylist`,{
            playlist:list,
            videoId:videoId
        },{
        headers:{
            Authorization:token
        }
        })
        if(response.status === 200){
            toast.success(`Video successfully added to ${list}`,{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
            setPlaylistPopup(false)
        }
    }



    return(
        <div className="video-main">
            {!video && <div>Please wait, video is loading...</div>}
            {video && <>
            <iframe src={video.youtube_url}
                className="video-iframe"
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
            />
            <h2>{video.title}</h2>
            <div className="attr-container">
                <div className="date">{video.published_date}</div>
                <div onClick={()=>updateVideoList(video._id,"Likedvideos")} className="attr-items">Like</div>
                <div onClick={()=>setPlaylistPopup(toggle => !toggle)} className="attr-items">playlist</div>
                {playlistPopup && <div className="playlist-popup">
                    {playlist.map((list)=>{
                        return <div onClick={()=>addToPlaylist(list.playlistName,video._id)} key={list._id}>{list.playlistName}</div>
                    })}
                </div>}
                <div onClick={()=>updateVideoList(video._id,"Watchlater")} className="attr-items">Watch Later</div>
            </div>
            <div>{video.channel_name}</div>
            </>}
        </div>
        )
}