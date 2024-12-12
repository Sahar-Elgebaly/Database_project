import '../sign-up/Sign-Up.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { useForm  } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import s4 from '../images/s4.jpg'
export default function SignUp(){
    const navigate = useNavigate();
    const schema = Yup.object().shape({
       type:Yup.string().required('account type is required')
});
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),})
    const onSubmit  =(data)=>{
      console.log(data.type)
      if(data.type==='asVolunteer'){
        navigate('/Sign-UpV')
        
      }
      else if(data.type==='asOrganization'){
        navigate('/Sign-UpO');
      }
    }
    useEffect(() => { const videoElement = document.getElementById("myVideo"); 
         const playVideo = setTimeout(() => { if (videoElement) { videoElement.play(); } }, 10); 
         return () => clearTimeout(playVideo); }, []);
    return(
         <div className='s1'>
            <div >  <img src={s4} alt=''/></div>
            <div className="containerf">
                <form className="signV" style={{padding:'20px'}} onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{color:'gray'}}>Sign Up</h1>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontWeight:'bold'}}>Sign-Up As:</div>
                    <select style={{width:"200px"}} {...register('type')} >
                    <option value="" disabled >Select Account Type</option>
                <option value='asVolunteer'>As Volunteer</option>
                <option value='asOrganization'>As Organization </option>
            </select>
                </div>
                {errors.type&&(<p>errors.type.message</p>)}
                <button  type="submit" className="sign-up-btn">Next</button>

                </form>
            </div>
</div>
     
    )
}