import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import auth from '../../firebase-init';

const Navbar = ({ children }) => {
    const [user] = useAuthState(auth)
    const { pathname } = useLocation()


    return (
        <div class='drawer  drawer-end'>
            <input id='my-drawer-3' type='checkbox' class='drawer-toggle' />
            <div class='drawer-content flex flex-col'>
                <div class='w-full  navbar bg-base-100 fixed z-50 top-0 lg:px-20'>
                    {pathname.includes('/dashboard') && <div >
                        <label tabIndex="1" for="dashboard-sidebar" className="btn p-1 btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>}


                    <div class='flex-1 lg:px-2 lg:mx-2 text-xl md:text-2xl'>Manufacturers Of Car Part</div>
                    <div class='flex-none lg:hidden'>
                        <label for='my-drawer-3' class='btn btn-square btn-ghost'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                class='inline-block w-6 h-6 stroke-current'
                            >
                                <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                ></path>
                            </svg>
                        </label>
                    </div>

                    <div class='flex-none hidden lg:block'>
                        <ul class='menu menu-horizontal gap-x-2'>
                            <li>
                                <NavLink to='/' className='rounded-lg'>
                                    Home
                                </NavLink>
                            </li>
                            {user && <li>
                                <NavLink to='/dashboard' className='rounded-lg'>
                                    Dashboard
                                </NavLink>
                            </li>}
                            <li>
                                <NavLink to='/blogs' className='rounded-lg'>
                                    Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/myPortfolio' className='rounded-lg'>
                                    My Portfolio
                                </NavLink>
                            </li>
                            <li>
                                {user ? <button onClick={() => signOut(auth)} className='rounded-lg  btn-outline'>
                                    LogOut
                                </button>

                                    :

                                    <Link to='/login' className='rounded-lg  btn-outline'>
                                        LogIn
                                    </Link>}
                            </li>


                        </ul>
                    </div>
                </div>
                {children}

            </div>
            <div class='drawer-side'>
                <label for='my-drawer-3' class='drawer-overlay'></label>
                <ul class='menu p-4 overflow-y-auto w-70 md:w-80 bg-base-100'>
                    <li>
                        <NavLink to='/' className='rounded-lg'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard' className='rounded-lg'>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/blogs' className='rounded-lg'>
                            Blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/myPortfolio' className='rounded-lg'>
                            My Portfolio
                        </NavLink>
                    </li>
                    <li>
                        <button to='/login' className='rounded-lg '>
                            LogIn
                        </button>
                    </li>


                </ul>
            </div>

        </div>
    );
};

export default Navbar;