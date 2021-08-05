import { FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"
import { database } from "../services/firebase"

import ilunstrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleimgIcon from "../assets/images/google-icon.svg"

import { Button } from "../components/Button/index"

import "../styles/auth.scss"

export function Home(){
    const history = useHistory();
    const { user , signInWithGoogle} = useAuth()
    const[ roomCode, setRoomCode ] = useState('');

    async function handleCreateRoom(){
        if(!user){
          await signInWithGoogle();
        }
        history.push("/rooms/new")
    }
    
    async function handleJoinRoom(event:FormEvent){
        event.preventDefault();
        
        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert(' Room does not exist .')
            return;
        }

        if(roomRef.val().endedAt){
            alert("Room already close")
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }


    return(
        <div id="page-auth">
            
            <aside>
                <img src={ilunstrationImg} alt="sintonizando perguntas e respostas"/>
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p className="textNormal">Tire as duvidas da sua audiencia em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />

                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleimgIcon} alt="google button" />
                        crie sua sala com o google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>

                </div>
            </main>
        </div>
    )
}