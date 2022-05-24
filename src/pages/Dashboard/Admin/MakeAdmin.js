import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const MakeAdmin = () => {
    const { data: users, refetch } = useQuery('findAllUser', () => fetch('http://localhost:5000/users', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    const makeAdmin = (email) => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success('successfully make an admin')
                }
            })
    }

    return (
        <div>
            <h1>Make Admin </h1>

            <div>
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
                                    <td>{!user.admin && <button onClick={() => makeAdmin(user.email)} className="btn btn-xs">Make Admin</button>}</td>
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