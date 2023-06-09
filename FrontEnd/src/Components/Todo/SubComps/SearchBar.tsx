import { useRef,FormEvent } from 'react'
import { useAuth } from '../../../Context/AuthContext'
import './SearchBar.scss'


export default function SearchBar() {
  
  const newTodo = useRef<HTMLInputElement>(null)
  const {addTodo} = useAuth()


  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(newTodo.current?.value)
        addTodo(newTodo.current?.value)

  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input type="text" ref={newTodo} placeholder='Enter task and press enter'/>
        <input type="submit" value=""  />
      </form>
    </div>
  )
}
