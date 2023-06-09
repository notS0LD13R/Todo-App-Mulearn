import { todoProps } from "../types/api"
import {createContext,useContext,
    useState,
    useCallback,
    ReactNode} from 'react'

interface UserData{
    username:string|null,
    todoList:Array<todoProps>|[]
}

interface AuthContextProps extends UserData{
    login:(username:string,password:string)=>string,
    register:(username:string,password:string)=>string,
    logout:()=>void,
    getTodo:()=>void,
    addTodo:(title:string)=>void,
    updateTodo:(id:string,isCompleted:boolean)=>void,
    deleteTodo:(id:string)=>void
}

const AuthContext=createContext<AuthContextProps|null>(null)


export function useAuth(): AuthContextProps {
    return useContext(AuthContext)!
}

export function AuthProvider({children}:{children:ReactNode}){

    const localStorageFlag=true
    const [user,setUser]=useState<string|null>(null)
    const [todoList,setTodoList]=useState<Array<todoProps>|[]>([])

    
    function login(username:string,password:string):string{
        // console.log('login:',username,password)
        if (localStorageFlag){
            let doc=JSON.parse(localStorage.getItem('users') ??'{}')

            if(!doc[username])
                throw "UserNotFoundatLogin"
            
            doc=doc[username]

            if(doc.password !== password)
                throw "IncorrectPassword"

            setUser(username)
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

            localStorage.setItem('users',JSON.stringify(doc))
        }


        return "User Registered"
    }    

    function logout(){
        setUser(null);
    }

    const getTodo= useCallback(()=>{

        if (localStorageFlag){
            if(!user)
                throw "UserNotFoundatgetTodo"
            const doc=JSON.parse(localStorage.getItem('users') ??'{}')[user!]
            console.log(doc['todoList'])
            setTodoList(doc['todoList'])
        } 
    },[localStorageFlag,user])
    
    function addTodo(title:string){
        
        if (localStorageFlag){
            if(!user)
                throw "UserNotFound"

            const newTodo:todoProps= {
                id:`${title}${~~(Math.random()*100)}`,
                title:title,
                isCompleted:false,
                created:new Date(),
                updated:new Date(),
                host:1
            }
            const doc=JSON.parse(localStorage.getItem('users') ??'{}')
            doc[user!]['todoList'].push(newTodo)
            setTodoList(doc[user!]['todoList'])
            localStorage.setItem('users',JSON.stringify(doc))
        }
    }

    function updateTodo(id:string,isCompleted:boolean){
        
        if(localStorageFlag){
            if(!user)
                throw "UserNotFound"

            const doc=JSON.parse(localStorage.getItem('users') ??'{}')
            
            //searching obj with correct index and 
            //updating isCompleted
            doc[user!]['todoList'][ 
                doc[user!]['todoList'].findIndex((obj:todoProps) => obj.id===id)
            ].isCompleted=isCompleted

            setTodoList(doc[user!]['todoList'])
            localStorage.setItem('users',JSON.stringify(doc))
        }
    }

    function deleteTodo(id:string){
        if(localStorageFlag){
            if(!user)
                throw "UserNotFound"

            const doc=JSON.parse(localStorage.getItem('users') ??'{}')
            
            //searching obj with correct index and deleting 
            doc[user!]['todoList'].splice( 
                doc[user!]['todoList'].findIndex((obj:todoProps) => obj.id===id)
            ,1)

            setTodoList(doc[user!]['todoList'])
            localStorage.setItem('users',JSON.stringify(doc))
        }
    }


    const value:AuthContextProps={
        username:user,
        todoList:todoList,
        login:login,
        register:register,
        logout:logout,
        getTodo:getTodo,
        addTodo:addTodo,
        updateTodo:updateTodo,
        deleteTodo:deleteTodo
    }
    return(
        <>
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        </>
    )
}