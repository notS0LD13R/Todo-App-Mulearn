import {ChangeEvent} from 'react'
import { useAuth } from '../../../../Context/AuthContext'
import './Tick_Cross.scss'

interface tickProps {
    id:string
    checked:boolean
}

export function Tick(props:tickProps){
    
    const {updateTodo} = useAuth()

    const handleClick= (e:ChangeEvent<HTMLInputElement>)=>{
        const checked = (e.target as HTMLInputElement).checked

        updateTodo(props.id,checked)
    }
    
    return(
        <div className="tick">
            <div className="round">
                <input type="checkbox" id={props.id} 
                    checked={props.checked}
                    onChange={handleClick} 
                />
                <label  htmlFor={props.id}></label>
            </div>
        </div>
    )
}


export function Cross(props:{id:string}){
    
    const {deleteTodo} = useAuth()
    
    const handleClick= ()=>{
        deleteTodo(props.id)
    }

    
    return(
        <div className="cross" onClick={handleClick}></div>
        
    )
}
