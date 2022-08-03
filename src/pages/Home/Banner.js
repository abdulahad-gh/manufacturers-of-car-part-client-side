import React from 'react';

const Banner = () => {
    return (
        <div className="md:bg-[url('https://www.kfz-kl.de/images/Werkstatt-Axel-Schneider.jpg')] h-screen bg-no-repeat bg-cover ">
            <div className='bg-black w-full h-screen opacity-50  flex items-center justify-center '>
                <h1 data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000" className='text-4xl md:text-5xl text-white px-4 font-bold'>You Are Looking best part of Car? <br />
                    now you are right place
                </h1>
            </div>
        </div>
    );
};

export default Banner;