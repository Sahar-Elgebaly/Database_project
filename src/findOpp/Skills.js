import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import BASE_URL from '../config';
export default function Skills(){
    const { id } = useParams();
    const navigate = useNavigate();
     const [skills,setSkills]=useState([]);
    const schema =Yup.object().shape({
        volunteerId:Yup.string().required('Volunteer id is required'),
        skillIds: Yup.array()
                .of(Yup.string().required('Skill ID must be a string'))
                .optional() 
                .nullable() 
                .transform((value) => (value && value.length === 0 ? undefined : value)),

    });
     const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema),
            defaultValues: {
                volunteerId:id,
    
            },
        });
  const getSkills=async()=>{
    try { const response = await axios.get(`${BASE_URL}/api/Skill/GetAll`);
    const skill = response.data; setSkills(skill);
               }
                      catch (error) { console.error('Error fetching skills:', error); }
            }
            useEffect(() => { getSkills(); }, []);
    const onSubmit=async (data)=>{
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);}
            try {
                console.log('Selected skillIDs:', data.skillIDs);
                const payload = {volunteerId:data.volunteerId, skillIds: data.skillIds || [] };
                 console.log('Payload being sent:', JSON.stringify(payload));
                const response = await fetch(`${BASE_URL}/api/Volunteer`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify(payload),
                });
                if (response.ok) {
                    const results = await response.json();
                   
                    localStorage.setItem('volunteer', JSON.stringify(results));
                     navigate('/find-opportunities');
                } else {
                    const error = await response.json();
                    console.error('Error:', error);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
    }
    
    return(
        <div className='sVo2'>
        <div className='sV'>
       <div className='blur'></div>
      <div className="container">
      <form className="signV" onSubmit={handleSubmit(onSubmit)}>
      
      <div style={{display:'flex',alignItems:'center'}} > <div style={{fontSize:'20px'}}>Skills  </div> <select style={{minWidth:'200px'}} id="time" multiple name="skillIds"  {...register('skillIds')} > 
                        {skills.map((skill) => ( <option key={skill.id} value={skill.id}>{skill.name}</option> ))}
                    </select></div>
                    <p style={{color:'black'}}>*Hint : use the Ctrl key while clicking on the options</p>
                    {errors.skillIds && <p>{errors.skillIds.message}</p>}
                <button type="submit" className="sign-up-btn" >ADD</button>   
      </form>
      </div>

       </div>
      </div>
    )
}