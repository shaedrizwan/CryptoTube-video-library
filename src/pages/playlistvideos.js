import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useAuth } from "../authContext"
import axios from 'axios'


export  function PlaylistVideos(){
    const {name} = useParams()
    const {token} = useAuth()
    const [playlistVideos,setPlaylistVideos] = useState([])
    
    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                const playlist = response.data.playlist.filter(list=>list.playlistName === name)
                console.log(playlist)
                setPlaylistVideos(playlist.videos)
            }
        })()

    },[name])

    return(
        <div>
            <div>Playlist: {name}</div>
            {!PlaylistVideos && <div>Please wait.. Videos are loading...</div>}
            {PlaylistVideos && playlistVideos.map(list=>{
                return <div key={list._id}>
                    <div>{list.title}</div>
                </div>
            })}
        </div>
    )
}