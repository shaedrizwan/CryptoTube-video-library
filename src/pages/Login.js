import "../stylesheets/login.css"
import { useAuth } from "../authContext"

export function Login(){
    const {login,checkAuth} = useAuth();
    let username,password;

    return <>
    <div style={{display:"flex",flexWrap:"row wrap",justifyContent:"center",alignItems:"center"}}>
        <div className="login-card">
            <div>Username</div>
            <input onChange={e => username=e.target.value} type="text"></input>
            <div>Password</div>
            <input onChange={e => password=e.target.value} type="password"></input>
            <div><button onClick={()=>checkAuth(username,password)}>{login?"Logout":"Login"}</button></div>
        </div>
    </div>
    </>
}