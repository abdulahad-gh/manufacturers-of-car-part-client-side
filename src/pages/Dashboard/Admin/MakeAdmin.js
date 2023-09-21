import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Spinner from '../../Shared/Spinner';

const MakeAdmin = () => {
    const [loading, setLoading] = useState(true)

    const { data, refetch ,isLoading,isError} = useQuery('findAllUser', () => fetch('https://fair-gold-bull-tam.cyclic.app/user/all', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        setLoading(false)
        return res.json()
    }))

    const makeAdmin = (email) => {
        setLoading(true)
        fetch(`https://fair-gold-bull-tam.cyclic.app/user/admin/${email}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status) {
                    refetch()
                    setLoading(false)
                    toast.success('successfully make an admin')
                }
            })
    }
 
    if(loading || isLoading){
        return <Spinner  spinnerTitle='make admin' />
       }
       if(isError){
        console.log(isError)
       }
    return (
        <div className='mt-10 px-2 lg:px-5 bg-gray-200 rounded-md p-4'>
            <h1 className='text-2xl text-center'>Make Admin </h1>

            <div className='mt-5'>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.data?.map((user, i) => <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.role ==='admin' ? 'admin' : 'user'}</td>
                                    <td>{user.role === 'admin' ? <i class="fa-solid fa-circle-check">already admin</i> : <button onClick={() => makeAdmin(user.email)} className="btn btn-xs">Make Admin</button>}</td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;