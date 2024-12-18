
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React from "react";
import { useForm } from "react-hook-form";
import '../sign-up/Sign-Up.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import BASE_URL from "../config";
export default function UpdateO() {
    const { id } = useParams();
     const [err,setErr]=useState('');
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        Name: Yup.string().matches(/^[a-zA-Z]+$/, 'Name can only contain letters and cannot have spaces')
            .required('Full name is required'),
        Phone: Yup.string()
            .matches(/^[0-9]+$/, 'Phone number must be numeric')
            .length(11, 'Phone number must be exactly 11 digits long')
            .required('Phone number is required'),
        MainBranch: Yup.string().required('Main Branch is required'),
        Photo: Yup.mixed(),
        Website: Yup.string().required('Website is required'),
        BankName: Yup.string(),
        BankAccount: Yup.string(),
        Mission: Yup.string().required('Mission is required')

    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        
        
    });
    const onSubmit=async (data)=>{
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]|| '');}
                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                console.log(formData)
            const response = await fetch(`${BASE_URL}/api/Account/updateOrganization/${id}`, {
                method: 'PUT',
                body:formData,
            });
 
            if (response.ok) {
             const getresult=await fetch(`${BASE_URL}/api/Organization/${id}`,
                 {method:'Get'}
             )

                if (getresult.ok) {
                    const updatedOrganizationData = await getresult.json();
                                   localStorage.setItem('organization', JSON.stringify(updatedOrganizationData));
                                   console.log('Data updated in local storage:', updatedOrganizationData);
                              navigate('/OurV');
                } else {
                    console.error('Received null result from API', getresult.statusText);
                    setErr('This user already have an account')
                }
                
            } else{  const error = await response.json();
            console.error('Error:', error);
            if (error.errors) {
                console.error('Validation Errors:', error.errors);
                setErr('This user already have an account')
            }
        }
        } catch (error) {
            console.error('Network error:', error);
            setErr('This user already have an account')
        }
 
    }
   

    return (<div className="sVx">
        <div className="sV">
        <div className='blurx'></div>
        <div className='container'>
        <form className="signV" onSubmit={handleSubmit(onSubmit)}>
        <h1>Update My Data</h1>
        <input type='text' placeholder="Name: " name="Name" {...register('Name')}/>
        {errors.Name && <p style={{color:"red"}}>{errors.Name.message}</p>}
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
                    <button type="submit" className="sign-up-btn" >Update</button>   
                    {err!==null&&(<p>{err}</p>)}  
                   
       
       </form>
        </div>
    </div>
    </div>)
}