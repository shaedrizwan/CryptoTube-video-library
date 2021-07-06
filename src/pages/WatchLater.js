// import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";
import { useAuth } from "../authContext";
import { useEffect, useState } from "react";
import axios from "axios";

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

    return(
        <>
        <h2>Your Watch Later:</h2>
        <div className="grid-card">
            {watchlater && watchlater.map(({_id,slug,thumbnail,title,channel_name,published_date})=>{
                return <div className="video-card" key={_id}>
                        <Link to={`/video/${slug}`}>
                        <img className="thumb-img" src={thumbnail} alt={slug}/>
                        <div>{title}</div>
                        <div>{channel_name}</div>
                        <div>{published_date}</div>
                        </Link>
                    </div>
            })}
            {!watchlater && <div>Loading videos...</div>}
        </div>
        </>
    )
} 