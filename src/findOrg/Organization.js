import { useState, useEffect } from "react"
import "./Organization.css"
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import hope from '../images/hope.png'
import axios from "axios";

export default function SideeBar() {
  const [organization, setOrganization] = useState(null);
  const [settinng, setSettinng] = useState(false);
  const [volunteersTable, setVolunteersTable] = useState(false);
  const [opportuniteTable, setOpportuniteTable] = useState(false);
  const [isNewOpp,setIsNewOpp]=useState(false);
  const navigate = useNavigate();
  const [applications,setApplications]=useState([]);
  const [Opportunite,setOpportunite]=useState([]);
  const columnsOpp=[
    {
      name: "ID",
      selector: row => row.ID,
      sortable: true,
 
    },
    {
      name: "description",
      selector: row => row.description,
      sortable: true,
  
    },
    {
      name: "isOnline",
      selector: row => row.isOnline,
      sortable: true,

      
    },
    {
      name: "datePosted",
      selector: row => row.datePosted,
      sortable: true,

    }
    ,
    {
      name: "deadline",
      selector: row => row.deadline,
      sortable: true,

    },
    {
      name: "Action",
      selector: row=>row.action,
      sortable: true,

    },


  ]
  const columnsVol = [
    {
      name: "ID",
      selector: row => row.ID,
      sortable: true,
      width:"80px",
    },
    {
      name: "opportunityId",
      selector: row => row.opportunityId,
      sortable: true,
      width:"100px",
    },
    {
      name: "volunteerId",
      selector: row => row.volunteerId,
      sortable: true,
    },
    {
      name: "status",
      selector: row => row.status,
      sortable: true,
      width:"100px",
    },
    {
      name: "dateSent",
      selector: row => row.dateSent,
      sortable: true,
      width:"200px",
    },
    {
      name: "Action",
      selector: row=>row.action,
      
      sortable: true,
    },

  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#00715D',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
      },
    },
    footer: {
      style: {
        backgroundColor: '#3f51b5',
        color: '#fff',
        fontSize: '16px',
      },
    },
  }
  useEffect(() => {
    const orgData = localStorage.getItem('organization');
    if (orgData) {
      setOrganization(JSON.parse(orgData));
    }
  }, []);
  const setting = () => {
    setSettinng(!settinng);
  }
  const update = (id) => {
    navigate(`/UpdateO/${id}`)
  }
  const handleLogout = () => {
    localStorage.removeItem('organization');
    navigate('/');
  };
  const deleteAccount = async (id) => {
    try {
      const response = await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Account/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        localStorage.removeItem('organization');
        console.log('Organization deleted successfully');
        navigate('/');
      } else {
        const errorResponse = await response.text();
        console.error('Error deleting Organization:', response.status, errorResponse);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  const isVolunteer = async(id) => {
    const response=await axios.get(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Organization/${id}/applications`)
    console.log(response.data);
    const apps=response.data.applications;
    console.log(apps);
    setApplications(apps);
    setOpportuniteTable(false);
    setVolunteersTable(!volunteersTable);
  }
  const acceptVolunteer= async(id)=>{
     try{
       
       const payload = { id: id,status: 'approved' };
      const response= await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Application/${id}`,
        {method:'PUT',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(payload),
        }
      );
      console.log(response.data)
      if(response.ok){
        console.log('updated successfully')
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === id ? { ...app, status: 'approved' } : app
          )
        );
      }
     }catch(error){
      console.log('Network error:', error)
     }
  

  }
  const deleteVolunteer = async(id)=>{
   try{
    const response= await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Application/${id}`,
      {method:'DELETE'}
    );
    console.log(response.data)
    if(response.ok){
      console.log('Deleted successfully')
      setApplications((prevApplications) => 
        prevApplications.filter(app => app.id !== id)
      );
    }
   }catch(error){
    console.log('Network error:', error)
   }

  }
  const isOppurtunity=async(id)=>{
    const response=await axios.get(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Organization/${id}/opportunities`)
    const apps=response.data.opportunities;
    setOpportunite(apps);
    setOpportuniteTable(!opportuniteTable);
    setVolunteersTable(false);
    console.log(apps)
  
  }
  const newOpp=(id)=>{
    navigate(`/AddNew/${id}`)
 
  }
  const deleteOpp=async(id)=>{
    try{
      const response= await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Opportunity/${id}`,
        {method:'DELETE'}
      );
      console.log(response.data)
      if(response.ok){
        console.log('Deleted successfully')
        setOpportunite((prevOpportunite) => 
          prevOpportunite.filter(app => app.id !== id)
        );
      }
     }catch(error){
      console.log('Network error:', error)
     }
  }
  const updateOpp=(id)=>{
    navigate(`/UpdateOpp/${id}/${organization.organizationId}`)
  }
  const addReview=(appId,vId)=>{
     const orgId=organization.organizationId;
    navigate(`/ReviewOpp/${appId}/${vId}/${orgId}`);
  }
  return (
    <div className="orgPadge">
    
        {volunteersTable === true ? (<div className="containerTa">
          <DataTable
            columns={columnsVol}
            data={applications.map((apps)=>(
              {
                ID:apps.id,
                opportunityId:apps.opportunityId,
                volunteerId:apps.volunteerId,
                dateSent:apps.dateSent,
                status:apps.status,
                action:<div>
                <button className="AccButton" onClick={()=>acceptVolunteer(apps.id)}>Accept</button>
                <button className="DelButton" onClick={()=>deleteVolunteer(apps.id)}>Delete</button>
              <button className="AccButton" onClick={()=>addReview(apps.id,apps.volunteerId)}>Review</button>
           
              </div>
              }
            ))}
            defaultSortField="name"
            defaultSortDesc={false}
            selectableRows
            fixedHeader={true}
            pagination
            highlightOnHover={true}
            striped
            responsive={true}
            customStyles={customStyles}

          ></DataTable>

        </div>)
          : isOppurtunity?(<div className="containerTa">
             <DataTable
            columns={columnsOpp}
            data={Opportunite.map((opp)=>(
              {
                ID:opp.id,
                description:opp.description,
                isOnline:opp.isOnline? 'Yes' : 'No',
                datePosted:opp.datePosted,
                deadline:opp.deadline,
             
                action:<div>
                <button className="AccButton" onClick={()=>updateOpp(opp.id)} >update</button>
                <button className="DelButton" onClick={()=>deleteOpp(opp.id)} >Delete</button>
                </div>
              }
            ))}
            defaultSortField="name"
            defaultSortDesc={false}
            selectableRows
            fixedHeader={true}
            pagination
            highlightOnHover={true}
            striped
            responsive={true}
            customStyles={customStyles}

          > </DataTable>
          </div>):(<div className='empty'> <img src={hope} alt='' /> <div> Welcome To Hands Of Hope</div> </div>)}
     
     
        {organization !== null ? (<div className="sideBarOrg">
          <i className="fa fa-cog" aria-hidden="true" id='setting' onClick={setting} style={{ fontSize: '40px' ,cursor:"pointer"}}></i>
          {settinng && (<div className='a' >
            <a href='#' onClick={() => update(organization.organizationId)}>Update</a>
            <a href='#' onClick={handleLogout}>Log Out</a>
            <a href='#' onClick={() => deleteAccount(organization.organizationId)}>Delete this Account</a>
          </div>)}
          <div className="sidetext">Organization Name</div>

          <div className="sideimg">
            <img src={organization.photo} alt="!!" />
            <p style={{color:'white' ,fontSize:'20px'}}>{organization.name}</p>
          </div>

          <div className="sidetextCon">
          Organization Details
          </div>

          <div className="contactInfo">

            <ul >
              <li className="about" > <h2>About : </h2>{organization.mission}</li>
              <h2 style={{ color: 'rgb(210, 210, 210)' }}>organization ID : </h2>
              <li> {organization.organizationId}</li>
              <li><h2> Email : </h2> {organization.email}</li>
              <li><h2>website : </h2> {organization.website} </li>
              <li><h2>Phone : </h2> {organization.phone}</li>
              <li><h2>Address :</h2> {organization.mainBranch} </li>
              <li><h2>Bank Name : </h2> {organization.bankName}</li>
              <li><h2>Bank Account : </h2> {organization.bankAccount}</li>
            </ul>
          </div>
          <a className="ourC" href="#" onClick={()=>isVolunteer(organization.organizationId)}>Our volunteers</a>
          <a className="ourC" href="#" onClick={()=>{isOppurtunity(organization.organizationId)}}>Our Opportunites</a>
          <a href="#" className="ourC" onClick={()=>newOpp(organization.organizationId)} >Add a new Opportunite</a>
         
        </div>) : (
          <div style={{ textAlign: 'center' }}>
            <h2>Not contain Any Data</h2>
          </div>
        )}
      </div>
  )
}
