import axios from "axios";
import {createContext,useContext, useEffect, useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";

const authContext = createContext();



export function useAuth(){
    return useContext(authContext)
}

export function AuthProvider({children}){

    useEffect(()=>{
        const loginStatus = JSON.parse(localStorage?.getItem("login"));
        loginStatus?.isLogged && setLogin(true);
        loginStatus?.isLogged && setToken(loginStatus.token)
    },[])


    const {state} = useLocation();
    const navigate = useNavigate();

    const [login,setLogin] = useState(false)
    const [token,setToken] = useState(null)

    const loginHandler = async (username,password) =>{
            try{
                const response = await axios.post("https://cryptotube-backend.herokuapp.com/user/login",{username,password})
                if(response.status === 200){
                    setLogin(true)
                    setToken(response.data.token)
                    localStorage?.setItem("login",JSON.stringify({isLogged:true,token:response.data.token}))
                    state!= null?navigate(state.from):navigate("/")
                }
            }
            catch{
                console.log("Invalid Username/Password")
            }
        }

    const logoutHandler = ()=>{
        setLogin(false)
        localStorage?.removeItem("login")
    }

    return (
    <authContext.Provider value={{login,token,loginHandler,logoutHandler}}>
        {children}
    </authContext.Provider>
    )
}