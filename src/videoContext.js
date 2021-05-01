import {createContext, useContext, useReducer} from "react";

const videoContext = createContext();

export function useVideo(){
    return useContext(videoContext);
}

const videoData = {
    likedVideos:[],
    history:[],
    watchLater:[]
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
    const [state,dispatch] = useReducer(addVideo,videoData);
    return(
        <videoContext.Provider value={{state,dispatch}}>
            {children}
        </videoContext.Provider>
    )
}
