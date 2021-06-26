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
    },[])


    const {state} = useLocation();
    const navigate = useNavigate();

    const [login,setLogin] = useState(false)

    const checkAuth = async (username,password) =>{
        if(!login){
            console.log(username,password)
            try{
                const response = await axios.post("https://cryptotube-backend.herokuapp.com/user/login",{username,password})
                if(response.status === 200){
                    setLogin(true)
                    localStorage?.setItem("login",JSON.stringify({isLogged:true}))
                    if(state!= null) navigate(state.from)
                }
            }
            catch{
                console.log("Invalid Username/Password")
            }
        }
        else{
            setLogin(false)
            localStorage?.removeItem("login")
        }
    }

    return (
    <authContext.Provider value={{login,checkAuth}}>
        {children}
    </authContext.Provider>
    )
}