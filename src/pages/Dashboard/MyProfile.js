import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase-init';

const MyProfile = () => {

    const [user, loading] = useAuthState(auth)
    const [countries, setCountries] = useState([]);
    const [onChange, setOnChange] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const countries = await axios.get('https://restcountries.com/v3.1/all')
            setCountries(countries.data)
        })()

    }, [])



    if (loading) {
        return
    }


    const handleUserProfile = e => {
        e.preventDefault()

        const userProfileInfo = {
            education: e.target.education.value,
            institution: e.target.institution.value,
            address: `${e.target.streetAddress.value} ${e.target.country.value}`,
            phoneNumber: e.target.phoneNumber.value,
            linkedIn: e.target.linkedIn.value,
            facebook: e.target.facebook.value,

        }
        fetch(`http://localhost:5000/update-user-info/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userProfileInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Your profile update successfully')

                    setTimeout(() => {
                        navigate('/')

                    }, 1000)
                    setOnChange(false)
                }

            })

    };
    return (
        <div className='mt-14 lg:mt-20'>
            <h1 className=' text-2xl lg:text-2xl'>My Profile</h1>


            <div className='flex justify-center lg:justify-start px-5 mt-5'>
                <form onSubmit={handleUserProfile}>
                    <p><strong>Note:</strong> hey {user?.displayName} you can't change name and email.</p>



                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>

                    <input disabled value={user?.displayName} type="text" className="input input-bordered w-full max-w-xs" />



                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>

                    <input disabled value={user?.email} type="email" className="input input-bordered w-full max-w-xs" />



                    <label className="label mt-4">
                        <span className="label-text text-2xl">Education</span>
                    </label>

                    <label className="label">
                        <span className="label-text">Select your Education degree</span>
                    </label>

                    <select onChange={() => setOnChange(true)} name='education' className="input input-bordered w-full max-w-xs">


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


                    <select onChange={() => setOnChange(true)} name='institution' className="input input-bordered w-full max-w-xs">

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


                    <select onChange={() => setOnChange(true)} name='country' className="input input-bordered w-full max-w-xs">
                        {
                            countries?.map(countrie => <option value={countrie?.name?.common}>{countrie?.name?.common}</option>)
                        }
                    </select>

                    <label className="label">
                        <span className="label-text ">Street Address</span>
                    </label>
                    <input onChange={() => setOnChange(true)} type='text' name='streetAddress' className="input input-bordered w-full max-w-xs" />

                    <label className="label mt-4">
                        <span className="label-text text-2xl">phone number</span>
                    </label>
                    <input onChange={() => setOnChange(true)} type='tel' name='phoneNumber' className="input input-bordered w-full max-w-xs" />

                    <label className="label mt-4">
                        <span className="label-text text-2xl">External profile link</span>
                    </label>
                    <label className="label ">
                        <span className="label-text">LinkedIn </span>
                    </label>
                    <input onChange={() => setOnChange(true)} type='text' name='linkedIn' className="input input-bordered w-full max-w-xs" />
                    <label className="label ">
                        <span className="label-text">Facebook</span>
                    </label>
                    <input onChange={() => setOnChange(true)} type='text' name='facebook' className="input input-bordered w-full max-w-xs" />











                    <br />

                    <input disabled={!onChange} type='submit' className='btn btn-active w-full max-w-xs' value='Update' />
                </form>
            </div>


        </div>
    );
};

export default MyProfile;