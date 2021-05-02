import {useVideo} from "../videoContext";
import {Link} from "react-router-dom";
import "../stylesheets/history.css";

export function Playlist(){
    const {state} = useVideo();
    console.log(state.playlist)
    return(
        <>
        <h2>This is Playlist Page</h2>
        <div>
            {Object.keys(state.playlist)}
            {/* {state.playlist.map(list=>{
                <h2>{list}</h2>
            })} */}
        </div>
        </>
    ) 
}