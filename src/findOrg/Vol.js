import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import '../findOpp/Org.css';
import '../findOpp/FindOpportunities.css'
import BASE_URL from "../config";
export default function Vol(){
    const {id}=useParams();
    const [vol,setVol]=useState([]);
    const [app,setApp]=useState([]);
    const [isopen,setIsOpen]=useState(false);
    const [helpOpp,setHelpOpp]=useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [isSkills,setIsSkills]=useState(false)
    useEffect(()=>{
        axios.get(`${BASE_URL}/api/Volunteer/${id}`).then(result=>{ setVol(result.data)
            localStorage.setItem('vol',JSON.stringify(vol))
        }
        ).catch((error)=>console.log(error))
    },[])
    const getApp= async()=>{
        const response=await axios.get(`${BASE_URL}/api/Volunteer/${vol.volunteerId}/applications`)
    const apps=response.data.applications;
    setIsOpen(!isopen);
    setApp(apps);

    }
    const changeState = async(id) => {
        const response=await axios.get(`${BASE_URL}/api/Opportunity/${id}/applications`)
        const apps=response.data;
        setHelpOpp(apps);
        setExpandedId(prevId => (prevId === id ? null : id));
      }
      const showSkills=()=>{
        setIsSkills(!isSkills)
      }
    return(
        <div className='parent'>
          <div  className='org'>
          <div >
           <div style={{alignItems:'center' ,borderBottom:'1px solid black'}}>
           <h1 >{vol.name}</h1>
           </div>
    
           <div style={{alignItems:'left'}} className="user">
           <h3>Email : {vol.email}</h3>
           <h3>ID: {vol.volunteerId}</h3>
           <h3> Phone: {vol.phone}</h3>
           <h3>Rating : {vol.rating}</h3>
           <h3>Bio : {vol.bio}</h3>
          <div >
          <a className="xxx" onClick={showSkills} style={{cursor:'pointer'}}><h3> Show Skills : <span style={{fontSize:'15px',fontWeight:'lighter'}}>(click to show/hide)</span> </h3></a>
           {
            isSkills===true&&
            ( <p>{vol.skills.map((skills) => { return (<div><ul>{skills.name}</ul></div>) })}</p>)
           }
          </div>
         
           <button  className="donates" onClick={getApp}>All Application</button>
          
           {
            isopen===true && app.map((opp)=>{
                
                    return (
                      <div key={opp.id} className='titleOpp' >
                        <div>
                          <div className='titles'> 
                           </div>
                          <p>ID : {opp.id}</p>
                          <p>organization Id : {opp.organizationId}</p>
                         
                          <p> status: {opp.status}</p>
                          <h5>Date Sent : {opp.dateSent}</h5>
                          <button type='submit' onClick={() => changeState(opp.id)} className='More'>More Details</button>  </div>
                        {expandedId === opp.id && <div className='right'>
                          <h1>ID : {helpOpp.id}</h1>
                          <h5>Description : <p>{helpOpp.description}</p></h5>
                          <h5>Where : <span>{helpOpp.isOnline===true?'OnLine':'OffLine ,will send location'}</span></h5>
                          <h5>DateLine : <p>{helpOpp.deadline}</p></h5>
                    
                        </div>}
    
    
                      </div>
                    )
                  
            })
           }
           </div>
           </div>
          
          </div>
        </div>
    )
}