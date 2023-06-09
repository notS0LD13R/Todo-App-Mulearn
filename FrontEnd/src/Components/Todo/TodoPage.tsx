import { useAuth } from '../../Context/AuthContext'
import {useState} from 'react'

import './TodoPage.scss'

import SearchBar from './SubComps/SearchBar'
import TodoList from './SubComps/TodoList'


export default function TodoPage() {
  
  const {todoList,logout} = useAuth()

  return (
    <div className='todopage flex-col'>
        <a onClick={logout}>Logout</a>
        <SearchBar />
        <TodoList todos={todoList??[]} />
    </div>
  )
}
