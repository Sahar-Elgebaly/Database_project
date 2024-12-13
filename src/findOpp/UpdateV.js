
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React from "react";
import { useForm } from "react-hook-form";
import '../sign-up/Sign-Up.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
 export default function UpdateV(){
    const {id}=useParams();
    console.log(id);
    const navigate = useNavigate();
    const schema = Yup.object().shape({
       Name: Yup.string() .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces').required('Full name is required'),
       Phone: Yup.string()
           .matches(/^[0-9]+$/, 'Phone number must be numeric')
           .length(11, 'Phone number must be exactly 11 digits long')
           .required('Phone number is required'),
           Bio:Yup.string(),
       Address:Yup.string().required('address is required'),
       Photo:Yup.mixed(),
       Age: Yup.number()
           .min(18, 'Age must be at least 18')
           .max(50, 'Age must not exceed 50')
           .required('Age is required'),

   });
    const { register, handleSubmit, formState: { errors } } = useForm({
       resolver: yupResolver(schema),
   });
   const onSubmit=async (data)=>{
       try {
           const formData = new FormData();
           for (const key in data) {
               formData.append(key, data[key]|| '');}
               console.log(formData)
           const response = await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Account/updateVolunteer/${id}`, {
               method: 'PUT',
               
               body:formData,
           });

           if (response.ok) {
            const getresult=await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Volunteer/${id}`,
                {method:'Get'}
            )
               console.log('Success:');
               console.log('GET Response:', getresult);
               console.log(getresult)
               if (getresult.ok) {
                const updatedVolunteerData = await getresult.json();
                localStorage.setItem('volunteer', JSON.stringify(updatedVolunteerData));
                console.log('Data updated in local storage:', updatedVolunteerData);
                   navigate('/find-opportunities');
               } else {
                   console.error('Received null result from API', getresult.statusText);
               }
               
           } else {
               const error = await response.json();
               console.error('Error:', error);
           }
       } catch (error) {
           console.error('Network error:', error);
       }

   }
 
    return(<div className="sVx">
       <div className="sV">
       <div className='blur'></div>
         <div className='container'>
         <form className="signV" onSubmit={handleSubmit(onSubmit)}>
        <h1>Update My Data</h1>
        <input type='text' placeholder="Enter Your Name: " name="Name" {...register('Name')}/>
        {errors.Name && <p style={{color:"red"}}>{errors.Name.message}</p>}
        <input type="number" id="age" name="Age" placeholder="Enter your Age" max={50} min={18} {...register('Age')} />
        <input type="tel" id="phone" name="Phone" placeholder="Enter your phone number" {...register('Phone')} />
        {errors.Phone && <p>{errors.Phone.message}</p>}
        <input type="text" id="address" name="Address" placeholder="Country, City" {...register('Address')} />
                    {errors.Address && <p>{errors.Address.message}</p>}
                    <input type="file" id="photo" name="Photo"  alt="" {...register("Photo")}/>
                    <textarea id="bio" name="Bio" placeholder="Tell us about yourself in a few words" rows="4" {...register('Bio')}></textarea>
                    <button type="submit" className="sign-up-btn" onClick={() => console.log('Debug: Button clicked')}>Update</button>            
       </form>
         </div>
       </div>
    </div>)
}