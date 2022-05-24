import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase-init';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L19j3JpfOx2cnrFLrjt9NZmex6eVQr73f3wZflXmhadJnvzsXNJyji3zLIdABX588kUxgUc24I2nAdBTTWvIP1K00XW3FXwKz')

const Payment = () => {
    const [user, loading] = useAuthState(auth)
    const { orderId } = useParams()
    const { data: item, isLoading } = useQuery('orderFind', () => (fetch(`http://localhost:5000/order/${orderId}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })).then(res => res.json()))
    console.log(user);
    if (isLoading || loading) {
        return
    }

    return (

        <div className='pl-10'>



            <div className="card -base-100 w-80  shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">hello  <span className='text-purple-600'>{user?.displayName}</span></h2>
                    <p>your <span className='text-red-600'>{item?.partName} </span> is ready to pay.</p>
                    <p>pay $<span className='text-primary'>{item?.price}</span></p>


                </div>
            </div>

            <div className="card my-20 w-80 bg-base-100 shadow-xl">
                <div className='card-body  '>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm item={item} ></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>

    );
};

export default Payment;