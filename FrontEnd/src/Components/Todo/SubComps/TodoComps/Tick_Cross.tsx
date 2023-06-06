import './Tick_Cross.scss'

interface tickProps {
    id:string
}

export function Tick(props:tickProps){
    return(
        <div className="tick">
            <div className="round">
                <input type="checkbox" id={'tick'+props.id} />
                <label  htmlFor={'tick'+props.id}></label>
            </div>
        </div>
    )
}

export function Cross(){
    return(
        <div className="cross"></div>
        
    )
}
