import { useState, useEffect } from 'react'
import './FindOpportunities.css'
import not from '../images/not.jpg'
import def from '../images/default.jpg'
import needed from '../images/needed.jpg'
import hope from '../images/hands.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 
import thank from '../images/thank.png'
import BASE_URL from '../config'

function FindOpportunities() {
  const [volunteer, setVolunteer] = useState(() => {
    const storedVolunteer = localStorage.getItem('volunteer');
    return storedVolunteer ? JSON.parse(storedVolunteer) : null;
});
  const [oppor, setOppor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [originalOpportunities, setOriginalOpportunities] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [appId, setAppId] = useState(null);
  const [IsClick, setIsClick] = useState(false);
  const [settinng,setSettinng]=useState(false);
  const [applications,setApplications]=useState({});
  const [app,setApp]=useState(false);
  const [helpOpp,setHelpOpp]=useState([]);
  const [reviews,setReviews]=useState([]);
  const [appContent,setAppContent]=useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('volunteer');
    navigate('/');
};
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Opportunity/GetAll`);
        setOppor(response.data);
        setOriginalOpportunities(response.data);
        setSearch(response.data); 
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return <div style={{textAlign:"center",color:'red',fontSize:'25px'}}>Loading...</div>;
  }


  const searchData = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    if (searchValue === null) {
      setSearch(originalOpportunities)
    }
    else {
      const filteredOpportunities = oppor.filter(opp =>
        opp.description.toLowerCase().includes(value)
      );

      setSearch(filteredOpportunities);
    }
  }
  const changeState = async(id) => {
    const response=await axios.get(`${BASE_URL}/api/Opportunity/${id}`)
    const apps=response.data;
    setHelpOpp(apps);
    setExpandedId(prevId => (prevId === id ? null : id));
  }
  const isClick = () => {
    setApp(!app);
    setIsClick(!IsClick);
  }
  const update=(id)=>{
     navigate(`/UpdateV/${id}`)
  }
 const deleteAccount= async(id)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete this Account?");
  if (!confirmDelete) {
    console.log('Deletion canceled');
    return; 
  }
   try{
    const  response = await fetch(`${BASE_URL}/api/Account/${id}`, {
      method: 'DELETE', 
  });
   if(response.ok){
    localStorage.removeItem('volunteer');
    console.log('Volunteer deleted successfully');
    navigate('/');
   }else{
    const errorResponse = await response.text(); 
    console.error('Error deleting volunteer:', response.status, errorResponse);
   }
   }catch(error){
    console.error('Network error:', error);
   }
};
const deleteApp= async(id)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete this application?");
  if (!confirmDelete) {
    console.log('Deletion canceled');
    return; 
  }
  try{
   const  response = await fetch(`${BASE_URL}/api/Application/${id}`, {
     method: 'DELETE', 
 });
  if(response.ok){
   console.log('Application deleted successfully');
   setApplications((prevApplications) => 
    prevApplications.filter(app => app.id !== id)
  );
  }else{
   const errorResponse = await response.text(); 
   console.error('Error deleting volunteer:', response.status, errorResponse);
  }
  }catch(error){
   console.error('Network error:', error);
  }
};
const helpPage=async(organizationId,volunteerId,oppId)=>{
  const confirmDelete = window.confirm("Are you sure you want to Help in this opportunity?");
  if (!confirmDelete) {
    console.log('Deletion canceled');
    return; 
  }
  const data={
    "opportunityId":oppId,
    "volunteerId":volunteerId,
    "organizationId":organizationId

  }
    try {
        console.log()
        
        const payload = { opportunityId: data.opportunityId, volunteerId: data.volunteerId,
            organizationId: data.organizationId }; 
       console.log('Payload being sent:', JSON.stringify(payload));
       
        const response = await fetch(`${BASE_URL}/api/Application`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain',
             },
                 body: JSON.stringify(payload),
        });
        
        if (response.ok) {
            const result = await response.text();;
             console.log('Success:', result); 
             window.alert('Thinks for send request')
             navigate('/find-opportunities');

        }
    } catch (error) {
        console.error('Network error:', error);
    }


  
}
const setting=()=>{
   setSettinng(!settinng);
}
const myApplication=async(id)=>{
  try{
    const response=await axios.get(`${BASE_URL}/api/Volunteer/${id}/applications`)
   console.log(response.data);
   const appss=response.data.applications;
   console.log(appss)
    setApplications(appss);
    setIsClick(!isClick);
    setApp(!app);
  }
  catch (error){
    console.error('Error fetching Application:', error);
    setApplications([]);
  }
}
const appcontent=async(id)=>{
  try{
    const response=await axios.get(`${BASE_URL}/api/Application/${id}/details`)
   const ap=response.data.opportunity;
   const apid=response.data.id;
   localStorage.setItem('apps',JSON.stringify(ap))
    const appsFromStorage = JSON.parse(localStorage.getItem('apps'));
    setAppContent(appsFromStorage);
    setAppId(prevId => (prevId === apid ? null : apid));
   
  }
  catch (error){
    console.error('Error fetching Application:', error);
    setApplications([]);
  }
}
const orgPage=(id)=>{
  navigate(`/Org/${id}`)
}
const showReviews=(id)=>{
  axios.get(`${BASE_URL}/api/Application/${id}/reviews`).then(result=>{ 
    localStorage.setItem('review',JSON.stringify(result.data.reviews))
    const reviewsFromStorage = JSON.parse(localStorage.getItem('review'));
    setReviews(reviewsFromStorage);
    setReviewId(prevId => (prevId === id ? null : id));
    

}
).catch((error)=>console.log(error))
}
const deleteReview=async(id)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete this Comment?");
  if (!confirmDelete) {
    console.log('Deletion canceled');
    return; 
  }
  try{
    const  response = await fetch(`${BASE_URL}/api/Review/${id}`, {
      method: 'DELETE', 
  });
   if(response.ok){
    console.log('Review deleted successfully');
    setReviews((setReviews) => 
      setReviews.filter(app => app.id !== id)
   );
   }else{
    const errorResponse = await response.text(); 
    console.error('Error deleting volunteer:', response.status, errorResponse);
   }
   }catch(error){
    console.error('Network error:', error);
   }

}
const newSkills=(id)=>{
  navigate(`/Skills/${id}`)
  console.log(id)

}
  return (
    <div className='volunteerProf'>

      {
        IsClick ? (<div>
          <div className='fixed'><div className="search">
            <input type="text" placeholder="Search By KeyWord" onChange={searchData} />
          </div></div>
          <div>
            {search.length === 0 ? 
            ((<div className='no'> <p >No opportunities found.</p> <img src={not} alt='' /> </div>)) :
              search.map((opp) => {
                return (
                  <div key={opp.id} className='titleOpp' >
                    <div>
                      <div className='titles'> 
                       <h1 ><i className="fa-solid fa-arrow-right"></i> {opp.description}</h1></div>
                      <p>ID : {opp.id}</p>
                      <h5>Flexible Schedule || {opp.isOnline===true?"OnLine":"OffLine"}</h5>
                      <p> organization Name : {opp.organization.name}</p>
                      <p> organization Mission : {opp.organization.mission}</p>
                      <h5>Date Posted : {opp.deadline}</h5>
                      <button type='submit' onClick={() => changeState(opp.id)} className='More'>More Details</button>  </div>
                    {expandedId === opp.id && <div className='right'>
                      <h1>ID:{helpOpp.id}</h1>
                      <h5>Where : <p>{helpOpp.isOnline===true?'OnLine':'OffLine ,will send location'}</p></h5>
                      <h5>DateLine : <p>{helpOpp.deadline}</p></h5>
                      <h5>Required Skills<p>{helpOpp.skills.map((skills) => { return (<div><ul>{skills.id} : {skills.name}</ul></div>) })}</p></h5>
                      <button className='donates' type='submit'onClick={()=>helpPage(opp.organizationId,volunteer.volunteerId,opp.id)} >I Want To Help</button>
                      <button className='donates' onClick={()=>orgPage(opp.organizationId)}> Show Organization Page</button>
                    </div>}


                  </div>
                )
              })}
          </div>
        </div>) : app===true? (<div>
          <h1 style={{textAlign:'center' , paddingTop:"20px"}}>My Application</h1>
             {applications.map((appps)=>{
              return(
                <div  key={appps.id} className="titleOpp">     
               <div className='titles'>
               <i className="fa-solid fa-x" onClick={()=>deleteApp(appps.id)} style={{cursor:'pointer',fontSize:'25px',height:'fit-content',borderRadius:'50%',color:' rgb(0, 113, 93)'}}></i>
        
          <div>   <div style={{display:'flex',flexDirection:'row' ,alignItems:'center' ,}}>
          <div>
          <p > Organization ID : {appps.organizationId}</p>
              <p>Application ID : {appps.id}</p>
              <h5 > Status : {appps.status}</h5>
              <h5>Date Sented : {appps.dateSent}</h5>
          </div>
             <div className='ll' style={{padding:'20px'}}>
             <i className="fa-solid fa-angles-right" onClick={()=>appcontent(appps.id)}></i>
             </div>
          </div>
              <br></br>
              <button className='donates' onClick={()=>showReviews(appps.id)}>comments</button>
              </div>
              
          
              {reviewId === appps.id &&
                ( reviews.length>0 ? (reviews.map((review)=>{
    
                  return(
                   <div className='reviews'>
                     <ul key={review.id}>
                     <li>
                     <h3> comment : <span>{review.comment}</span></h3>
                     <h3> Rating : <span>{review.rating}</span></h3>
                     <h3>date Reviewed : <span>{review.dateReviewed}</span></h3>
                     <button className='donates'onClick={()=>deleteReview(review.id)}>Delete</button>
                     </li>
                    </ul>
                   </div>
                  )
             
                 })):((<div>no Comments</div>)))
             }
              </div>
              {appId === appps.id &&
                (<div className='newRight'>
                  <h3>Opportunity ID:<span>{appContent.id}</span> <h5>posted at : {appContent.datePosted}</h5></h3>
                  <p>description :<span> {appContent.description}</span></p>
                  <p>isOnline :<span>{appContent.isOnline?'OnLine':'OffLine'}</span></p>
                  <p>Deadline : <span>{appContent.deadline}</span></p>
                </div>)
             }
             
                  </div>
              )
             })}
        </div>)
        : (<div className='empty'> <img src={hope} alt='' /> <div> Welcome To Hands Of Hope</div> </div>)
      }
      <div className='User'>
      <div style={{textAlign:'right' ,overflow:'hidden'}}>
      <i className="fa fa-cog" aria-hidden="true" id='setting' onClick={setting} style={{fontSize:'40px'}}></i>
        {settinng && (<div className='a' >
          <a href='#' onClick={()=>update(volunteer.volunteerId)}>Update</a>
          <a href='#' onClick={handleLogout}>Log Out</a>
          <a href='#' onClick={()=>deleteAccount(volunteer.volunteerId)}>Delete this Account</a> 
          <a href='#' onClick={()=>newSkills(volunteer.volunteerId)} >Add Skills</a>       
        </div>)}
      </div>
        <div className='infor' >
          <img className='defPhoto' src={def} alt='image' />
          <h2>{volunteer.name}</h2>
          <p className='p'>{volunteer.email}</p>
          
        </div>
        <div style={{ textAlign: 'left', paddingLeft: '20px' }}>

          <p  >Age :<span> {volunteer.age}</span></p>
          <p>Address :<span> {volunteer.address}</span></p>
          <p>Phone Number : <span> {volunteer.phone}</span></p>
          <p>Bio : <span>{volunteer.bio}</span></p>
          <p>Rating:<span> {volunteer.rating} </span></p>
          <p>My ID :<span> {volunteer.volunteerId}</span></p>
          <p> Skills : <span>{volunteer.skills.map((skills) => { return (<div><ul>  {skills.name}</ul></div>) })}</span></p>
        </div>
        <div className='thank'>
            <img className='thankImage' src={thank} alt=''/>
             <a  href='#' onClick={()=>myApplication(volunteer.volunteerId)} ><i class="fa-solid fa-right-long" style={{ padding: '5px', color: 'rgb(0, 113, 93)', fontSize: "18px" }}></i> My Applications</a>

          </div>
        <div className='opp'>
          <img src={needed} alt='' />
          <a style={{ textAlign: 'left' }} href='#' onClick={isClick}> <i class="fa-solid fa-right-long" style={{ padding: '5px', color: 'rgb(0, 113, 93)', fontSize: "18px" }}></i>Opportunities</a></div>
    
      </div>

    </div>
  )
}
export default FindOpportunities
