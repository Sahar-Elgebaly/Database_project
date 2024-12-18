import './App.css';
import AppBar from './appBar/AppBar';
import SignUpV from "./sign-up/Sign-UpV";
import SignUpO from './sign-up/Sign-UpO';
import UpdateV from "./findOpp/UpdateV";
import LogIn from "./log-in/Log-In";
import OurV from "./findOrg/OurV";
import UpdateO from "./findOrg/UpdateO";
import UpdateOpp from './findOrg/UpdateOpp';
import AddNew from './findOrg/AddNew';
import ReviewOpp from './findOrg/ReviewOpp';
import SignUp from './sign-up/Sign-Up'
import Org from './findOpp/Org';
import FindOpportunities from "./findOpp/Find-Oppertunities";
import Home from './home/Home';
import Skills from './findOpp/Skills';
import Vol from "./findOrg/Vol"
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Find-Opportunities" element={<FindOpportunities />} />
          <Route path="/Log-In" element={<LogIn />} />
          <Route path="/Sign-UpV" element={<SignUpV />} />
          <Route path="/Sign-UpO" element={<SignUpO />} />
          <Route path="/UpdateV/:id" element={<UpdateV />} />
          <Route path="/UpdateO/:id" element={<UpdateO />} />
          <Route path="/UpdateOPP/:id/:organizationId" element={<UpdateOpp />} />
          <Route path="/ReviewOpp/:appId" element={<ReviewOpp />} />
          <Route path="/AddNew/:id" element={<AddNew />} />
          <Route path="/Org/:id" element={<Org />} />
          <Route path="/OurV" element={<OurV />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Vol/:id" element={<Vol />} />
          <Route path="/Skills/:id" element={<Skills/>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
