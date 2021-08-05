import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestions = Record<string, {
  author : {
      name: string;
      avatar: string;
  }
  content: string;
  isAnswered : boolean;
  isHighlighted: boolean;
  likes: Record<string,{authorId:string;}>;
}>

type QuestionType = {
  id: string;
  author : {
      name: string;
      avatar: string;
  }
  content: string;
  isAnswered : boolean;
  isHighLighted: boolean;
  likeCount:number;
  likeId: string | undefined;
}


export function useRoom(roomId: String){
  const {user} = useAuth();
  const [ questions, setQuestions ] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')
  
  //Recurso De criação de perguntas
  useEffect(() => {
    console.log(roomId)
    const roomRef = database.ref(`rooms/${roomId}`);

    //Recurso de observação e atualizações de Dados.
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
          ([key, value]) =>{
          return{
              id:key,
              content: value.content,
              author: value.author,
              isHighLighted: value.isHighlighted,
              isAnswered:value.isAnswered,
              likeCount:Object.values(value.likes ?? {}).length,
              likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
          }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () =>{
      roomRef.off('value')
    }
  } , [roomId, user?.id])//fim do recurso

  return {questions, title}
}