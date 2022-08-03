import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase-init';
import useToken from '../../Hooks/useToken';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';

const Signup = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user
        ,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);
    //updateName. When user signUp email and password
    const [updateProfile, updating, errorUpdating] = useUpdateProfile(auth);

    //spinner state
    const [spinner, setSpinner] = useState(false);

    const [token] = useToken(user || userGoogle)
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate('/')
        }

    }, [token, navigate])

    if (loading || loadingGoogle || updating || spinner) {
        if (spinner) {
            return <Spinner spinnerTitle='creating account...' />
        }
        else {
            return <Spinner />
        }
    }
    let signInError;
    if (error || errorGoogle) {
        signInError = <p className='text-red-500'>{error?.message || errorGoogle?.message}</p>
    }
    if (errorUpdating) {
        console.log(errorUpdating);
    }
    const onSubmit = async data => {
        setSpinner(true)
        const { name, email, password, confirmPassword } = data
        if (password === confirmPassword) {
            await createUserWithEmailAndPassword(email, password)
            await updateProfile({ displayName: name })

        }
        else {
            alert("your password don't matched")
        }
        setSpinner(false)

    };
    return (
        <div className='flex justify-center items-center h-screen mt-20  md:mt-10'>
            <PageTitle title='SignUp' />

            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-xl">Sign Up</h2>

                    <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>



                        <input placeholder='Name' {...register("name", {
                            required: {
                                value: true,
                                message: 'name is Required'
                            },
                            minLength: {
                                value: 5,
                                message: 'name at least 5 character or longer'
                            }
                        })} type="text" className="input input-bordered w-full max-w-xs" />

                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>
                            }
                            {errors.name?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.name.message}</span>
                            }
                        </label>


                        <input placeholder='Email' {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Provide a Valid Email'
                            }
                        })} type="email" className="input input-bordered w-full max-w-xs" />

                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>
                            }
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>
                            }
                        </label>



                        <input placeholder='Password' {...register("password", {
                            required: {
                                value: true,
                                message: 'Password is Required'
                            },
                            minLength: {
                                value: 6,
                                message: 'must be 6 characters or longer'
                            }
                        })}

                            type="password" className="input input-bordered w-full max-w-xs" />

                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>
                            }
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>
                            }

                        </label>


                        <input placeholder='Confirm Password' {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: 'Password is Required'
                            },
                            minLength: {
                                value: 6,
                                message: 'must be 6 characters or longer'
                            },

                        })}

                            type="password" className="input input-bordered w-full max-w-xs" />



                        {signInError}
                        <input type='submit' className='btn btn-primary w-full mt-5' value='Sign Up' />
                    </form>
                    <p className='text-center'><small>already have an account? <Link className='text-primary ' to='/login'>LogIn</Link></small></p>
                    <div className="divider">OR</div>
                    <button className="btn btn-outline btn-primary" onClick={() => signInWithGoogle()}>CONTINUE WITH GOOGLE</button>


                </div>
            </div>

        </div>
    );
};

export default Signup;