import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OurParts = () => {
    const [parts, setParts] = useState([]);
    useEffect(() => {

        fetch('parts.json')
            .then(res => res.json())
            .then(data => {
                setParts(data)

            })

    }, [])
    console.log(parts);
    return (
        <section className='mt-40 px-10'>
            <h2 className='text-2xl text-center mb-10'>Our Parts</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {parts.map(part => <div class="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img src={part.img} alt="Album" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">{part.part}</h2>
                        <p>{part.desc.slice(0, 50)}</p>
                        <p>${part.price}</p>
                        <p>Minimum Order:{part.minQuan}</p>
                        <p>Available Quantity:{part.availableQuan}</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Listen</button>
                        </div>
                    </div>
                </div>

                )}
            </div>
        </section>
    );
};

export default OurParts;