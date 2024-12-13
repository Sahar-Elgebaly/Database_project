import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React from "react";
import { useEffect,useState } from "react"; 
import { useForm  } from "react-hook-form";
import axios from "axios";
import '../sign-up/Sign-Up.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function UpdateOpp() {
    const [skills,setSkills]=useState([]);
    const { id,organizationId } = useParams();
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        organizationId: Yup.string().required('Organization ID is required'),
    description: Yup.string().required('Description is required'),
    isOnline: Yup.boolean().required('Online status is required'),
    deadline: Yup.date()
        .required('Deadline is required')
        .typeError('Deadline must be a valid date'),
        skillIDs: Yup.array()
        .of(Yup.number().required('Skill ID must be a number'))
        .optional() 
        .nullable() 
        .transform((value) => (value && value.length === 0 ? undefined : value)), 
});
    const { register, handleSubmit, formState: { errors },setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            organizationId:organizationId,
        }
    });
    const getSkills=async()=>{
        try { const response = await axios.get('https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Skill/GetAll'); 
            const skill = response.data; 
            setSkills(skill);
             console.log(skill); }
              catch (error) { console.error('Error fetching skills:', error); }
    }
    useEffect(() => { getSkills(); }, []);
    const onSubmit = async (data) => {
        try {
            console.log('Selected skillIDs:', data.skillIDs);
            const payload = { organizationId: data.organizationId, description: data.description, isOnline: data.isOnline=== 'true', 
                deadline: new Date(data.deadline).toISOString(), skillIDs:  [] };
             console.log('Payload being sent:', JSON.stringify(payload));
            const response = await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Opportunity/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(payload),
            });
            if (response.ok) {
                const result = await response.text();
                console.log('Success:', result);
                 navigate('/OurV');
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }

    }

    return (<div className="sVx">
       <div className="sV">
       <div className='blurx'></div>
        <div className='container'>
        <form className="signV" onSubmit={handleSubmit(onSubmit)}>
        <h1>Update Oppurtunity</h1>
            <input type='text' placeholder="organization Id" name="organizationId" {...register('organizationId')}/>
                {errors.organizationId && <p>{errors.organizationId.message}</p>}
                    <textarea placeholder="Tell us what is the Description of your oppurtunity :"{...register('description')} rows='10' ></textarea>
                    
                {errors.description && <p>{errors.description.message}</p>}
               <div style={{display:'flex',alignItems:'center'}}>
                <div>IsOnLine</div>
               <select id="time" name="isOnline" {...register('isOnline')}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
               </div>
                {errors.isOnline && <p>{errors.isOnline.message}</p>}
                <input
                    type="date"
                    {...register('deadline')}
                />
                {errors.deadline && <p>{errors.deadline.message}</p>}
                
                   
                    
                <button type="submit" className="sign-up-btn" >Update</button>     
                            
                   
       
       </form>
        </div>
       </div>
    </div>)
}