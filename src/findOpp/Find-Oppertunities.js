import { useState, useEffect } from 'react'
import './FindOpportunities.css'
import not from '../images/not.jpg'
import def from '../images/default.jpg'
import needed from '../images/needed.jpg'
import hope from '../images/hope.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 
import thank from '../images/thank.png'

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
  const [IsClick, setIsClick] = useState(false);
  const [settinng,setSettinng]=useState(false);
  const [applications,setApplications]=useState({});
  const [app,setApp]=useState(false);
  const [helpOpp,setHelpOpp]=useState([]);
  const [reviews,setReviews]=useState([]);
  const [reviewsOpen,setReviewsOpen]=useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('volunteer');
    navigate('/');
};
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Opportunity/GetAll');
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
    const response=await axios.get(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Opportunity/${id}`)
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
   try{
    const  response = await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Account/${id}`, {
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
const helpPage=(organizationId,volunteerId,oppId)=>{
  navigate(`/help/${organizationId}/${volunteerId}/${oppId}`)
}
const setting=()=>{
   setSettinng(!settinng);
}
const myApplication=async(id)=>{
  try{
    const response=await axios.get(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Volunteer/${id}/applications`)
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
const orgPage=(id)=>{
  navigate(`/Org/${id}`)
}
const showReviews=(id)=>{
  axios.get(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Application/${id}/reviews`).then(result=>{ 
    localStorage.setItem('review',JSON.stringify(result.data.reviews))
    const reviewsFromStorage = JSON.parse(localStorage.getItem('review'));
    setReviews(reviewsFromStorage);
    setReviewId(prevId => (prevId === id ? null : id));
    

}
).catch((error)=>console.log(error))
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
              <h1 ><i class="fa-solid fa-arrow-right"></i> Organization ID : {appps.organizationId}</h1>
              <button className='donates' onClick={()=>showReviews(appps.id)}>commands</button>
              {reviewId === appps.id &&
                ( reviews.length>0 ? (reviews.map((review)=>{
    
                  return(
                   <div className='reviews'>
                     <ul key={review.id}>
                     <li>
                     <h3> commant : <span>{review.comment}</span></h3>
                     <h3> Rating : <span>{review.rating}</span></h3>
                     <h3>date Reviewed : <span>{review.dateReviewed}</span></h3>
                     </li>
                    </ul>
                   </div>
                  )
             
                 })):((<div>no Commonds</div>)))
             }
              </div>
              <div >
              <p>Volunteer Id (Your) : {appps.volunteerId}</p>
              <p>ID : {appps.id}</p>
                      <h5> Status : {appps.status}</h5>
                      <h5>Date Sented : {appps.dateSent}</h5>
             </div>

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
          <p>Skills :<span> {volunteer.skills}</span></p>
          <p>My ID :<span> {volunteer.volunteerId}</span></p>
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
