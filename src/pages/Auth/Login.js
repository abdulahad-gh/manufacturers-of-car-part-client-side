import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase-init';
import useToken from '../../Hooks/useToken';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);
    const [userAuth] = useAuthState(auth)
    const [token] = useToken(user || userGoogle)
    const navigate = useNavigate()
    const location = useLocation()
    const [spinner, setSpinner] = useState(false)
    const from = location.state?.from?.pathname || '/';
    if (userAuth) {

        navigate(from, { replace: true });

    }

    useEffect(() => {
        if (token) {
            setSpinner(false)
            navigate('/')
        }

    }, [token])


    if (loading || loadingGoogle || spinner) {
        return <Spinner spinnerTitle='Login' />
    }
    let signInError

    if (error || errorGoogle) {
        signInError = <p className='text-red-500'>{error?.message || errorGoogle?.message}</p>
    }



    const onSubmit = data => {
        setSpinner(true)
        const { email, password } = data
        signInWithEmailAndPassword(email, password)
        setSpinner(false)

    };
    return (
        <div className='flex justify-center items-center h-screen mt-10'>
            <PageTitle title='Login' />

            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-xl">LogIn</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Provide a Valid Email'
                            }
                        })} type="email" placeholder="Enter Email" className="input input-bordered w-full max-w-xs" />

                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>
                            }
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>
                            }
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

                            type="password" placeholder="Enter Password" className="input input-bordered w-full max-w-xs" />

                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>
                            }
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>
                            }

                        </label>

                        {signInError}
                        <p><small>forget password? <span>Reset</span></small> </p>
                        <input type='submit' className='btn btn-primary w-full' value='LogIn' />
                    </form>
                    <p className='text-center'><small>No Account? <Link className='text-primary' to='/signup'>Create new account</Link></small></p>
                    <div className="divider">OR</div>
                    <button className="btn btn-outline btn-primary" onClick={() => signInWithGoogle()}>CONTINUE WITH GOOGLE</button>


                </div>
            </div>

        </div>
    );
};

export default Login;