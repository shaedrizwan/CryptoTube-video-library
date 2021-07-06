// import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";
import { useAuth } from "../authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


toast.configure()

export function WatchLater(){
    // const {state} = useVideo();
    const {token} = useAuth();

    const [watchlater,setWatchlater] = useState()

    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/watchlater',{
                headers:{
                    Authorization:token
                }
            })
            setWatchlater(response.data.watchlater);
        })()
    },[token])


    const RemoveFromWatchlater = async (id) =>{
        try{
            const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/removeFromWatchlater',{
                videoId: id
            },{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                setWatchlater(watchlater.filter(video => video._id !== id))
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
        <h2>Your Watch Later:</h2>
        <div className="grid-card">
            {!watchlater && <div>Loading videos...</div>}
            {watchlater && watchlater.length === 0 && <div>You don't have any videos in Watchlater</div>}
            {watchlater && watchlater.length !== 0 && watchlater.map(({_id,slug,thumbnail,title,channel_name,published_date})=>{
                return <div className="video-card" key={_id}>
                        <Link to={`/video/${slug}`}>
                        <img className="thumb-img" src={thumbnail} alt={slug}/>
                        <div>{title}</div>
                        <div>{channel_name}</div>
                        <div>{published_date}</div>
                        </Link>
                        <button onClick={()=>RemoveFromWatchlater(_id)}>Remove from Watchlater</button>
                    </div>
                    
            })}
        </div>
        </>
    )
} 