
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React from "react";
import { useForm } from "react-hook-form";
import '../sign-up/Sign-Up.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function UpdateO() {
    const { id,name,email } = useParams();
    console.log(id);
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
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key] || '');
            }
            console.log('FormData being sent:', ...formData);
            const response = await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Account/updateOrganization/${id}`, {
                method: 'PUT',
                body: formData,
            });
            console.log(response.ok)
            if (response.ok) {
                const getresult = await fetch(`https://lfm2n4mh-7227.uks1.devtunnels.ms/api/Organization/${id}`,
                    { method: 'Get' }
                )
                console.log('Success:');
                console.log('GET Response:', getresult);
                console.log(getresult)
                if (getresult.ok) {
                    const updatedOrganizationData = await getresult.json();
                    localStorage.setItem('organization', JSON.stringify(updatedOrganizationData));
                    console.log('Data updated in local storage:', updatedOrganizationData);
                    navigate('/OurV');
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
                   
       
       </form>
        </div>
    </div>
    </div>)
}