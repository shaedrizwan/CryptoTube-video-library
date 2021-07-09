import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";

export function History(){
    const {state} = useVideo();
    const {dispatchHistory} = useVideo();
    return(
        <>
        <h2>Your Watch History:</h2>
        <button onClick={()=>dispatchHistory({type:"clearHistory"})}>Clear History</button>
        <div className="grid-card">
            {state.length === 0 && <div>You did not watch any video</div>}
            {state.map((video) =>{
                return <div className="video-card" key={video._id}>
                        <Link to={`/video/${video.slug}`}>
                        <img className="thumb-img" src={video.thumbnail} alt={video.slug}/>
                        <div>{video.title}</div>
                        <div>{video.channel_name}</div>
                        <div>{video.published_date}</div>
                        </Link>
                        <button onClick={()=>dispatchHistory({type:"removeFromHistory",payload:video})}>Remove from History</button>
                    </div>
            })}
        </div>
        </>
    )
}