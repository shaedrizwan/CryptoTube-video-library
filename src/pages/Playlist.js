import "../stylesheets/history.css";
import { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import axios from "axios";
import "../stylesheets/playlist.css"
import { Link } from "react-router-dom";
import { SemipolarLoading } from "react-loadingg";
import { toast } from "react-toastify";
import {v4 as uuid} from "uuid";

export function Playlist(){
    const {token} = useAuth()
    const [list,setPlaylist] = useState();
    const [newPlaylist,setNewPlaylist] = useState('')

    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                setPlaylist(response.data.playlist);
            }
        })()
    },[token])

    const AddPlaylistPressed = async () =>{
        setPlaylist([...list,{playlistName:newPlaylist,_id:uuid(),videos:[]}])
        toast.success('Playlist added successfully',{
            position:toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        })
        const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/createPlaylist',{
            playlistName:newPlaylist
        },{
            headers:{
                Authorization:token
            }
        })
    }

    const RemovePlaylistPressed = async (playlistName) =>{
        setPlaylist(list.filter(item => item.playlistName !== playlistName))
        toast.success('Playlist removed successfully',{
            position:toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        })
        const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/removePlaylist',{
            playlistName:playlistName
        },{
            headers:{
                Authorization:token
            }
        })
    }


    return(
        <>
        <h2 style={{color:"white"}}>Add new playlist</h2>
        <div className="new-playlist-title">Enter playlist name</div>
        <input onChange={e=>setNewPlaylist(e.target.value)} placeholder="Playlist name" />
        <button onClick={AddPlaylistPressed}>Add</button>

        <h2 style={{color:"white"}}>Playists</h2>
        <div>
            {!list && <SemipolarLoading size="large" color="yellow"/>}
            {list && list.map(item =>{
                return <div className="playlist-card" key={item._id}>
                    <Link className="playlist-link" to={`/playlist/${item.playlistName}`}>
                    <div className="playlist-name">{item.playlistName}</div>
                    <div className="playlist-total-videos">Total videos: {item.videos.length}</div>
                    </Link>
                    <button onClick={()=>RemovePlaylistPressed(item.playlistName)} className="clear-button">Remove</button>
                </div>
            })}
            {list && list.length === 0 && <h1 style={{color:"white",margin:"2rem"}}>No saved playlist</h1>}
        </div>
        </>
    ) 
}