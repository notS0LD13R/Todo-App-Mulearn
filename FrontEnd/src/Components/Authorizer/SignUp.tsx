import { useRef, useState } from 'react'

import './Login_SignUp.scss'

import { useAuth } from '../../Context/AuthContext'


interface SignUpProps{
  set:React.Dispatch<React.SetStateAction<string>>
}

export default function SignUp(props:SignUpProps) {

  const user=useRef<HTMLInputElement>(null)
  const pass=useRef<HTMLInputElement>(null)
  const confpass=useRef<HTMLInputElement>(null)

  const [status,setStatus] = useState<{msg:string,error:string}|null>(null)

  const {register} = useAuth()


  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    if( pass.current?.value === confpass.current?.value 
      && user.current?.value 
      && pass.current?.value 
    ){
      setStatus({msg:'User Registered',error:""})
      
      try{
        register(user.current?.value,pass.current?.value)
      }
      catch(err){
        setStatus({msg:err as string,error:'error'})
      }
    }
    else{
      setStatus({msg:'Passwords Not Same',error:"error"})
    }

  }

  return (
    <div className='signuppage'>
      <h2>SIGN UP</h2>
      {status?
      <div className={`status ${status.error}`}>{status.msg}</div> :
      ""
      }
      
      <form onSubmit={handleSubmit}>
        
        <input type="text" ref={user} placeholder='Enter Username'/>
        
        <input type="password" ref={pass} placeholder='Password'/>
        <input type="password" ref={confpass} placeholder='Confirm Password'/>

        <input type="submit" value="SignUp" />

      </form>

      <p>
        Already got an account?{'  '}
        <a onClick={()=>props.set('login')} className='a-link'>Login </a>
        </p>

    </div>
  )
}
