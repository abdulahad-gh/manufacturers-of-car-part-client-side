import React from 'react';
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';

const ManageAllOrders = () => {
    const { data: allOrders, isLoading, refetch } = useQuery('getAllOrders', () => fetch('https://manufacturers-of-car-part-server.vercel.app/all-orders', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading) {
        return
    }
    const handlePendingStatus = id => {
        fetch(`https://manufacturers-of-car-part-server.vercel.app/pending-status-change/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch()
                    toast.success('order complete')
                }
                else {
                    toast.error('something wrong..')
                }
            });
    }
    const handleDelete = (id, name) => {


        fetch(`https://manufacturers-of-car-part-server.vercel.app/order/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                toast.success(`successfully order  ${name} is deleted`)
            })
    }

    return (

        <div className='mt-10 px-2 lg:px-5 bg-gray-200 rounded-md p-4'>
            <h1 className='text-center text-2xl lg:text-2xl'>My Orders</h1>


            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Item</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Remove Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders?.map((order, i) => <>
                            <tr key={i}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={order?.img} alt={order.part} />
                                    </div>
                                </div></td>
                                <td>{order?.partName}</td>
                                <td>{order?.email}</td>
                                <td>{order?.price}</td>

                                {
                                    order.paid ?
                                        <td >{order.orderComplete ? <span className='text-success'>Shipped</span> : 'pending..'}</td>
                                        :
                                        <td className='text-red-400'>unpaid</td>
                                }


                                {(order.price && !order.paid) ? <td>
                                    <label for="delete-order" className="btn btn-xs btn-outline btn-error">Delete</label>

                                    <input type="checkbox" id="delete-order" className="modal-toggle" />
                                    <div className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">are you sure deleted <span className='text-red-500 font-bold'>
                                                {order.partName}</span> order?</h3>
                                            <p className="py-4">remember! if you delete. after you again add It </p>
                                            <div className="modal-action">
                                                <label onClick={() => handleDelete(order._id, order.partName)} for="delete-order" className="btn btn-xs btn-error">Delete</label>
                                                <label for="delete-order" className="btn btn-xs btn-info">Cancel</label>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                    :
                                    <td>{
                                        order.orderComplete ? <span className='text-success'>order complete</span> :
                                            <button onClick={() => handlePendingStatus(order._id)} className='btn btn-xs btn-success'>Confirm</button>
                                    }</td>
                                }


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

export default ManageAllOrders;