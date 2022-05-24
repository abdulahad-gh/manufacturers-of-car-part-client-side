import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const CheckoutForm = ({ item }) => {
    const { _id, partName, price, email, name, partId } = item;
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    const [proccessing, setProccessing] = useState(false)


    // const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,

            },
            body: JSON.stringify({ price })
        })
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(data => {
                // if (data?.clientSecret) {
                console.log(data);
                setClientSecret(data.clientSecret)
                // }
            })
    }, [price])





    const handleSubmit = async (e) => {
        e.preventDefault()
        setProccessing(true)

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        setCardError(error?.message || '')
        setProccessing(true)



        //confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: name,
                    email: email
                },
            },
        },
        );

        if (intentError) {
            setCardError(intentError?.message)
            setSuccess('')
            setProccessing(false)
            console.log(intentError);

        }
        else {
            setProccessing(false)
            setCardError('')
            toast.success('Payment successfull')


            const payment = {
                orderId: _id,
                partId,
                transactionId: paymentIntent.id,
                partName,
                name,
                email

            }
            console.log(payment)

            fetch(`http://localhost:5000/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })





            // setTimeout(() => {
            //     navigate('/dashboard')
            // }, 5000)
            console.log(paymentIntent);



        }

    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn btn-xs btn-success mt-3' disabled={!stripe}>
                    Pay
                </button>
            </form>

            {
                proccessing && <p className='text-blue-500'>proccessing.....</p>
            }
            {
                cardError && <p className='text-red-600'>{cardError}</p>
            }
            {
                success && <p className='text-green-600'>{success}</p>
            }
        </>
    );
};

export default CheckoutForm;