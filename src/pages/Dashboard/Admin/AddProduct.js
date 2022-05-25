import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorageKeyImgbb = '4908b6d81e75a6e7fe3061d6a1ab2068';

    const onSubmit = async data => {
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
                    fetch('http://localhost:5000/add-product', {
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
                            }
                            else {
                                toast.error('Failed to add the product');
                            }
                        })

                }

            })
    }



    return (
        <div className="mt-14 lg:mt-20">
            <h2 className=" text-2xl lg:text-2xl">Add a New Product</h2>
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
    );
};

export default AddProduct;