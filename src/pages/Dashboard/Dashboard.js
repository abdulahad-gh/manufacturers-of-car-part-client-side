import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase-init';
import useAdmin from '../../Hooks/useAdmin';


const Dashboard = () => {
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user)
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-4 mt-10">

                <Outlet />


            </div>
            <div className="drawer-side mt-20 lg:mt-20">
                <label for="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu lg:p-4 bg-gray-600 text-white text-sm overflow-y-auto w-40 lg:w-53 ">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'><i class="fa-solid fa-address-card"></i> My Profile </Link></li>
                    {!admin ? <>
                        <li><Link to='/dashboard/myOrders'><i class="fa-solid fa-cart-shopping"></i>My Orders</Link></li>
                        <li><Link to='/dashboard/addReview'><i class="fa-solid fa-star"></i>Add A Review</Link></li>
                    </>

                        :
                        <>
                            <li><Link to='/dashboard/manageAllOrders'><i class="fa-solid fa-list-check"></i> Manage All Orders</Link></li>
                            <li><Link to='/dashboard/addProduct'><i class="fa-solid fa-circle-plus"></i>Add A Product</Link></li>
                            <li><Link to='/dashboard/makeAdmin'><i class="fa-brands fa-mandalorian"></i>Make Admin</Link></li>
                            <li><Link to='/dashboard/manageProducts'><i class="fa-solid fa-bars-progress"></i>Manage Products</Link></li>
                        </>}


                </ul>

            </div>

        </div>
    );
};

export default Dashboard;