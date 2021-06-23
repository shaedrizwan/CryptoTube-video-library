import {useParams} from "react-router-dom";
import '../stylesheets/videodetails.css';
import {useVideo} from "../videoContext";

export function VideoDetails(){
    const {slug} = useParams();

    const {dispatch,videosDB} = useVideo();
    const video = videosDB.find(vid=>vid.slug === slug);

    return(
        <div className="video-main">
            <iframe src={video.youtube_url}
                className="video-iframe"
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
            />
            <h2>{video.title}</h2>
            <div className="attr-container">
                <div className="date">{video.published_date}</div>
                <div onClick={()=>dispatch({type:"addToLiked",payload:video})} className="attr-items">Like</div>
                {/* <div onClick={()=>dispatch({type:"addToPlaylist",payload:video})} className="attr-items">Playlist</div> */}
                <div onClick={()=>dispatch({type:"addToWatchLater",payload:video})} className="attr-items">Watch Later</div>
            </div>
            <div>{video.channel_name}</div>
    
        </div>
        )
}