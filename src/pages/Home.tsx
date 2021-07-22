import { useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

import ilunstrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleimgIcon from "../assets/images/google-icon.svg"

import { Button } from "../components/Button"

import "../styles/auth.scss"

export function Home(){
    const history = useHistory();
    const {signInWithGoogle,user} = useAuth()

   async function handleCreateRoom(){
        if(!user){
          await signInWithGoogle();
        }
        history.push("/rooms/new")
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={ilunstrationImg} alt="sintonizando perguntas e respostas"/>
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleimgIcon} alt="google button" />
                        crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text" 
                            placeholder="digite um nome da sala"
                        />
                        <Button type="submit">
                            entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}