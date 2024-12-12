import './Home.css'
import Donate from '../images/donate.jpg'
import { Link } from 'react-router-dom';
import food from '../images/R.jpg'
import eduction from '../images/education.jpg'
import water from '../images/water.jpg'
import medical from '../images/Medical.jpg'
import about from '../images/about.png'
import about2 from '../images/about2.png'
import { useState } from 'react';
function Home() {
    const [isDown, setIsDown] = useState([false, false, false, false]);
    const changeState = (index) => {
        setIsDown(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        })
    }
    return (
        <div className="quote">
            <div className='Donate'>
                <div className='donate-'>
                    <h4 >always donate for children</h4>
                    <h1>Lend a Helping Hand to Those in Need</h1>
                    <p>You see, helping someone up need not involve grand gestures. Even small acts of kindness can have an incredible impact. Oftentimes, all it takes is a desire to ease other people’s suffering and a willingness to make little sacrifices to make the world a better place.</p>
                </div>
                <div className='donate' >
                    <img src={Donate} alt='' />
                </div>

            </div>
            <div className='service'>
                <div className='b'>
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <div>  <p>Create Your Organization And Find Volunteers</p>
                        <Link className="Link" to="/Sign-UpO">Find Volunteers</Link></div>
                </div>

                <div className='b'>
                    <i class="fa fa-archive" aria-hidden="true"></i>
                    <div>  <p>Become A Volunteer And Find Your Oppertunities</p>
                        <Link className="Link" to="/Sign-UpV">Find Opportunities</Link></div>
                </div> </div>
            <div className='About-Us' id='about'>
                <div className='pageTitle2'>
                    <h1 className='title2'>
                        About-Us
                    </h1>
                </div>
             <div className='about-content'>
             <div><img src={about} alt=''/>
                </div>
             <div>
                <p>This app connects volunteers and donors with organizations in need, making it easier to support causes that matter. Volunteers can find opportunities to contribute their skills and time, while donors can seamlessly fund initiatives they care about. The app ensures transparency, tracks impact, and fosters a collaborative community dedicated to creating positive change.</p></div>
               
             </div>
            </div>
            <div id='services' className='ourServices'>
                <div className='pageTitle'>
                    <h1 className='title'>
                        services
                    </h1>
                    <p>We Are Here To Help Them </p></div>
                <div className='content'>
                    <div className='co' id='up'>
                        <img src={food} alt='' />
                        <h1>Healthy Food</h1>
                        <p>Good health begins with good nutrition. Providing healthy food is not just an act of kindness; it’s an investment in a brighter, healthier future for everyone. </p>
                    </div>
                    <div className='co' id='down2' >
                        <img src={eduction} alt='' />
                        <h1>Kids Education</h1>
                        <p>Every child deserves the light of education. By empowering kids with knowledge, we unlock their potential and shape a brighter, more hopeful future for all. </p>
                    </div>
                    <div className='co' id='down'>
                        <img src={water} alt='' />
                        <h1>Pure Water</h1>
                        <p>Clean water is not a privilege; it’s a necessity. When you give someone access to pure water, you’re not just quenching their thirst—you’re giving them life, hope, and a future. </p>
                    </div>
                    <div className='co' id='up2'>
                        <img src={medical} alt='' />
                        <h1>Medical Care</h1>
                        <p>Access to medical care is a fundamental right, not a luxury. By extending care to those in need, we not only heal bodies but also restore dignity and build stronger, healthier communities </p>
                    </div>


                </div>
            </div>

            <div className='OurServ' id='question'>
                <div className='images'>
                    <div >
                        <div className='imgX'>
                            <i class="fa-sharp fa-solid fa-box"></i>
                            <h1>4850</h1>
                            <p>Total Campaigns</p>
                        </div>
                        <div className='imgX'>
                            <i class="fa-solid fa-circle-dollar-to-slot"></i>
                            <h1>3456</h1>
                            <p>Released Funds</p>
                        </div>
                    </div>
                    <div className='trans'>
                        <div className='imgX'>
                            <i class="fa-solid fa-people-roof"></i>
                            <h1>2068</h1>
                            <p>Happy Volunteers</p>
                        </div>
                        <div className='imgX'>
                            <i class="fa-solid fa-hand-holding-dollar"></i>
                            <h1>480</h1>
                            <p>Satisfied Donors</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Frequency asked question</h1>
                    <div>
                        <div className='downIcon'>
                            <h3> Can I change where I want my donation to go?</h3>
                            <i class="fa-solid fa-chevron-down" onClick={() => { changeState(0) }}></i>
                        </div>
                        {isDown[0] && (<div><p style={{ maxWidth: "410px", marginTop: "0" }}>Typically, you can request to change the allocation of your donation by contacting the organization directly. Policies may vary, so reach out to their support team for assistance.</p></div>)}
                    </div>
                    <div>
                        <div className='downIcon'>
                            <h3> Where does my transaction processing fee go?</h3>
                            <i class="fa-solid fa-chevron-down" onClick={() => changeState(1)}></i>
                        </div>
                        {isDown[1] && (<div><p style={{ maxWidth: "410px", marginTop: "0" }}>Transaction processing fees help cover costs such as payment gateway charges and other administrative expenses. Adding an optional 2-5% can support these operational costs, but it is not mandatory.</p></div>)}
                    </div>
                    <div>
                        <div className='downIcon'>
                            <h3> Is my credit card information secure?</h3>
                            <i class="fa-solid fa-chevron-down" onClick={() => changeState(2)}></i>
                        </div>
                        {isDown[2] && (<div><p style={{ maxWidth: "410px", marginTop: "0" }}>Most organizations use encrypted and secure payment gateways to protect your credit card information. Check if they comply with standards like PCI DSS (Payment Card Industry Data Security Standard) for additional reassurance.</p></div>)}
                    </div>
                    <div>
                        <div className='downIcon'>
                            <h3> How can I receive a refund?</h3>
                            <i class="fa-solid fa-chevron-down" onClick={() => changeState(3)}></i>
                        </div>
                        {isDown[3] && (<div><p style={{ maxWidth: "410px", marginTop: "0" }}>To request a refund, contact the organization’s support team. Refund policies vary, but you may need to provide details such as the donation amount, date, and receipt.</p></div>)}
                    </div>

                </div>
            </div>

            <div>
                <div className='last'>
                    <div className='lastContent'>
                        <a href='#about'>About Us</a>
                        <a href='#services'>services</a>
                        <a href='#question'>Some-Question</a>
                        <a href='./SignUp'>sign UP </a>
                        <a href='./Log-In'>log in</a>

                    </div>
                    <div className='lastQuote'>
                        <p>“Volunteerism is the voice of the people put into action.  These actions shape and mold the present into a future of which we can all be proud.” </p>
                    </div>

                </div>
            </div>


        </div>
    )
}
export default Home;