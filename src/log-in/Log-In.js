import { useForm } from "react-hook-form";
import { jwtDecode } from 'jwt-decode';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Log-InV.css'
import login from '../images/log-inV.jpg'
import axios from "axios";
import BASE_URL from "../config";
export default function LogInV() {
    const navigate = useNavigate();
    const [iserror, seterror] = useState('');
    const schema = Yup.object().shape({
        password: Yup.string()
            .min(10, 'Password must be at least 10 characters long')
            .max(18, 'Password must not exceed 18 characters'),
        email: Yup.string().email('Email is not valid').required('Email is required'),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        try {

            const response = await fetch(`${BASE_URL}/api/Account/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const token = await response.text(); 
                console.log('Login successful. JWT:', token);
                const decodedToken = jwtDecode(token);
                 console.log('User information:', JSON.stringify(decodedToken.sub));
                 const id=decodedToken.sub;
                if (decodedToken.UserType === 'Volunteer') {
                    const response = await axios.get(`${BASE_URL}/api/Volunteer/${id}`);
                    localStorage.setItem('volunteer',JSON.stringify(response.data));
                     navigate('/find-opportunities');
                     } 
                else if (decodedToken.UserType === 'Organization') {
                    const response = await axios.get(`${BASE_URL}/api/Organization/${id}`);
                    localStorage.setItem('organization',JSON.stringify(response.data));
                     navigate('/OurV'); }
            }

            const responseData = await response.json();
            const token = responseData.token; console.log('Login successful. JWT:', token); 
            localStorage.setItem('jwt', token);
            const decodedToken = jwtDecode(token); console.log('User information:', decodedToken); 
            if (decodedToken.UserType === 'Volunteer') {
                navigate('/VolunteerProfile');
            } else if (decodedToken.UserType === 'Organization') { navigate('/OrganizationProfile'); }
        } catch (error) {
            console.error('Network error:', error);
            seterror('Login failed. Please check your email and password.');
        }
    }

    return (
        <div className="main">
            <div className="loginCont">
                <div className="loginimg"> <img src={login} alt='' /></div>
                <div className="loginv">
                    <h1>Welcome back to Hands Of Hope</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" id="email" name="email" placeholder="Enter your email : "  {...register('email')} />
                        {errors.email && <p>{errors.email.message}</p>}
                        <input type="password" id="password" name="password" placeholder="Enter your password : " {...register('password')} />
                        {errors.password && <p>{errors.password.message}</p>}
                        <button type="submit">Log In</button>
                        {iserror && <p>{iserror}</p>}
                    </form>
                    <p className="signup-link">New to Hands Of Hope? <a href="./SignUp">Sign up now</a></p>
                </div>
            </div>
        </div>
    )
}