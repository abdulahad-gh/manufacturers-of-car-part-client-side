import React, { useEffect, useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../firebase-init';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [threeReviews, setThreeReviews] = useState([]);
const [user] = useAuthState(auth)
    useEffect(() => {

        fetch('https://manufacturers-of-car-part-server-huce.vercel.app/reviews', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])
    useEffect(() => {
        setThreeReviews(reviews.reverse().slice(0, 3))
    }, [reviews])


    return (

        <section className='mt-16 px-4 md:px-10'>
            <div className=' text-center mb-10'>
                <h2 className='text-2xl '>Reviews</h2>
                <p>what client say?</p>
            </div>


            <div className='flex  lg:justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {
                        threeReviews.map(review => <div>
                                <div className='flex items-center gap-5'>
                                    <img className='rounded-full w-[40px] h-[40px]' src={review?.ownerImg }  />
                                <p>{review?.reviewOwner}</p>

                                </div>

                            <div class="flex items-center mb-1">
                                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <span>{review?.rating}</span>
                            </div>
                            <p class="mb-2 font-light text-gray-500 dark:text-gray-400">{review?.reviewDesc}</p>
                        </div>)
                    }

                </div>
            </div>

        </section>


    );
};

export default Reviews;
