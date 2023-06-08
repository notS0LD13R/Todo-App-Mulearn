import './App.scss'

import {useState} from 'react';

import Authorizer from './Components/Authorizer/Authorizer'
import TodoPage from './Components/Todo/TodoPage'
function App() {

	const [user,setUser]=useState<boolean>(false)

	return (
		<>
			<div className='bg-img'>
				<h1 >TODO</h1>
			</div>

			<main className='grid-center'>
				<button onClick={()=>setUser(!user)} style={{position:'absolute',top:0}}>change</button>
				{user?<TodoPage />:<Authorizer />}
			</main>
		</>
	)
}

export default App
