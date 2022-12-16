import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Spinner from '../../Shared/Spinner';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [spinner, setSpinner] = useState(false);
    const imageStorageKeyImgbb = '4908b6d81e75a6e7fe3061d6a1ab2068';

    if (spinner) {
        return <Spinner />
    }

    const onSubmit = async data => {
        setSpinner(true)
        const { part, desc, price, availableQuan, minQuan, img } = data
        const productImage = img[0];
        const formData = new FormData();
        formData.append('image', productImage);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKeyImgbb}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const product = {
                        part,
                        desc,
                        price,
                        availableQuan,
                        minQuan,
                        img

                    }

                    // post req to server for save part collection of database 
                    fetch('https://manufacturers-of-car-part-server-production.up.railway.app/add-product', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('product added successfully')
                                reset();
                                setSpinner(false)
                            }
                            else {
                                toast.error('Failed to add the product');
                            }
                        })

                }

            })
    }



    return (
        <div className='mt-10 px-2 lg:px-5 bg-gray-200 rounded-md p-4'>
            <h2 className=" text-2xl text-center">Add a New Product</h2>
            <div className='flex justify-center'>
                <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered w-full max-w-xs"
                            {...register("part", {
                                required: {
                                    value: true,
                                    message: 'Product Name is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.part?.type === 'required' && <span className="label-text-alt text-red-500">{errors.part.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Product Description"
                            className="input input-bordered w-full max-w-xs"
                            {...register("desc", {
                                required: {
                                    value: true,
                                    message: 'Description is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.desc?.type === 'required' && <span className="label-text-alt text-red-500">{errors.desc.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <input
                            type="tel"
                            placeholder="Product Price"
                            className="input input-bordered w-full max-w-xs"
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: 'price is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="tel"
                            placeholder="Available Quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...register("availableQuan", {
                                required: {
                                    value: true,
                                    message: 'Available Quantity is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.availableQuan?.type === 'required' && <span className="label-text-alt text-red-500">{errors.availableQuan.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="tel"
                            placeholder="Minimum Order Quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...register("minQuan", {
                                required: {
                                    value: true,
                                    message: 'Minimum Order Quantity is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.minQuan?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minQuan.message}</span>}
                        </label>
                    </div>



                    <div className="form-control w-full max-w-xs">
                        <input
                            type="file"
                            className="input input-bordered w-full max-w-xs"
                            {...register("img", {
                                required: {
                                    value: true,
                                    message: 'Image is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                        </label>
                    </div>

                    <input className='btn w-full max-w-xs text-white' type="submit" value="Add" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;