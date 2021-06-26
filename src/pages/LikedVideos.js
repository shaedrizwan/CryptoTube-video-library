import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";

export function LikedVideos(){
    const {state} = useVideo();
    return(
        <>
        <h2>Your Liked Videos:</h2>
        <div className="grid-card">
            {state.likedVideos.map(video=>{
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