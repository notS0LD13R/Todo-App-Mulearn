import {useRef,useState} from 'react'

import './Login_SignUp.scss'
import { useAuth } from '../../Context/AuthContext'



interface LoginProps{
  set:React.Dispatch<React.SetStateAction<string>>
}

export default function Login(props:LoginProps) {
  
  const user=useRef<HTMLInputElement>(null)
  const pass=useRef<HTMLInputElement>(null)

  const [status,setStatus] = useState<{msg:string,error:string}|null>(null)

  const {login} = useAuth()
  
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    try {
      if(user.current?.value && pass.current?.value)
      login(user.current?.value,pass.current?.value)
    } catch (error) {
      setStatus({msg:error as string,error:'error'})
    }
  }

  return (
    <div className='loginpage'>
      <h2>LOGIN</h2>
      {status?
      <div className={`status ${status.error}`}>{status.msg}</div> :
      ""
      }
      <form onSubmit={handleSubmit}>
        
        <input type="text" ref={user} placeholder='Username' required/>
        
        <input type="password" ref={pass} placeholder='Password' required/>

        <input type="submit" value="Login" />

      </form>

      <p>
        Need an account?{'  '}
        <a onClick={()=>props.set('signup')} className='a-link'>Signup </a>
        </p>

    </div>
  )
}
