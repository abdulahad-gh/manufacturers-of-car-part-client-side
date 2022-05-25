import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='mt-40 px-4'>
            <div className='flex flex-col gap-10 lg:flex-row justify-evenly items-center'>
                <div>
                    <p className='text-4xl'><span className='text-red-400'>404</span> page not found!! <br />
                        try to correct.
                    </p>
                    <Link to='/' className='btn btn-sm mt-4'>Click to Home</Link>
                </div>
                <div>
                    <img className='w-8a0' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqtaCnz9ReDvtj_1DjO_2RgbTwaLRjHXJkFQ&usqp=CAU" alt="404Img" />
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;