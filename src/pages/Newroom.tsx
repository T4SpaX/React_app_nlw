import {Link} from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

import ilunstrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"

import { Button } from "../components/Button"

import "../styles/auth.scss"

export function Newroom(){
    const {user} = useAuth()

    return(
        <div id="page-auth">
            <aside>
                <img src={ilunstrationImg} 
                    alt="sintonizando perguntas e respostas"
                />
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text" 
                            placeholder="nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente 
                        <Link to="/">clique aqui</Link>                 
                    </p>
                </div>
            </main>
        </div>
    )
}