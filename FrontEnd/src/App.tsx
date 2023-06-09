import {useEffect} from 'react'
import './App.scss'

import Authorizer from './Components/Authorizer/Authorizer'
import TodoPage from './Components/Todo/TodoPage'
import { useAuth } from './Context/AuthContext';
function App() {

	const {username,getTodo} = useAuth()
	
	useEffect(()=>{if(username)getTodo()},[username,getTodo])

	return (
		<>
			<div className='bg-img'>
				<h1 >TODO APP</h1>
			</div>

			<main className='grid-center'>
				{username?<TodoPage />:<Authorizer />}
			</main>
		</>
	)
}

export default App
