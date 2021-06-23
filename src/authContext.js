import {createContext,useContext} from "react";

const authContext = createContext();

export function useAuth(){
    return useContext(authContext)
}

export function AuthProvider({children}){
    const namer = () => console.log("Auth Context working")
    return (
    <authContext.Provider value={{namer}}>
        {children}
    </authContext.Provider>
    )
}