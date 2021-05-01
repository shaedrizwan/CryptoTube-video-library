import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";

export function History(){
    const {state} = useVideo();
    return(
        <>
        <h2>Your Watch History:</h2>
        <div class="grid-card">
            {state.history.map(video=>{
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