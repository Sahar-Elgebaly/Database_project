import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './Org.css';
import './FindOpportunities.css'
export default function Org(){
    const {id}=useParams();
    const [org,setOrg]=useState([]);
    const [opp,setOpp]=useState([]);
    const [isopen,setIsOpen]=useState(false);
    const [helpOpp,setHelpOpp]=useState([]);
    const [expandedId, setExpandedId] = useState(null);
    useEffect(()=>{
        axios.get(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Organization/${id}`).then(result=>{ setOrg(result.data)
            localStorage.setItem('org',JSON.stringify(org))
        }
        ).catch((error)=>console.log(error))
    },[])
    const getOpp= async()=>{
        const response=await axios.get(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Organization/${org.organizationId}/opportunities`)
    const apps=response.data.opportunities;
    setIsOpen(!isopen);
    setOpp(apps);

    }
    const changeState = async(id) => {
        const response=await axios.get(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Opportunity/${id}`)
        const apps=response.data;
        setHelpOpp(apps);
        setExpandedId(prevId => (prevId === id ? null : id));
      }
    return(
        <div className='parent'>
          <div  className='org'>
          <div >
           <div style={{alignItems:'center' ,borderBottom:'1px solid black'}}>
           <h1><img src={org.photo}/></h1>
           <h1 >{org.name}</h1>
           </div>
    
           <div style={{alignItems:'left'}} className="user">
           <h3>Email : {org.email}</h3>
           <h3>ID: {org.organizationId}</h3>
           <h3> mission: {org.mission}</h3>
           <h3>Phone : {org.phone}</h3>
           <button className="donates" onClick={getOpp}>All Oppurtunity</button>
           {
            isopen===true && opp.map((opp)=>{
                
                    return (
                      <div key={opp.id} className='titleOpp' >
                        <div>
                          <div className='titles'> 
                           <h1 ><i class="fa-solid fa-arrow-right"></i> {opp.description}</h1></div>
                          <p>ID : {opp.id}</p>
                          <h5>Flexible Schedule || {opp.isOnline===true?"OnLine":"OffLine"}</h5>
                          <p> organization id : {opp.organizationId}</p>
                          <h5>Date Posted : {opp.deadline}</h5>
                          <button type='submit' onClick={() => changeState(opp.id)} className='More'>More Details</button>  </div>
                        {expandedId === opp.id && <div className='right'>
                          <h1>ID:{helpOpp.id}</h1>
                          <h5>Cause Area <p>{opp.category}</p></h5>
                          <h5>Where : <p>{helpOpp.isOnline===true?'OnLine':'OffLine ,will send location'}</p></h5>
                          <h5>DateLine : <p>{helpOpp.deadline}</p></h5>
                          <h5>Required Skills<p>{helpOpp.skills.map((skills) => { return (<div><ul>{skills.id} : {skills.name}</ul></div>) })}</p></h5>
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