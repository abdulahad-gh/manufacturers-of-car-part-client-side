import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase-init';
import Spinner from '../Shared/Spinner';

const MyProfile = () => {

    const [user, loading] = useAuthState(auth)
    const [countries, setCountries] = useState([]);
    const [onChange, setOnChange] = useState(false)
    const [spinner, setSpinner] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const countries = await axios.get('https://restcountries.com/v3.1/all')
            setCountries(countries.data)
        })()

    }, [])



    if (loading || spinner) {
        return <Spinner />
    }


    const handleUserProfile = e => {
        setSpinner(true)
        e.preventDefault()

        const userProfileInfo = {
            education: e.target.education.value,
            institution: e.target.institution.value,
            address: `${e.target.streetAddress.value} ${e.target.country.value}`,
            phoneNumber: e.target.phoneNumber.value,
            linkedIn: e.target.linkedIn.value,
            facebook: e.target.facebook.value,

        }
        fetch(`https://manufacturers-of-car-part-server.vercel.app/update-user-info/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userProfileInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setSpinner(false)
                    toast.success('Your profile update successfully')

                    setTimeout(() => {
                        navigate('/')

                    }, 2000)
                    setOnChange(false)
                }

            })

    };
    return (
        <div className='mt-10 px-2 lg:px-5 bg-gray-200 rounded-md p-4'>
            <h1 className=' text-2xl text-center'>My Profile</h1>


            <div className='flex justify-center mt-5'>
                <form onSubmit={handleUserProfile}>
                    <p><strong>Note:</strong> hey {user?.displayName} you can't change name and email.</p>



                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>

                    <input disabled value={user?.displayName} type="text" className="input input-bordered w-full max-w-md" />



                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>

                    <input disabled value={user?.email} type="email" className="input input-bordered w-full max-w-md" />



                    <label className="label mt-4">
                        <span className="label-text text-2xl">Education</span>
                    </label>

                    <label className="label">
                        <span className="label-text">Select your Education degree</span>
                    </label>

                    <select onChange={() => setOnChange(true)} name='education' className="input input-bordered w-full max-w-md">


                        <option value="JSC/JDC">JSC/JDC</option>
                        <option value="SSC/DHAKIL">SSC/DHAKIL</option>
                        <option value="HSC/ALIM">HSC/ALIM</option>
                        <option value="HSC/ALIM">HSC/ALIM</option>
                        <option value="Bachelor/Honors">Bachelor/Honors</option>
                        <option value="Masters">Masters</option>


                    </select>

                    <label className="label">
                        <span className="label-text">Institution Name</span>
                    </label>


                    <select onChange={() => setOnChange(true)} name='institution' className="input input-bordered w-full max-w-md">

                        <option value="Abdul Kadir Mollah City College">Abdul Kadir Mollah City College</option>
                        <option value="Adamjee Cantonment College">Adamjee Cantonment College</option>
                        <option value="Adhyapak Abdul Majid College">Adhyapak Abdul Majid College</option>
                        <option value="Aeronautical College of Bangladesh	">Aeronautical College of Bangladesh	</option>
                        <option value="Aeronautical Institute of Bangladesh">Aeronautical Institute of Bangladesh</option>
                        <option value="Agricultural University College, Mymensingh">Agricultural University College, Mymensingh</option>

                    </select>


                    <label className="label mt-4">
                        <span className="label-text text-2xl">Present Address</span>
                    </label>
                    <label className="label">
                        <span className="label-text ">Select your Country</span>
                    </label>


                    <select onChange={() => setOnChange(true)} name='country' className="input input-bordered w-full max-w-md">
                        {
                            countries?.map(countrie => <option value={countrie?.name?.common}>{countrie?.name?.common}</option>)
                        }
                    </select>

                    <label className="label">
                        <span className="label-text ">Street Address</span>
                    </label>
                    <input onChange={() => setOnChange(true)} type='text' name='streetAddress' className="input input-bordered w-full max-w-md" />

                    <label className="label mt-4">
                        <span className="label-text text-2xl">phone number</span>
                    </label>
                    <input onChange={() => setOnChange(true)} type='tel' name='phoneNumber' className="input input-bordered w-full max-w-md" />

                    <label className="label mt-4">
                        <span className="label-text text-2xl">External profile link</span>
                    </label>
                    <label className="label ">
                        <span className="label-text">LinkedIn </span>
                    </label>
                    <input onChange={() => setOnChange(true)} type='text' name='linkedIn' className="input input-bordered w-full max-w-md" />
                    <label className="label ">
                        <span className="label-text">Facebook</span>
                    </label>
                    <input onChange={() => setOnChange(true)} type='text' name='facebook' className="input input-bordered w-full max-w-md" />











                    <br />

                    <input disabled={!onChange} type='submit' className='btn my-10 btn-active w-full max-w-md' value='Update' />
                </form>
            </div>


        </div>
    );
};

export default MyProfile;