import help from '../images/want-to-help.jpg'
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Help.css'
export default function Help(){
    const {organizationId,volunteerId,oppId} = useParams();
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        opportunityId:Yup.number()
        .integer('Opportunity ID must be an integer')
        .required('Opportunity ID is required'),
        volunteerId:Yup.string().required('volunteer ID is required'),
        organizationId:Yup.string().required('organization ID is required'),
   });
    const { register, handleSubmit, formState: { errors } } = useForm({
       resolver: yupResolver(schema),
       defaultValues:{
        opportunityId:oppId,
        volunteerId:volunteerId,
        organizationId:organizationId
       }
   });
   const onSubmit = async (data) => {
    try {
        console.log()
        
        const payload = { opportunityId: data.opportunityId, volunteerId: data.volunteerId,
            organizationId: data.organizationId }; 
       console.log('Payload being sent:', JSON.stringify(payload));
    //    const token = localStorage.getItem('jwt');
       
        const response = await fetch('https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Application', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain',
                // 'Authorization': `Bearer ${token}` 
             },
                 body: JSON.stringify(payload),
        });
        
        // console.log('Success:', JSON.stringify(response));
        if (response.ok) {
            const result = await response.text();;
             console.log('Success:', result); 
             navigate('/find-opportunities');

        }
    } catch (error) {
        console.error('Network error:', error);
    }

}

    return(
        <div className='conainer3'>
            <div className='imagee'><img src={help} alt=''/></div>
            <div className='helpForm'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type='number' placeholder='opportunity Id:' name='opportunityId'{...register('opportunityId')}/>
                  {errors.opportunityId && <p style={{color:"red"}}>{errors.opportunityId.message}</p>}
                  <input type='text'placeholder='organization Id :' name='organizationId'{...register('organizationId')}/>
                  {errors.organizationId && <p style={{color:"red"}}>{errors.organizationId.message}</p>}
                  <input type='text' placeholder='volunteer Id:' name='volunteerId'{...register('volunteerId')}/>
                  {errors.volunteerId && <p style={{color:"red"}}>{errors.volunteerId.message}</p>}
                  <button type='submit' className='sendc'>Send</button>
                </form>
            </div>
        </div>
    )
}