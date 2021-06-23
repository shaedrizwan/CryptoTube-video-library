import {createContext, useContext, useEffect, useReducer,useState} from "react";
import axios from "axios";
const videoContext = createContext();

export function useVideo(){
    return useContext(videoContext);
}

const videoData = {
    likedVideos:[],
    history:[],
    watchLater:[],
    playlist:{
        myPlaylist:[]
    }
}
const addVideo = (state,{type,payload}) =>{
    switch(type){
        case "addToHistory": return {...state,history:state.history.concat(payload)};
        case "addToLiked": return {...state,likedVideos:state.likedVideos.concat(payload)};
        case "addToWatchLater": return {...state,watchLater:state.watchLater.concat(payload)};
        default: console.log("Error in adding to the list");
    }
    return state;
}


export function VideoProvider({children}){

    const [videosDB,setVideosDB] = useState([])
    useEffect(()=>{
        (async function(){
            const {data} = await axios.get('https://cryptotube-backend.herokuapp.com/video');
            setVideosDB(data.videos)
        })()
    },[])

    const [state,dispatch] = useReducer(addVideo,videoData);
    return(
        <videoContext.Provider value={{state,dispatch,videosDB}}>
            {children}
        </videoContext.Provider>
    )
}
