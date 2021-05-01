import {useParams} from "react-router-dom";
import {videosDB} from "./videosDB";
import '../stylesheets/videodetails.css';
import {useVideo} from "../videoContext";

export function VideoDetails(){
    const {slug} = useParams();

    const video = videosDB.data.find(vid=>vid.slug === slug);
    const {dispatch} = useVideo();

    return(
        <div className="video-main">
            <iframe src={video.videoUrl}
                className="video-iframe"
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
            />
            <h2>{video.name}</h2>
            <div className="attr-container">
                <div className="date">{video.date}</div>
                <div onClick={()=>dispatch({type:"addToLiked",payload:video})} className="attr-items">Like</div>
                {/* <div onClick={()=>dispatch({type:"addToPlaylist",payload:video})} className="attr-items">Playlist</div> */}
                <div onClick={()=>dispatch({type:"addToWatchLater",payload:video})} className="attr-items">Watch Later</div>
            </div>
            <div>{video.channel}</div>
    
        </div>
        )
}