import {videosDB} from "./videosDB";
import {Link} from "react-router-dom";
import './home.css';

export function Home(){
    return(
        <div class="grid-card">
            {videosDB.data.map(video=>{
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
    )
}