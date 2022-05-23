import { getSuggestedQuery } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const Purchase = () => {
    const { id } = useParams()
    const [part, setPart] = useState({});
    const { part: partName, img, desc, price, minQuan, availableQuan } = part;
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [quantityError, setQuantityError] = useState('');
    useEffect(() => {
        (async () => {
            const part = await axios.get(`http://localhost:5000/part/${id}`)
            setPart(part.data)
        })()


    }, [id])



    const handleQuantity = e => {
        const userQuantity = parseInt(e.target.value)

        if (minQuan > userQuantity) {
            setQuantityError(`minimum quantity ${minQuan}`)
        }
        else if (availableQuan < userQuantity) {
            setQuantityError(`maximum quantity ${availableQuan}`)

        }
        else {
            setQuantityError('')
        }

    }

    const onSubmit = async data => {
        const { name, email, password, confirmPassword } = data


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
                    <input placeholder='Name' {...register("name", {
                        required: {
                            value: true,
                            message: 'name is Required'
                        },
                        minLength: {
                            value: 5,
                            message: 'name at least 5 character or longer'
                        }
                    })} type="text" className="input input-bordered w-full max-w-xs" />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>
                        }
                        {errors.name?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.name.message}</span>
                        }
                    </label>


                    <input placeholder='Email' {...register("email", {
                        required: {
                            value: true,
                            message: 'Email is Required'
                        },
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Provide a Valid Email'
                        }
                    })} type="email" className="input input-bordered w-full max-w-xs" />

                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>
                        }
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>
                        }
                    </label>



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