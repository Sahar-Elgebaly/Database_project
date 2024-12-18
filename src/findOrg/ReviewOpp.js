
import '../sign-up/Sign-Up.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BASE_URL from '../config';

export default function ReviewOpp() {
    const { appId } = useParams();
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        applicationId: Yup.number().required('Application ID is required'),
        rating: Yup.number()
            .min(0, 'Rating must be at least 0')
            .max(5, 'Rating must be at most 5')
            .required('Rating is required'),
        comment: Yup.string().required('Comment is required'),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            applicationId: appId,

        },
    });
    const onSubmit = async (data) => {
        const payload = { applicationId: data.applicationId, volunteerId: data.volunteerId,
             organizationId: data.organizationId, rating: data.rating,
             comment: data.comment }; 
        console.log('Payload being sent:', JSON.stringify(payload));
        
        try {

            const response = await fetch(`${BASE_URL}/api/Review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain'  },
                     body: JSON.stringify(payload),
            });
            
            console.log('Success:', JSON.stringify(response));
            if (response.ok) {
                const result = await response.json();
                 console.log('Success:', result); 
                 navigate('/OurV');

            }
        } catch (error) {
            console.error('Network error:', error);
        }

    }
    return (
        <div className='sVx'>
           <div className='sV'>
           <div className='blur'></div>
            <div className="container">
                <form className="signV" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Make a Review</h1>
                    <label>Application ID</label>
                    <input
                        type="number"
                        name="applicationId"
                        placeholder='application Id'
                        {...register('applicationId')}
                    />
                    {errors.applicationId && <div style={{ color: 'red' }}>{errors.applicationId.message}</div>}
                    <input type="number" name="rating" {...register('rating')} placeholder='Rating 0/10' min='0' max='5' />
                     {errors.rating && <div style={{ color: 'red' }}>
                        {errors.rating.message}</div>}
                    <textarea name="comment" {...register('comment')} rows='4' placeholder='write your Review : '></textarea>
                     {errors.comment && <div style={{ color: 'red' }}>
                        {errors.comment.message}</div>}
                    <button type="submit" className="sign-up-btn">Submit</button>

                </form>
            </div>
           </div>

        </div>
    )

}

