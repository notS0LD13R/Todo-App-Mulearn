import './TodoPage.scss'
import SearchBar from './SubComps/SearchBar'
import TodoList from './SubComps/TodoList'


export default function TodoPage() {
  return (
    <div className='todopage flex-col'>
        <SearchBar />
        <TodoList todos={[{task:'Make'},{task:'the'},{task:'code'}]}/>
            
    </div>
  )
}
