import {useParams} from "react-router-dom";
import { useAuth } from "../authContext";
import '../stylesheets/videodetails.css';
import {useVideo} from "../videoContext";
import axios from "axios";

export function VideoDetails(){
    const {slug} = useParams();
    const {token} = useAuth();

    const {dispatch,videosDB} = useVideo();
    const video = videosDB.find(vid=>vid.slug === slug);

    const updateWatchlater = async(id) =>{
        const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/addToWatchlater',{
            videoId:id
        },{
        headers:{
            Authorization:token
        }
        })
        console.log(response)
    }


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
                <div onClick={()=>updateWatchlater(video._id)} className="attr-items">Watch Later</div>
            </div>
            <div>{video.channel_name}</div>
    
        </div>
        )
}