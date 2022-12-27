import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase-init';

const Purchase = () => {
    const [user] = useAuthState(auth)
    const { id } = useParams()
    const [part, setPart] = useState({});
    const { _id, part: partName, img, desc, price, minQuan, availableQuan } = part;
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [quantity, setQuantity] = useState('');
    const [quantityError, setQuantityError] = useState('');
    useEffect(() => {
        (async () => {
            const part = await axios.get(`https://manufacturers-of-car-part-server.up.railway.app/part/${id}`)
            setPart(part.data)
        })()


    }, [id])


    const handleQuantity = e => {
        const userInputQuantity = parseInt(e.target.value)

        if (minQuan > userInputQuantity) {
            setQuantityError(`minimum quantity ${minQuan}`)
        }
        else if (availableQuan < userInputQuantity) {
            setQuantityError(`maximum quantity ${availableQuan}`)

        }

        else {
            setQuantity(userInputQuantity)
            setQuantityError('')
        }

    }
    const onSubmit = async data => {
        const { name, phone, } = data
        const orderItemInfo = {
            partId: _id,
            partName,
            img,
            price: price * quantity,
            email: user.email,
            name: user.displayName || name,
            phone
        }
        fetch('https://manufacturers-of-car-part-server.up.railway.app/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderItemInfo)

        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success('successfully added orders list')
                }
                else {
                    toast.error('already exists order')
                }
                reset()
            });



    };
    return (
        <section className='mt-28 md:pl-40'>

            <div className='grid grid-cols-1 md:grid-cols-2 '>

                <div class="card lg:max-w-lg bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src={img} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{partName}</h2>
                        <p>{desc?.slice(0, 100)}</p>
                        <p>${price}</p>
                        <p>Minimum Order:{minQuan}</p>
                        <p>Available Quantity:{availableQuan}</p>

                    </div>
                </div>
                {/* {...register("quantity", {
                            required: {
                                value: true,
                                message: 'Quantity is Required'
                            },
                            minLength: {
                                value: 1,
                                message: 'please, add quantity'
                            }
                        })} */}


                <form className='mt-3 px-2' onSubmit={handleSubmit(onSubmit)}>



                    <input name="quan" onChange={handleQuantity} placeholder='Type Quantity here first' type="text" className="input input-bordered w-full max-w-xs" />

                    <label className="label">
                        {quantityError && <span className="label-text-alt text-red-500">{quantityError}</span>
                        }

                    </label>
                    <input placeholder='Enter your Name' disabled={user.displayName} value={user.displayName} readOnly={user.displayName} type="text" className="input input-bordered w-full max-w-xs" />

                    <input disabled value={user.email} readOnly type="email" className="input my-4 input-bordered w-full max-w-xs" />
                    <input placeholder='Phone Number' {...register("phone", {
                        required: {
                            value: true,
                            message: 'Phone Number is Required'
                        },
                        minLength: {
                            value: 11,
                            message: 'Phone number must be 11 characters'
                        }
                    })}

                        type="tel" className="input input-bordered w-full max-w-xs" />

                    <label className="label">
                        {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>
                        }
                        {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>
                        }

                    </label>







                    <input disabled={quantityError} type='submit' className='btn btn-primary w-full mt-5 max-w-xs    ' value='order' />
                </form>



            </div>

        </section >
    );
};

export default Purchase;