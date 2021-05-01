import {videosDB} from "./videosDB";
import {Link} from "react-router-dom";
import '../stylesheets/home.css';
import {useVideo} from "../videoContext";

export function Home(){
    const {dispatch} = useVideo();
    return(
        <div class="grid-card">
            {videosDB.data.map(video=>{
                return <div onClick={()=>dispatch({type:"addToHistory",payload:video})} class="video-card" key={video.id}>
                        <Link to={`/video/${video.slug}`}>
                        <img class="thumb-img" src={video.imageUrl} alt={video.slug}/>
                        <div>{video.name}</div>
                        <div>{video.channel}</div>
                        <div>{video.date}</div>
                        </Link>
                    </div>
            })}
        </div>
    )
}