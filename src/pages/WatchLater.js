import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";

export function WatchLater(){
    const {state} = useVideo();
    return(
        <>
        <h2>Your Watch Later:</h2>
        <div className="grid-card">
            {state.watchLater.map(({_id,slug,thumbnail,title,channel_name,published_date})=>{
                return <div className="video-card" key={_id}>
                        <Link to={`/video/${slug}`}>
                        <img className="thumb-img" src={thumbnail} alt={slug}/>
                        <div>{title}</div>
                        <div>{channel_name}</div>
                        <div>{published_date}</div>
                        </Link>
                    </div>
            })}
        </div>
        </>
    )
} 