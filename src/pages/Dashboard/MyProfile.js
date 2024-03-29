import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase-init';
import Spinner from '../Shared/Spinner';

const MyProfile = () => {
    const [updateProfile, updating, errorUpdating] = useUpdateProfile(auth);
    const [user, loading] = useAuthState(auth)
    const [userdata, setUserdata] = useState({
        education:'',
        institution:'',
        country:'',
        streetAddress:'',
        phoneNumber:'',
        linkedIn:'',
        facebook:'',


    })
    let updatedUser = user;
    const [countries, setCountries] = useState([]);
    const [onCustomChange, setOnCustomChange] = useState(false)
    const [spinner, setSpinner] = useState(false);

    const navigate = useNavigate()

    // useEffect(() => {
    //     (async () => {
    //         const me = await axios.get('https://fair-gold-bull-tam.cyclic.app/user/me',{
    //             headers:{
    //                 authorization:`Bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         } )
    //         updatedUser = {...updatedUser,...me.data.data,phoneNumber:me.data.data.phoneNumber}
    //     })()

    // }, [])

    useEffect(() => {
        (async () => {
            const countries = await axios.get('https://restcountries.com/v3.1/all')
            setCountries(countries.data)
        })()

    }, [])



    if (loading || spinner) {
        return <Spinner />
    }
console.log(updatedUser)
console.log(updateProfile)

    const handleUserProfile = e => {
        setSpinner(true)
        e.preventDefault()

        let name
        if(user.displayName === e.target.name.value){
            name = undefined;
        }else{
            name = e.target.name.value
            updateProfile({displayName:name})
        }

        const userProfileInfo = {
            name,
            education: e.target.education.value,
            institution: e.target.institution.value,
            address: `${e.target.streetAddress.value} ${e.target.country.value}`,
            phoneNumber: e.target.phoneNumber.value,
            socialLinks:  { linkedin: e.target.linkedIn.value,
                facebook: e.target.facebook.value,}

        }
        fetch(`https://fair-gold-bull-tam.cyclic.app/user/update-user-info/${user.email}`, {
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
                    setOnCustomChange(false)
                }

            })

    };
    console.log(userdata.education);
    return (
        <div className='mt-10 px-2 lg:px-5 bg-gray-200 rounded-md p-4'>
            <h1 className=' text-2xl text-center'>My Profile</h1>


            <div className='flex justify-center mt-5'>
                <form onSubmit={handleUserProfile}>
                    <p><strong>Note:</strong> hey {user?.displayName} you can't change name and email.</p>



                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>

                    <div className='flex gap-5' ><input disabled={!onCustomChange}  placeholder={user?.displayName} type="text" name='name' className="input input-bordered w-full max-w-md" /> 
                    
                {onCustomChange ? 
                <span className='btn btn-success btn-sm' onClick={()=>{setOnCustomChange(!onCustomChange)}}  >Update name </span>
                :
                <span className='btn btn-gray btn-sm' onClick={()=>setOnCustomChange(!onCustomChange)}  >Edit name </span>
                }
                    </div>



                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>

                    <input disabled value={user?.email} type="email" className="input input-bordered w-full max-w-md" />



                    <label className="label mt-4">
                        <span className="label-text text-2xl">Education</span>
                        {(userdata.education || userdata.institution) &&
                <span className='btn btn-gray btn-sm' onClick={()=>{setOnCustomChange(!onCustomChange)
                setUserdata({...userdata,education:'',institution:''})
                
                }}  >Edit education </span>
                        
                        }
                    </label>

                    <label className="label">
                        <span className="label-text">Select your Education degree</span>
                    </label>

                  {
                    (!userdata.education || !userdata.institution) === true? <>  <select onChange={(e) =>{ setOnCustomChange(true)
                        setUserdata({...userdata,education:e.target.value})
                    }} name='education'  value={userdata.education} className="input input-bordered w-full max-w-md">


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


            <select onChange={(e) =>{ setOnCustomChange(true)
                        setUserdata({...userdata,institution:e.target.value})
                    }}  name='institution' className="input input-bordered w-full max-w-md">

                <option value="Abdul Kadir Mollah City College">Abdul Kadir Mollah City College</option>
                <option value="Adamjee Cantonment College">Adamjee Cantonment College</option>
                <option value="Adhyapak Abdul Majid College">Adhyapak Abdul Majid College</option>
                <option value="Aeronautical College of Bangladesh	">Aeronautical College of Bangladesh	</option>
                <option value="Aeronautical Institute of Bangladesh">Aeronautical Institute of Bangladesh</option>
                <option value="Agricultural University College, Mymensingh">Agricultural University College, Mymensingh</option>

            </select>

</>

                :
                <div className=''> 
                <input type='text' value={userdata.education} onChange={e => setUserdata({...userdata, education : e.target.value})}  />
                <input type='text' value={userdata.institution}  />
                </div>

                  }

                    


                    <label className="label mt-4">
                        <span className="label-text text-2xl">Present Address</span>
                    </label>
                    <label className="label">
                        <span className="label-text ">Select your Country</span>
                    </label>


                    <select onChange={() => setOnCustomChange(true)} name='country' className="input input-bordered w-full max-w-md">
                        {
                            countries?.map(countrie => <option value={countrie?.name?.common}>{countrie?.name?.common}</option>)
                        }
                    </select>

                    <label className="label">
                        <span className="label-text ">Street Address</span>
                    </label>
                    <input onChange={() => setOnCustomChange(true)} type='text' name='streetAddress' className="input input-bordered w-full max-w-md" />

                    <label className="label mt-4">
                        <span className="label-text text-2xl">phone number</span>
                    </label>
                    <input onChange={(e) =>{ setOnCustomChange(true)
                    
                    setUserdata({...userdata,phoneNumber:e.target.value})
                    
                    }} type='tel' name='phoneNumber' value={updatedUser.phoneNumber ? updatedUser.phoneNumber : userdata?.phoneNumber} className="input input-bordered w-full max-w-md" />

                    <label className="label mt-4">
                        <span className="label-text text-2xl">External profile link</span>
                    </label>
                    <label className="label ">
                        <span className="label-text">LinkedIn </span>
                    </label>
                    <input onChange={() => setOnCustomChange(true)} type='text' name='linkedIn' className="input input-bordered w-full max-w-md" />
                    <label className="label ">
                        <span className="label-text">Facebook</span>
                    </label>
                    <input onChange={() => setOnCustomChange(true)} type='text' name='facebook' className="input input-bordered w-full max-w-md" />











                    <br />

                    <input disabled={!onCustomChange} type='submit' className='btn my-10 btn-active w-full max-w-md' value='Update' />
                </form>
            </div>


        </div>
    );
};

export default MyProfile;