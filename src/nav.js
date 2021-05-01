import {NavLink} from "react-router-dom";

export function NavAside(){
    const linkStyle = {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        padding: '1rem 0rem 0rem',
        cursor: 'pointer',
        color: "black",
        textDecoration: "none"
      }
    
      const linkStyleActive = {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        padding: '1rem 0rem 0rem',
        cursor: 'pointer',
        color: "red",
        textDecoration: "none"
      }
    return(
        <>
        <img src="/logo.png" width="150px" height="150px" alt="Cryptotube"/>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="/">Home</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="explore">Explore</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="playlist">Playlist</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="watch-later">Watch Later</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="liked-videos">Liked Videos</NavLink>
        <NavLink style={linkStyle} activeStyle={linkStyleActive} to="history">History</NavLink>
      </>
    )
}