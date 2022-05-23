import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../firebase-init';

const MyOrders = () => {
    const [user, loading] = useAuthState(auth)
    const [orders, setOrders] = useState([])



    useEffect(() => {

        if (user) {
            fetch(`http://localhost:5000/orders?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => setOrders(data))

        }
    }, [user])

    if (loading) {
        return <p>loading....</p>
    }


    // if (loading) {
    //     return
    // }
    return (
        <div className='mt-14 lg:mt-20'>
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
                        {orders?.map((order, i) => <>
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
                                <td>
                                    {(order.price && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs btn-success'>pay</button></Link>}
                                    {(order.price && order.paid) && <div>
                                        <p><span className='text-success'>Paid</span></p>
                                        <p>Transaction id: <span className='text-success'>{order.transactionId}</span></p>
                                    </div>}
                                </td>
                                {(order.price && !order.paid) && <td><button className='btn btn-xs btn-warning' >Delete</button></td>}


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

export default MyOrders;