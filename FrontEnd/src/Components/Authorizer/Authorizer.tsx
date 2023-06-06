import { useState } from 'react'
import './Authorizer.scss'
import Login from './Login'
import SignUp from './SignUp'


export default function Authorizer() {
  
    const [currPage,setCurrPage]=useState('login')
  
    return (
        <div className="authorizer grid-center">
            {currPage==='login' ? <Login set={setCurrPage}/> : <SignUp set={setCurrPage}/> }
        </div>
    )
}
