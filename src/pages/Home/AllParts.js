import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Spinner from '../Shared/Spinner';

const AllParts = () =>{
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(()=>{

        (async()=>{
            const data = await fetch('https://fair-gold-bull-tam.cyclic.app/parts',{
                method:'GET',
                headers:{
                    'authorization':`Bearer ${localStorage.getItem('accessToken')}`
                }
            })

            const res = await data.json()
            console.log(res);
        })()

    },[])
    
    useEffect(() => {
        (async () => {
            const partsData = await axios.get('https://fair-gold-bull-tam.cyclic.app/parts', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            setLoading(false)
            setParts(partsData.data.payload)
        })()
        
        
    }, [])
    console.log(parts,'____');
    
    if(!parts || loading ){
        return <Spinner/>
    }
    console.log(parts)
    return (
        <section

            className='mt-16 px-2 lg:px-10'>
            <h2 className='text-2xl text-center mb-10'>Our all   Parts</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {parts?.map(part => <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure className='w-[300px] h-[300px]'><img className='w-full h-full object-cover ' src={part?.img} alt="Album" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">{part?.part}</h2>
                        <p>{part?.desc?.slice(0, 50)}</p>
                        <p>${part?.price}</p>
                        <p>Minimum Order:{part?.minQuan}</p>
                        <p>Available Quantity:{part?.availableQuan}</p>
                        <div class="card-actions justify-end">
                            <button onClick={() => navigate(`/purchase/${part?._id}`)} class="btn btn-primary ">Purchase</button>
                        </div>
                    </div>
                </div>

                )}
            </div>
        </section>
    )
}

export default AllParts;