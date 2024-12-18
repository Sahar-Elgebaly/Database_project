import './Sign-Up.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React from "react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; 
import BASE_URL from '../config';
export default function SignUpO(){
    const [err,setErr]=useState('')
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        Name: Yup.string() .matches(/^[a-zA-Z]+$/, 'Name can only contain letters and cannot have spaces')
        .required('Full name is required'),
        Email: Yup.string().email('Email is not valid').required('Email is required'),
        Password: Yup.string()
            .min(10, 'Password must be at least 10 characters long')
            .max(18, 'Password must not exceed 18 characters')
            .required('Password is required'),
        Phone: Yup.string()
            .matches(/^[0-9]+$/, 'Phone number must be numeric')
            .length(11, 'Phone number must be exactly 11 digits long')
            .required('Phone number is required'),
        MainBranch:Yup.string().required('Main Branch is required'),
        Photo:Yup.mixed(),
        Website:Yup.string().required('Website is required'),
        BankName:Yup.string(),
        BankAccount:Yup.string(),
        Mission:Yup.string().required('Mission is required')

    });
     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit=async (data)=>{
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);}
        try {

            const response = await fetch(`${BASE_URL}/api/Account/registerO`, {
                method: 'POST',
                body:formData ,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                if (result) {
                    localStorage.setItem('organization', JSON.stringify(result));
                    navigate('/OurV');
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
       <div className='sVo'>
         <div className='sV'>
        <div className='blur'></div>
       <div className="container">
       <form className="signV" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up As Organization</h1>
        <input type='text' placeholder="Name: " name="Name" {...register('Name')}/>
        {errors.Name && <p style={{color:"red"}}>{errors.Name.message}</p>}
        <input type='password' placeholder="Password: " name='Password' {...register('Password')}/>
        {errors.Password && <p>{errors.Password.message}</p>}
        <input type="email" id="email" name="Email" placeholder="Enter your email" {...register('Email')} />
        {errors.Email && <p>{errors.Email.message}</p>}
        <input type='text' placeholder='Main Branch' name='MainBranch' {...register('MainBranch')}/>
        {errors.MainBranch && <p>{errors.MainBranch.message}</p>}
        <input type='text' placeholder='BankName' name='BankName' {...register('BankName')}/>
        <input type='text' placeholder='BankAccount' name='BankAccount' {...register('BankAccount')}/>
        <input type='text' placeholder='Website' name='Website' {...register('Website')}/>
        {errors.Website && <p>{errors.Website.message}</p>}

        <input type="tel" id="phone" name="Phone" placeholder="Enter your phone number" {...register('Phone')} />
        {errors.Phone && <p>{errors.Phone.message}</p>}
       
                    <input type="file" id="photo" name="Photo" accept="image/*" alt="" {...register("Photo")}/>
                    <textarea id="Mission" name="Mission" placeholder="Tell us what is Your Mission About:" rows="10" {...register('Mission')}></textarea>
                    {errors.Mission && <p>{errors.Mission.message}</p>}
                    <button type="submit" className="sign-up-btn" >Sign Up</button>   
                    {err!==null&&(<p>{err}</p>)}  
                    <div className="loginlink">
                    Already have an account? <a href='./Log-In'>Log in</a>
                </div>
       
       </form>
       </div>

        </div>
       </div>
    )
}