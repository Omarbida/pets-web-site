import { useState } from "react"
import {MapPin} from 'react-feather';
function Card (props){
const [adopt,setAdopt] = useState(false)
    return(
        <div className="card">
          <p className="name">{props.name}</p>
          <div className="img"><img src={props.image}></img></div>
          <div className="card-info">
          <p>type: <span> {props.type}</span> </p>
          <p>race: <span> {props.race}</span> </p>
          <p><MapPin size={17}/> location: <span> {props.location}</span> </p>
          </div>
          <button onClick={()=>{
            setAdopt(true)
          }} type="button"
             disabled={adopt}   
          >{adopt && 'Adopted' || 'Adopt'}</button>
          {  <div className={"notavailble " + (adopt && "active")}>Adopted</div> }       </div>
    )
}
export default Card