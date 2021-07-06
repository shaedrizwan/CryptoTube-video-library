import {createContext, useContext, useEffect, useReducer,useState} from "react";
import axios from "axios";
import { useAuth } from "./authContext";
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


export function VideoProvider({children}){
    const {token} = useAuth();



    const AddVideo = async (state,{type,payload}) =>{
        switch(type){
            case "addToHistory": return {...state,history:state.history.concat(payload)};
            case "addToLiked": return {...state,likedVideos:state.likedVideos.concat(payload)};
            case "addToWatchlater": return await axios.post('https://cryptotube-backend.herokuapp.com/user/addToWatchlater',{
                        videoId:payload
                    },{
                    headers:{
                        Authorization:token
                    }
                    })
            default: console.log("Error in adding to the list");
        }
        return state;
    }




    const [videosDB,setVideosDB] = useState([])
    useEffect(()=>{
        (async function(){
            const {data} = await axios.get('https://cryptotube-backend.herokuapp.com/video');
            setVideosDB(data.videos)
        })()
    },[])

    const [state,dispatch] = useReducer(AddVideo,videoData);
    return(
        <videoContext.Provider value={{state,dispatch,videosDB}}>
            {children}
        </videoContext.Provider>
    )
}
