import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";

export function LikedVideos(){
    const {state} = useVideo();
    return(
        <>
        <h2>Your Liked Videos:</h2>
        <div class="grid-card">
            {state.likedVideos.map(video=>{
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