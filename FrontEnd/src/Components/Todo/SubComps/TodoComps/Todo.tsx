import { todoProps } from '../../../../types/api'


import './Todo.scss'

import { Tick,Cross } from './Tick_Cross'



export default function Todo(props:todoProps) {
  
  
  return (
    <div className='todo' id={'todo'+props.id}>
      <Tick id={props.id} checked={props.isCompleted}/>
      <span className={`${props.isCompleted?'completed':''}`}>{props.title}</span>
      <Cross id={props.id}/>
    </div>
  )
}
