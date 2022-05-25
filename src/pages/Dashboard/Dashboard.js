import { async } from '@firebase/util';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase-init';
import useAdmin from '../../Hooks/useAdmin';


const Dashboard = () => {
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user)
    console.log(admin);
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-4 mt-10">

                <Outlet />


            </div>
            <div className="drawer-side mt-14 lg:mt-20">
                <label for="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu lg:p-4  text-sm overflow-y-auto w-40 lg:w-90 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>My Profile </Link></li>
                    {!admin ? <>
                        <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                        <li><Link to='/dashboard/addReview'>Add A Review</Link></li>
                    </>

                        :
                        <>
                            <li><Link to='/dashboard/manageAllOrders'>Manage All Orders</Link></li>
                            <li><Link to='/dashboard/addProduct'>Add A Product</Link></li>
                            <li><Link to='/dashboard/makeAdmin'>Make Admin</Link></li>
                            <li><Link to='/dashboard/manageProducts'>Manage Products</Link></li>
                        </>}


                </ul>

            </div>

        </div>
    );
};

export default Dashboard;