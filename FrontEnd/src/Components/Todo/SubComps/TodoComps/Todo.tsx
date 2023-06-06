import './Todo.scss'

import { Tick,Cross } from './Tick_Cross'
import { todoProps } from '../../../../types/api'

interface TodoProps extends todoProps{
  id:string
}

export default function Todo(props:TodoProps) {
  return (
    <div className='todo' id={'todo'+props.id}>
      <Tick id={props.id}/>
      <span>{props.task}</span>
      <Cross />
    </div>
  )
}
