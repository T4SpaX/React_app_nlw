import copyImg from "../../assets/images/copy.svg"

import './style.scss'

type RoomCodeProps = {
    code : string;
}

export function RoomCode(props:RoomCodeProps){
    function copyRoomCodeToClipboard(){
        //API do navegador
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard}> 
            <div>
                <img src={copyImg} alt="Copiar Room Code"></img>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}
