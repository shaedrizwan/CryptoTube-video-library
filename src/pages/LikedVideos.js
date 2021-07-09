import {Link} from "react-router-dom";
import "../stylesheets/history.css";
import { useAuth } from "../authContext";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import axios from "axios";

export function LikedVideos(){

    const {token} = useAuth();

    const [likedVideos,setLikedVideos] = useState()

    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/likedvideos',{
                headers:{
                    Authorization:token
                }
            })
            setLikedVideos(response.data.likedvideos);
        })()
    },[token])

    const RemoveFromLikedvideos = async (id) =>{
        try{
            const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/removeFromLikedvideos',{
                videoId: id
            },{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                setLikedVideos(likedVideos.filter(video => video._id !== id))
                toast.success('Video removed successfully',{
                    position:toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000
                })
            }
        }
        catch{
            toast.error('Failed to remove the video!!',{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
        }
    }

    return(
        <>
        <h2>Your Liked Videos:</h2>
        <div className="grid-card">
            {likedVideos && likedVideos.map(video=>{
                return <div className="video-card" key={video._id}>
                        <Link to={`/video/${video.slug}`}>
                        <img className="thumb-img" src={video.thumbnail} alt={video.slug}/>
                        <div>{video.title}</div>
                        <div>{video.channel_name}</div>
                        <div>{video.published_date}</div>
                        </Link>
                        <button onClick={()=>RemoveFromLikedvideos(video._id)}>Remove from Liked Videos</button>
                    </div>
            })}
            {!likedVideos && <div>Loading videos...</div>}
        </div>
        </>
    )
} 