import './App.scss'


import Authorizer from './Components/Authorizer/Authorizer'
import TodoPage from './Components/Todo/TodoPage'
import { useAuth } from './Context/AuthContext';
function App() {

	const {data} = useAuth()
	

	return (
		<>
			<div className='bg-img'>
				<h1 >TODO</h1>
			</div>

			<main className='grid-center'>
				{data?<TodoPage />:<Authorizer />}
			</main>
		</>
	)
}

export default App
