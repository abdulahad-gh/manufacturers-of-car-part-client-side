import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const ManageProducts = () => {
    const { data: products, isLoading, refetch } = useQuery('products', () => fetch('http://localhost:5000/parts', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return
    }

    const handleDelete = (id, name) => {
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data);
                toast.success(`successfully product  ${name} is deleted`)
            })
    }
    return (
        <div className='mt-14 lg:mt-20'>
            <h1 className='text-center text-2xl lg:text-2xl'>Manage products</h1>


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
                        {products?.map((product, i) => <>
                            <tr key={i}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={product.img} alt={product.part} />
                                    </div>
                                </div></td>
                                <td>{product.part}</td>
                                <td>{product.price}</td>
                                <td>
                                    <label for="delete-product" className="btn  btn-xs btn-error">Delete</label>

                                    <input type="checkbox" id="delete-product" className="modal-toggle" />
                                    <div className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">are you sure deleted <span className='text-red-500 font-bold'>
                                                {product.part}</span> product</h3>
                                            <p className="py-4">remember! if you delete. after you again add It </p>
                                            <div className="modal-action">
                                                <label onClick={() => handleDelete(product._id, product.partName)} for="delete-product" className="btn btn-xs btn-error">Delete</label>
                                                <label for="delete-product" className="btn btn-xs btn-info">Cancel</label>
                                            </div>
                                        </div>
                                    </div>
                                </td>


                            </tr>
                        </>

                        )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;