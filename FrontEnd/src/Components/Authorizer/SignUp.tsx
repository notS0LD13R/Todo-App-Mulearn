import './Login_SignUp.scss'

interface SignUpProps{
  set:React.Dispatch<React.SetStateAction<string>>
}

export default function SignUp(props:SignUpProps) {
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div className='signuppage'>
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit}>
        
        <input type="text" name="user" id="user" placeholder='Enter Username'/>
        
        <input type="password" name="pass" id="pass" placeholder='Password'/>
        <input type="password" name="pass" id="pass" placeholder='Confirm Password'/>

        <input type="submit" value="SignUp" />

      </form>

      <p>
        Already got an account?{'  '}
        <a onClick={()=>props.set('login')} className='a-link'>Login </a>
        </p>

    </div>
  )
}
