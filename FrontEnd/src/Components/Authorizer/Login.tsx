import './Login_SignUp.scss'

import React from 'react'

interface LoginProps{
  set:React.Dispatch<React.SetStateAction<string>>
}

export default function Login(props:LoginProps) {
  
  
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div className='loginpage'>
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        
        <input type="text" name="user" id="user" placeholder='Username'/>
        
        <input type="password" name="pass" id="pass" placeholder='Password'/>

        <input type="submit" value="Login" />

      </form>

      <p>
        Need an account?{'  '}
        <a onClick={()=>props.set('signup')} className='a-link'>Signup </a>
        </p>

    </div>
  )
}
