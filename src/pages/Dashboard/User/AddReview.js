import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase-init'



const AddReview = () => {
    const [user, loading] = useAuthState(auth)

    if (loading) {
        return <p>loading user...</p>

    }
    const handleAddReviewForm = e => {
        e.preventDefault()

        const reviewContent = {
            ownerImg:user?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzri5HzFJVMDMZH42QE8koVyDJOesYg5QUQg&usqp=CAU',
            reviewOwner: user?.displayName || 'Name Not Available',
            rating: e.target.reviewNumber.value,
            reviewDesc: e.target.reviewDesc.value
        }





        fetch('https://manufacturers-of-car-part-server-side-git-main-abdulahad-gh.vercel.app/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,

            },
            body: JSON.stringify(reviewContent)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Review add success')
                }
                else {
                    toast.error('please, try again')
                }
            });


    }

    return (
        <div className='mt-10 px-2 lg:px-5 bg-gray-200 rounded-md p-4'>
            <h2 className='text-center text-2xl lg:text-2xl'>Add Review</h2>

            <div>
                <form className='mt-3 px-2' onSubmit={handleAddReviewForm}>
                    <select className='input my-4 input-bordered w-full max-w-xs' name='reviewNumber'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                    </select>
                    <br />
                    <textarea placeholder='enter your review description' className='w-full max-w-xs border resize-none p-2' r name="reviewDesc" id="" cols="30" rows="10"></textarea>
                    <br />



                    <input type='submit' className='btn btn-primary w-full mt-5 max-w-xs ' value='Add Review' />
                </form>
            </div>

        </div>
    );
};

export default AddReview;
