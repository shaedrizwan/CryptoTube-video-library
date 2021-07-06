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
            {state.map(({_id,slug,thumbnail,title,channel_name,published_date}) =>{
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