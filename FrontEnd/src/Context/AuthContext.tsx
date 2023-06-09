import { todoProps } from "../types/api"
import {createContext,useContext,
    useState,
    // useRef,
    useCallback,
    ReactNode} from 'react'

interface UserData{
    username:string|null,
    todoList:Array<todoProps>|[]
}

interface AuthContextProps extends UserData{
    login:(username:string,password:string)=>Promise<string>,
    register:(username:string,password:string)=>Promise<string>,
    logout:()=>void,
    getTodo:()=>void,
    addTodo:(title:string)=>void,
    updateTodo:(id:string,isCompleted:boolean)=>void,
    deleteTodo:(id:string,clearCompleted?:boolean)=>void
}

const AuthContext=createContext<AuthContextProps|null>(null)


function jsonToEncode(json:object){
    return new URLSearchParams(Object.entries(json)).toString()
}

export function useAuth(): AuthContextProps {
    return useContext(AuthContext)!
}

export function AuthProvider({children}:{children:ReactNode}){

    const localStorageFlag=false
    const [user,setUser]=useState<string|null>(null)
    const [todoList,setTodoList]=useState<Array<todoProps>|[]>([])

    const apiRoute='https://mulearn-internship-task-production.up.railway.app/api/'
    const [access,setAccess]=useState('')
    
    async function login(username:string,password:string):Promise<string>{
        if (localStorageFlag ){
            let doc=JSON.parse(localStorage.getItem('users') ??'{}')

            if(!doc[username])
                throw "UserNotFoundatLogin"
            
            doc=doc[username]

            if(doc.password !== password)
                throw "IncorrectPassword"

            setUser(username)
        }
        else{
            const data = await fetch(apiRoute+'login/',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body:jsonToEncode({
                    username:username,
                    password:password
                })
            })

            const res = await data.json()
            if(!data.ok)
                throw "InvalidCredentials"
            
            setAccess(res.access)
            setUser(username)
        }

        return "Login Successful"
    }

    async function register(username:string,password:string):Promise<string>{
        if (localStorageFlag ){
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
        else{
            
            const res = await fetch(apiRoute+'register/',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body:jsonToEncode({
                    username:username,
                    password:password
                })
            })

            if(!res.ok)
                throw res.statusText
        }


        return "User Registered"
    }    

    function logout(){
        setUser(null);
    }

    const getTodo= useCallback(async ()=>{

        if (localStorageFlag ){
            if(!user)
                throw "UserNotFoundatgetTodo"
            const doc=JSON.parse(localStorage.getItem('users') ??'{}')[user!]
            setTodoList(doc['todoList'])
        }
        else{
            try{
                const data = await fetch(apiRoute+'todo/',{
                    method:'GET',
                    headers: {
                        'Authorization':`Bearer ${access}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
    
                      },
                })
    
                const res= await data.json()
                setTodoList(res)
            }
            catch (err){
                console.log(err)
                setTodoList([])
            }
        } 
    },[localStorageFlag,user])
    
    async function addTodo(title:string){
        
        if (localStorageFlag ){
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
        else{
            try{
                const data = await fetch(apiRoute+'todo/',{
                    method:'POST',
                    headers: {
                        'Authorization':`Bearer ${access}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                    body:jsonToEncode({title:title})
                })
    
                const res= await data.json()
                setTodoList(todoList.concat(res))
            }
            catch (err){
                console.log(err)
            }
        }
    }

    async function updateTodo(id:string,isCompleted:boolean){
        
        if(localStorageFlag ){
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
        else{
            try{
                const data = await fetch(apiRoute+`todo/${id}/`,{
                    method:'PUT',
                    headers: {
                        'Authorization':`Bearer ${access}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                })
    
                const res:todoProps= await data.json()
                setTodoList(todoList.filter(item=>item.id!==res.id).concat(res))
            }
            catch (err){
                console.log(err)
            }
        }
    }

    async function deleteTodo(id:string,clearCompleted=false){
        if(localStorageFlag){
            if(!user)
                throw "UserNotFound"

            const doc=JSON.parse(localStorage.getItem('users') ??'{}')
            
            //searching obj with correct index and deleting 
            if(clearCompleted){
                doc[user!]['todoList']=
                doc[user!]['todoList'].filter((item:todoProps)=>!item.isCompleted)
            }
            else{doc[user!]['todoList'].splice( 
                doc[user!]['todoList'].findIndex((obj:todoProps) => obj.id===id)
            ,1)}

            setTodoList(doc[user!]['todoList'])
            localStorage.setItem('users',JSON.stringify(doc))
        }
        else{
            try{
                if(clearCompleted){
                    todoList.forEach( async (item)=>{
                        if(!item.isCompleted) return
                        
                        await fetch(apiRoute+`todo/${item.id}/`,{
                            method:'DELETE',
                            headers: {
                                'Authorization':`Bearer ${access}`,
                                'Content-Type': 'application/x-www-form-urlencoded'
                              },
                        })
                        
                    })
                    setTodoList(todoList.filter(item=>!item.isCompleted))
                }else{
                    await fetch(apiRoute+`todo/${id}/`,{
                        method:'DELETE',
                        headers: {
                            'Authorization':`Bearer ${access}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                          },
                    })
        
                    setTodoList(todoList.filter(item=>item.id!==id))
                }
            }
            catch (err){
                console.log(err)
            }
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