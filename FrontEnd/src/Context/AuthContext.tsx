import { todoProps } from "../types/api"
import {createContext,useContext,
    useState,
    ReactNode} from 'react'

interface UserData{
    username:string,
    todoList:Array<todoProps>|[]
}

interface AuthContextProps{
    data:UserData|null
    login:(username:string,password:string)=>string,
    register:(username:string,password:string)=>string,
    logout:()=>void


}

const AuthContext=createContext<AuthContextProps|null>(null)


export function useAuth(): AuthContextProps {
    return useContext(AuthContext)!
}

export function AuthProvider({children}:{children:ReactNode}){

    const localStorageFlag=true
    const [data,setData]=useState<UserData|null>(null)

    function login(username:string,password:string):string{
        // console.log('login:',username,password)

        
        if (localStorageFlag){
            let doc=JSON.parse(localStorage.getItem('users') ??'{}')

            if(!doc[username])
                throw "UserNotFound"
            
            doc=doc[username]

            if(doc.password !== password)
                throw "IncorrectPassword"

            delete doc.password
            setData({...doc})
        }

        return "Login Successful"
    }

    function register(username:string,password:string):string{
        // console.log('register:',username,password)
        if (localStorageFlag){
            const doc=JSON.parse(localStorage.getItem('users') ??'{}')

            if(doc[username])
                throw "UserAlreadyExists"
            
            doc[username]={
                username:username,
                password:password,
                todoList:[]
            }

            console.log(doc)
            localStorage.setItem('users',JSON.stringify(doc))
        }


        return "User Registered"
    }    

    function logout(){
        setData(null);
    }
    const value:AuthContextProps={
        data:data,
        login:login,
        register:register,
        logout:logout
    }
    return(
        <>
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        </>
    )
}