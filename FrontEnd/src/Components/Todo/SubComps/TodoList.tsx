import {useState} from 'react'
import { todoProps } from '../../../types/api'


import './TodoList.scss'

import FilterBar from './FilterBar'
import Todo from './TodoComps/Todo'


interface TodoListprops{
  todos:Array<todoProps>|[]
}

export default function TodoList({todos}:TodoListprops) {
  
  const [filter,setFilter] = useState<'all'|'active'|'completed'>('all')

  return (
    <div className='todolist flex-col'>
      {todos
        .filter(item=>(//complex boolean incoming
          (filter==='all')|| //select all
          (filter==='active' && !item.isCompleted)|| //select notCompleted
          (filter==='completed' && item.isCompleted) //select Completed
        ))
        .map((props,pos)=> < Todo {...props} key={pos}/> )
      }
      <FilterBar setFilter={setFilter}/>
    </div>
  )
}
