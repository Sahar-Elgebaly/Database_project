import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React from "react";
import { useForm  } from "react-hook-form";
import '../sign-up/Sign-Up.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";
export default function AddNew(){
    const [skills,setSkills]=useState([]);

    const navigate = useNavigate();
    const { id} = useParams();
    const schema = Yup.object().shape({
        organizationId: Yup.string().required('Organization ID is required'),
    description: Yup.string().required('Description is required'),
    isOnline: Yup.boolean().required('Online status is required'),
    deadline: Yup.date()
        .required('Deadline is required')
        .typeError('Deadline must be a valid date'),
        skillIDs: Yup.array()
        .of(Yup.string().required('Skill ID must be a string'))
        .optional() 
        .nullable() 
        .transform((value) => (value && value.length === 0 ? undefined : value)), // Transform empty array to undefined
});
    const { register, handleSubmit, formState: { errors },setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            organizationId:id
        }
    });
    const getSkills=async()=>{
        try { const response = await axios.get('https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Skill/GetAll'); const skill = response.data; setSkills(skill);
             console.log(skill); }
              catch (error) { console.error('Error fetching skills:', error); }
    }
    useEffect(() => { getSkills(); }, []);
    const onSubmit = async (data) => {
        try {
            const payload = { organizationId: data.organizationId, description: data.description, isOnline: data.isOnline, deadline: data.deadline, skillIDs: data.skillIDs || [] };
             console.log('Payload being sent:', JSON.stringify(payload));
            const response = await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Opportunity`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain' },
                body: JSON.stringify(payload),
            });
            console.log(response.data)
            if (response.ok) {
               console.log('added successfully');
               navigate('/OurV')

            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }

    }
    return(
      <div className="sVx">
          <div className="sV">
        <div className='blurnew'></div>
        <div className='container'>
        <form className="signV" onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Oppurtunity</h1>
            <input type='text' placeholder="organization Id" name="organizationId" {...register('organizationId')}/>
                {errors.organizationId && <p>{errors.organizationId.message}</p>}
                    <textarea placeholder="Tell us what is the Description of your oppurtunity :"{...register('description')} rows='10' ></textarea>
                    
                {errors.description && <p>{errors.description.message}</p>}
               <div style={{display:'flex',alignItems:'center'}}>
                <div>IsOnline</div>
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
                      
                     <div style={{display:'flex',alignItems:'center'}} > <div style={{fontSize:'20px'}}>Skills  </div> <select style={{minWidth:'200px'}} id="time" multiple name="skillIDs"  {...register('skillIDs')} > 
                        {skills.map((skill) => ( <option key={skill.id} value={skill.id}>{skill.name}</option> ))}
                    </select></div>
                    <p style={{color:'black'}}>*Hint : use the Ctrl key while clicking on the options</p>
                    {errors.skillIDs && <p>{errors.skillIDs.message}</p>}
                <button type="submit" className="sign-up-btn" >ADD</button>     
                            
                   
       
       </form>
        </div>
    </div>
      </div>
    )

}