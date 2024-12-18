import logo from "../images/hands-logo.png"
import { Link } from "react-router-dom";
import './AppBar.css'
import { useState } from "react";

function AppBar() {
    const [isOpen, setIsOpen] = useState(false);
   const dropMenu=()=>{
        setIsOpen(!isOpen);
    }

  
    return (
        
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
                  <nav>
                  <ul>
                <li>  <Link className="link" to="/" >Home</Link></li>
                   <li> <Link className="link" to="/Log-In">Log In </Link></li>
                   <li> <Link className="link" to="/SignUp">Sign Up </Link></li>
                  </ul>
                  </nav>
                    </div>)
                 }
                </i>
                  
                </div>
                </div>

            </div>
    )
}
export default AppBar;
