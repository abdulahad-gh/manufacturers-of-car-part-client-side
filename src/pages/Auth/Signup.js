import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import auth from '../../firebase-init';

const Signup = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, , loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);



    if (loading || loadingGoogle) {
        return
    }
    let signInError;
    if (error || errorGoogle) {
        signInError = <p className='text-red-500'>{error?.message || errorGoogle?.message}</p>
    }





    const onSubmit = async data => {
        const { name, email, password, confirmPassword } = data
        if (email === confirmPassword) {
            await createUserWithEmailAndPassword(email, password)
        }
        else {
            alert("your password don't matched")
        }

    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-xl">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>

                        <input {...register("name", {
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



                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>

                        <input {...register("email", {
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


                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", {
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

                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input {...register("confirmPassword", {
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
                        <input type='submit' className='btn btn-active w-full' value='Sign Up' />
                    </form>
                    <p className='text-center'><small>already have an account? <Link className='text-primary ' to='/'>LogIn</Link></small></p>
                    <div className="divider">OR</div>
                    <button className="btn btn-outline" onClick={() => signInWithGoogle()}>CONTINUE WITH GOOGLE</button>


                </div>
            </div>

        </div>
    );
};

export default Signup;