import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OurParts = () => {
    const [parts, setParts] = useState([]);
    useEffect(() => {
        (async () => {
            const parts = await axios.get('https://stormy-castle-37919.herokuapp.com/parts', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setParts(parts.data)
        })()


    }, [])
    const navigate = useNavigate()
    return (
        <section

            className='mt-16 px-2 lg:px-10'>
            <h2 className='text-2xl text-center mb-10'>Our Parts</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {parts?.map(part => <div class="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img className='w[100%]' src={part.img} alt="Album" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">{part.part}</h2>
                        <p>{part.desc.slice(0, 50)}</p>
                        <p>${part.price}</p>
                        <p>Minimum Order:{part.minQuan}</p>
                        <p>Available Quantity:{part.availableQuan}</p>
                        <div class="card-actions justify-end">
                            <button onClick={() => navigate(`/purchase/${part._id}`)} class="btn btn-primary ">Purchase</button>
                        </div>
                    </div>
                </div>

                ).reverse().slice(0, 4)}
            </div>
        </section>
    );
};

export default OurParts;