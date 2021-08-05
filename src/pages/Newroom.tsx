import { FormEvent,useState } from "react"
import {Link, useHistory} from "react-router-dom"
//import { useAuth } from "../hooks/useAuth"

import { database } from "../services/firebase"
import { useAuth } from "../hooks/useAuth"

import ilunstrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"

import { Button } from "../components/Button/index"

import "../styles/auth.scss"

export function Newroom(){
    const {user} = useAuth()
    const[newRoom, setNewRoom] = useState("");
    const history = useHistory();
    //função de Criação de uma nova Sala
    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        }
        const roomRef = database.ref("rooms");

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })        
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }
    
    return(
        <div id="page-auth">
            <aside>
                <img src={ilunstrationImg} 
                    alt="sintonizando perguntas e respostas"
                />
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p className="textNormal">Tire as duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                    <h2>Criar uma nova sala</h2>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p className="textReturn">
                        Quer entrar em uma sala existente 
                        <Link to="/">clique aqui</Link>                 
                    </p>
                </div>
            </main>
        </div>
    )
}