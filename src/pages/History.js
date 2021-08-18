import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";

export function History(){
    const {state} = useVideo();
    const {dispatchHistory} = useVideo();
    return(
        <>
        <h2 style={{color:"white"}}>Your Watch History:</h2>
        {state.length !== 0 && <button className="clear-button" onClick={()=>dispatchHistory({type:"clearHistory"})}>Clear History</button>}
        <div className="video-wrap">
            {state.length === 0 && <h1 style={{color:"white"}}>You did not watch any video</h1>}
            {state && state.map((video) =>{
                return <div className="video-container" key={video._id}>
                        <Link className="video-link-wrapper" to={`/video/${video.slug}`}>
                        <img style={{maxWidth:"350px",height:"fit-content"}} src={video.thumbnail} alt={video.slug}/>
                        <div className="video-title">{video.title}</div>
                        <div className="video-details-container">
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRKlMd8XiIOUXc9DKEjUgt5fFy1OJgYkN9tF90F4w=s68-c-k-c0x00ffffff-no-rj" alt="profile" style={{width:"40px", height:"fit-content", borderRadius:"50%",marginRight:"10px"}}/>
                            <div>
                                <div className="video-channel">{video.channel_name}</div>
                                <div className="video-date">{video.published_date}</div>
                            </div>
                        </div>
                        </Link>
                        <button className="clear-button" onClick={()=>dispatchHistory({type:"removeFromHistory",payload:video})}>Remove from History</button>
                    </div>
            })}
        </div>
        </>
    )
}