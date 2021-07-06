import {createContext, useContext, useEffect, useReducer,useState} from "react";
import axios from "axios";
const videoContext = createContext();
export function useVideo(){
    return useContext(videoContext);
}

const history = [];


export function VideoProvider({children}){

    const AddVideoToHistory = (state,{type,payload}) =>{
        switch(type){
            case "addToHistory": return [...state,payload];
            case "clearHistory": return state = [];
            default: return state;
        }
    }

    const [videosDB,setVideosDB] = useState([])
    useEffect(()=>{
        (async function(){
            const {data} = await axios.get('https://cryptotube-backend.herokuapp.com/video');
            setVideosDB(data.videos)
        })()
    },[])

    const [state,dispatchHistory] = useReducer(AddVideoToHistory,history);
    return(
        <videoContext.Provider value={{state,dispatchHistory,videosDB}}>
            {children}
        </videoContext.Provider>
    )
}
