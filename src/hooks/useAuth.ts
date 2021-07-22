import { useContext } from "react";
import { AuthContext } from "../contexts/authContexts";

export function useAuth(){
    return useContext(AuthContext)
}