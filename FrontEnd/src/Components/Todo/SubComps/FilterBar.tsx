import './FilterBar.scss'

import React from 'react'

export default function FilterBar() {
  
  const handleRadioChange=(e:React.MouseEvent<HTMLElement>)=>{
    console.log(e.target)
  }
  
  
  return (
    <div className='filterbar'>
      <span>5 Left</span>
      
      <fieldset onClick={handleRadioChange}>
        
        <div>
        <input type="radio" name="filter" id="radioAll" defaultChecked/>
        <label htmlFor="radioAll">All</label>
        </div>

        <div>
        <input type="radio" name="filter" id="radioActive" />
        <label htmlFor="radioActive">Active</label>
        </div>

        <div>
        <input type="radio" name="filter" id="radioCompleted" />
        <label htmlFor="radioCompleted">Completed</label>
        </div>

      </fieldset>

      <button>
        Clear Completed
      </button>
    </div>
  )
}
