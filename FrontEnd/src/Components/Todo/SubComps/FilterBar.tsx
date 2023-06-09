import { useAuth } from '../../../Context/AuthContext'
import './FilterBar.scss'


export default function FilterBar({setFilter}:{setFilter:React.Dispatch<React.SetStateAction<"all" | "active" | "completed">>}) {
  
  const {deleteTodo} = useAuth()

  



  return (
    <div className='filterbar'>
      <span>5 Left</span>
      
      <fieldset >
        
        <div>
        <input type="radio" name="filter" id="radioAll" defaultChecked/>
        <label htmlFor="radioAll" onClick={()=>setFilter('all')}>
          All
        </label>
        </div>

        <div>
        <input type="radio" name="filter" id="radioActive" />
        <label htmlFor="radioActive" onClick={()=>setFilter('active')}>
          Active
        </label>
        </div>

        <div>
        <input type="radio" name="filter" id="radioCompleted" />
        <label htmlFor="radioCompleted" onClick={()=>setFilter('completed')}>
          Completed
        </label>
        </div>

      </fieldset>

      <button onClick={()=>deleteTodo("placeholderid",true)}>
        Clear Completed
      </button>
    </div>
  )
}
