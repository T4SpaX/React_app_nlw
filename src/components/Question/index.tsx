import {ReactNode} from 'react'
import cx from 'classnames'
import "./style.scss"

type QuestionProps = {
  content:string;
  author:{
    name:string;
    avatar:string;
  }
  children?: ReactNode;
  isHighLighted?:boolean;
  isAnswered?:boolean;
}

export function Question({
  content,
  author,
  children,
  isHighLighted = false,
  isAnswered = false
}:QuestionProps){
  return (
    <div className={cx(
      'question',
      { answered:isAnswered },
      { hightlighted: isHighLighted && !isAnswered }
    )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}