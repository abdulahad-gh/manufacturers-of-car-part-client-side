import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <h2 className='text-primary text-4xl'>Dashboard</h2>
                <Outlet />
                {/* <!-- Page content here --> */}


            </div>
            <div className="drawer-side mt-24">
                <label for="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>My Profile </Link></li>
                    <li><Link to='/dashboard/orders'>My Orders</Link></li>
                    <li><Link to='/dashboard/addReview'>Add A Review</Link></li>


                </ul>

            </div>
        </div>
    );
};

export default Dashboard;