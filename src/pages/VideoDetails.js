import {useParams} from "react-router-dom";
import {videosDB} from "./videosDB";
import './videodetails.css';

export function VideoDetails(){
    const {slug} = useParams();

    const video = videosDB.data.find(vid=>vid.slug === slug);

    return(
        <div className="video-main">
            <iframe src={video.videoUrl}
                frameborder='0'
                allow='autoplay; encrypted-media'
                allowfullscreen
                title='video'
                width="100%"
                height="520px"
            />
            <h2>{video.name}</h2>
            <div className="attr-container">
                <div className="date">{video.date}</div>
                <div className="attr-items">Like</div>
                <div className="attr-items">Wishlist</div>
                <div className="attr-items">Watch Later</div>
            </div>
            <div>{video.channel}</div>
    
        </div>
        )
}