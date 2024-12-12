import logo from "../images/hands-logo.png"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './AppBar.css'
import FindOpportunities from "../findOpp/Find-Oppertunities";
import FindVolunteers from "../Find-Volunteers";
import Home from "../home/Home";
import { useState } from "react";
import SignUpV from "../sign-up/Sign-UpV";
import SignUpO from'../sign-up/Sign-UpO';
import UpdateV from "../findOpp/UpdateV";
import Help from "../help/Help";
import LogIn from "../log-in/Log-In";
import OurV from "../findOrg/OurV";
import UpdateO from "../findOrg/UpdateO";
import UpdateOpp from '../findOrg/UpdateOpp';
import AddNew from '../findOrg/AddNew';
import ReviewOpp from '../findOrg/ReviewOpp';
import SignUp from'../sign-up/Sign-Up'
import Org from '../findOpp/Org'
function AppBar() {
    const [isOpen, setIsOpen] = useState(false);
   const dropMenu=()=>{
        setIsOpen(!isOpen);
    }

  
    return (
        <BrowserRouter>
            <div className="nav" >
                <div className="AppBar">
                <div className="top">
                    <img src={logo} alt="" className='logo' />
                    <p className="logoName">Hands Of Hope </p>
                </div>
                <div className="list">
                   
                <i class="fa fa-list" aria-hidden="true" onClick={dropMenu} style={{cursor:'pointer',fontSize:'25px'}}>
                 {
                    isOpen &&
                    (<div className="menu">
                  <ul>
                <li>  <Link className="link" to="/" >Home</Link></li>
                   <li> <Link className="link" to="/Log-In">Log In </Link></li>
                   <li> <Link className="link" to="/SignUp">Sign Up </Link></li>
                  </ul>
                    </div>)
                 }
                </i>
                  
                </div>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Find-Opportunities" element={<FindOpportunities />} />
                    <Route path="/Log-In" element={<LogIn />} />
                    <Route path="/Sign-UpV" element={<SignUpV />} />
                    <Route path="/Sign-UpO" element={<SignUpO/>} />
                    <Route path="/Find-Volunteers" element={<FindVolunteers />} />
                    <Route path="/UpdateV/:id" element={<UpdateV />}/>
                    <Route path="/UpdateO/:id" element={<UpdateO />}/>
                    <Route path="/UpdateOPP/:id/:organizationId" element={<UpdateOpp />}/>
                    <Route path="/ReviewOpp/:appId/:vId/:orgId" element={<ReviewOpp />} />
                    <Route path="/AddNew/:id" element={<AddNew/>}/>
                    <Route path="/help/:organizationId/:volunteerId/:oppId" element={<Help/>}/>
                    <Route path="/Org/:id" element={<Org />}/>
                    <Route path="/OurV" element={<OurV/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                </Routes>

            </div>
        </BrowserRouter>
    )
}
export default AppBar;
