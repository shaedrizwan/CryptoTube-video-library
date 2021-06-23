import {Link} from "react-router-dom";
import '../stylesheets/home.css';
import {useVideo} from "../videoContext";

export function Home(){
    const {dispatch,videosDB} = useVideo();
    return(
        <div class="grid-card">
            {videosDB.map(video=>{
                return <div onClick={()=>dispatch({type:"addToHistory",payload:video})} class="video-card" key={video.id}>
                        <Link to={`/video/${video.slug}`}>
                        <img class="thumb-img" src={video.thumbnail} alt={video.slug}/>
                        <div>{video.title}</div>
                        <div>{video.channel_name}</div>
                        <div>{video.published_date}</div>
                        </Link>
                    </div>
            })}
        </div>
    )
}