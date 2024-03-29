import { createContext, ReactNode} from "react";
import { useState , useEffect } from "react";

import { firebase, auth } from "../services/firebase"

type User={
    id:string
    name:string
    avatar:string
}
  
  type AuthContextType={
    user: User | undefined
    signInWithGoogle:() => Promise<void>
}

type AuthContextProviderProps= {
    children:ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props:AuthContextProviderProps){
    const [user, setUser] = useState<User>();
  
  useEffect(()=>{
    const unSubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        const {displayName, photoURL, uid} = user

        if(!displayName || !photoURL){
          throw new Error("Missing Information from google acount")
        }

        setUser({
          id: uid,
          name:displayName,
          avatar:photoURL
        })
      }
    })

    return () => {
      unSubscribe();
    }
  },[])

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)

      if(result.user){
        const {displayName, photoURL, uid} = result.user

        if(!displayName || !photoURL){
          throw new Error("Missing Information ")
        }

        setUser({
          id: uid,
          name:displayName,
          avatar:photoURL
        })
      }
  }

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}