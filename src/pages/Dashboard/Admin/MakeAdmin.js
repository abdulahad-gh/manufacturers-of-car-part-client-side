import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Spinner from '../../Shared/Spinner';

const MakeAdmin = () => {
    const [loading, setLoading] = useState(true)

    const { data: users, refetch } = useQuery('findAllUser', () => fetch('https://stormy-castle-37919.herokuapp.com/users', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    const makeAdmin = (email) => {
        setLoading(true)
        fetch(`https://stormy-castle-37919.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    setLoading(false)
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    setLoading(false)
                    toast.success('successfully make an admin')
                }
            })
    }
    if (loading) {
        return <Spinner />
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
                                users?.map((user, i) => <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.admin ? 'Admin' : 'User'}</td>
                                    <td>{user.admin ? <i class="fa-solid fa-circle-check"></i> : <button onClick={() => makeAdmin(user.email)} className="btn btn-xs">Make Admin</button>}</td>
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