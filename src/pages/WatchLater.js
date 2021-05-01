import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";

export function WatchLater(){
    const {state} = useVideo();
    return(
        <>
        <h2>Your Watch Later:</h2>
        <div class="grid-card">
            {state.watchLater.map(video=>{
                return <div class="video-card" key={video.id}>
                        <Link to={`/video/${video.slug}`}>
                        <img class="thumb-img" src={video.imageUrl} alt={video.slug}/>
                        <div>{video.name}</div>
                        <div>{video.channel}</div>
                        <div>{video.date}</div>
                        </Link>
                    </div>
            })}
        </div>
        </>
    )
} 