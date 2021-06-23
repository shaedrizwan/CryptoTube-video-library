import "../stylesheets/login.css"

export function Login(){
    return <>
    <div style={{display:"flex",flexWrap:"row wrap",justifyContent:"center",alignItems:"center"}}>
        <div className="login-card">
            <div>Username</div>
            <input type="text"></input>
            <div>Password</div>
            <input type="password"></input>
            <div><button>Login</button></div>
        </div>
    </div>
    </>
}