import './TodoList.scss'

import FilterBar from './FilterBar'
import Todo from './TodoComps/Todo'

import { todoProps } from '../../../types/api'

interface TodoListprops{
  todos:Array<todoProps>|[]
}

export default function TodoList({todos}:TodoListprops) {
  
  

  return (
    <div className='todolist flex-col'>
      {todos.map((props,pos)=> < Todo {...props} id={`${pos}`} key={pos}/> )}
      <FilterBar />
    </div>
  )
}
