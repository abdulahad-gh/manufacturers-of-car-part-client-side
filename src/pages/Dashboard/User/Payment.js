import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase-init';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L19j3JpfOx2cnrFLrjt9NZmex6eVQr73f3wZflXmhadJnvzsXNJyji3zLIdABX588kUxgUc24I2nAdBTTWvIP1K00XW3FXwKz')

const Payment = () => {
    const [user, loading] = useAuthState(auth)
    const { orderId } = useParams()
    const { data: item, isLoading } = useQuery('orderFind', () => (fetch(`https://manufacturers-of-car-part-server-production.up.railway.app/order/${orderId}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })).then(res => res.json()))
    if (isLoading || loading) {
        return
    }

    return (

        <div className="px-2 pt-20 md:px-20 bg-[url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGF5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500')] bg-no-repeat bg-cover rounded">
            <div className='flex flex-col md:flex-row justify-evenly items-center h-screen md:gap-28'>

                <div className="card bg-white w-full shadow-xl">
                    <div className="p-4">
                        <h2 className="text-2xl">Hello  <span className='text-purple-600'>{user?.displayName}</span></h2>
                        <p>your <span className='text-purple-500'>{item?.partName} </span> is ready to pay.</p>
                        <p>pay $<span className='text-primary'>{item?.price}</span></p>


                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-2xl">
                    <div className='card-body'>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm item={item} ></CheckoutForm>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Payment;