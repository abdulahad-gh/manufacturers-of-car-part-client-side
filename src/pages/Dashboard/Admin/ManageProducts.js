import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Spinner from '../../Shared/Spinner';

const ManageProducts = () => {
    const { data: products, isLoading, refetch } = useQuery('products', () => fetch('https://manufacturers-of-car-part-server.up.railway.app/parts', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    const handleDelete = (id, name) => {
        fetch(`https://manufacturers-of-car-part-server.up.railway.app/product/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                toast.success(`successfully product  ${name} is deleted`)
            })
    }
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='mt-10 px-2 lg:px-5 bg-gray-200 rounded-md p-4'>
            <h1 className='text-center text-2xl'>Manage products</h1>


            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Remove Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <td><div className="avatar">
                                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={product.img} alt={product.part} />
                                </div>
                            </div></td>
                            <td>{product.part}{product._id}</td>
                            <td>{product.price}</td>
                            <td>
                                <label for="remove-product" className="btn  btn-xs btn-error">Delete</label>

                                <input type="checkbox" id="remove-product" className="modal-toggle" />
                                <div className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">are you sure deleted <span className='text-red-500 font-bold'>
                                            {product.part}</span> product</h3>
                                        <p className="py-4">remember! if you delete. after you again add It </p>
                                        <div className="modal-action">
                                            <label onClick={() => handleDelete(product._id, product.part)} for="remove-product" className="btn btn-xs btn-error">Delete</label>
                                            <label for="remove-product" className="btn btn-xs btn-info">Cancel</label>
                                        </div>
                                    </div>
                                </div>
                            </td>


                        </tr>


                        )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;