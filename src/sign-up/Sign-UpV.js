import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './Sign-Up.css'
import { useNavigate } from 'react-router-dom'; 
import BASE_URL from "../config";
 function SignUpV(){
    const [err,setErr]=useState('')
    const navigate = useNavigate();
     const schema = Yup.object().shape({
        Name: Yup.string() .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces').required('Full name is required'),
        Email: Yup.string().email('Email is not valid').required('Email is required'),
        Password: Yup.string()
            .min(10, 'Password must be at least 10 characters long')
            .max(18, 'Password must not exceed 18 characters')
            .required('Password is required'),
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
        console.log(data)
    
        try {
            

            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]|| '');}
                console.log(formData)
            const response = await fetch(`${BASE_URL}/api/Account/registerV`, {
                method: 'POST',
                body:formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                if (result) {
                    localStorage.setItem('volunteer', JSON.stringify(result));
                    navigate('/find-opportunities');
                } else {
                    console.error('Received null result from API');
                }
                
            } else {
                const error = await response.json();
                console.error('Error:', error);
                setErr('This user already have an account')
            }
        } catch (error) {
            console.error('Network error:', error);
            setErr('This user already have an account')
        }

    }
   return(
   <div className="sVo">
     <div className="sV">
        <div className='blur'></div>
       <div className="container">
       <form className="signV" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up As Volunteer</h1>
        <input type='text' placeholder="Enter Your Name: " name="Name" {...register('Name')}/>
        {errors.Name && <p style={{color:"red"}}>{errors.Name.message}</p>}
        <input type='password' placeholder="Password: " name='Password' {...register('Password')}/>
        {errors.Password && <p>{errors.Password.message}</p>}
        <input type="email" id="email" name="Email" placeholder="Enter your email" {...register('Email')} />
        {errors.Email && <p>{errors.Email.message}</p>}
        <input type="number" id="age" name="Age" placeholder="Enter your Age" max={50} min={18} {...register('Age')} />
        <input type="tel" id="phone" name="Phone" placeholder="Enter your phone number" {...register('Phone')} />
        {errors.Phone && <p>{errors.Phone.message}</p>}
        <input type="text" id="address" name="Address" placeholder="Country, City" {...register('Address')} />
                    {errors.Address && <p>{errors.Address.message}</p>}
                    <input type="file" id="photo" name="Photo"  alt="" {...register("Photo")}/>
                    <textarea id="bio" name="Bio" placeholder="Tell us about yourself in a few words" rows="4" {...register('Bio')}></textarea>
                    <button type="submit" className="sign-up-btn" >Sign Up</button>   
                    {err!==null&&(<p>{err}</p>)}
                    <div className="loginlink" >
                        
                    Already have an account? <a href='./Log-In'>Log in</a>
                </div>
       </form>
       </div>
    </div>
   </div>
   )
}
export default SignUpV;