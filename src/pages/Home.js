import {Link} from "react-router-dom";
import '../stylesheets/home.css';
import {useVideo} from "../videoContext";

export function Home(){
    const {dispatchHistory,videosDB} = useVideo();
    return(
        <div className="grid-card">
            {!videosDB && <div>Please wait, videos are loading...</div>}
            {videosDB.map(video=>{
                return <div onClick={()=>dispatchHistory({type:"addToHistory",payload:video})} className="video-card" key={video._id}>
                        <Link to={`/video/${video.slug}`}>
                        <img className="thumb-img" src={video.thumbnail} alt={video.slug}/>
                        <div>{video.title}</div>
                        <div>{video.channel_name}</div>
                        <div>{video.published_date}</div>
                        </Link>
                    </div>
            })}
        </div>
    )
}