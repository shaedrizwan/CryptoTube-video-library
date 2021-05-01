import {createContext, useContext} from "react";

const videoContext = createContext();

export function useVideo(){
    return useContext(videoContext);
}

export function VideoProvider({children}){
    return(
        <videoContext.Provider value={videoData}>
            {children}
        </videoContext.Provider>
    )
}

const videoData = {
    likedVideos:[],
    history:[],
    watchLater:[]
}