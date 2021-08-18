import {Link} from "react-router-dom";
import '../stylesheets/home-style.css';
import {useVideo} from "../videoContext";
import { CommonLoading } from 'react-loadingg';

export function Home(){
    const {dispatchHistory,videosDB} = useVideo();
    return(
        <div className="video-wrapper">
            {!videosDB && <CommonLoading size="large"/>}
            {videosDB && videosDB.map(video=>{
                return <div className="video-container" onClick={()=>dispatchHistory({type:"addToHistory",payload:video})} key={video._id}>
                        <Link className="video-link-wrapper" to={`/video/${video.slug}`}>
                        <img className="video-img" style={{maxWidth:"350px",height:"fit-content"}} src={video.thumbnail} alt={video.slug}/>
                        <div className="video-title">{video.title}</div>
                        <div className="video-details-container">
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRKlMd8XiIOUXc9DKEjUgt5fFy1OJgYkN9tF90F4w=s68-c-k-c0x00ffffff-no-rj" alt="profile" style={{width:"40px", height:"fit-content", borderRadius:"50%",marginRight:"10px"}}/>
                            <div>
                                <div className="video-channel">{video.channel_name}</div>
                                <div className="video-date">{video.published_date}</div>
                            </div>
                        </div>
                        </Link>
                    </div>
            })}
        </div>
    )
}