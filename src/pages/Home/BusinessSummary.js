import React from 'react';

const BusinessSummary = () => {
    return (
        <section className='mt-36 px-2 lg:px-10 '>
            <div className=' text-center mb-10'>
                <h2 className='text-2xl'>Business Summary</h2>
                <p className='text-cyan-500'>Why With us?</p>
            </div>

            <div className='px-2 md-px-5 lg:px-20 pt-20 bg-cyan-500 rounded-sm'>
                <div class="grid grid-cols-1 lg:grid-cols-3 shadow gap-10 bg-white rounded-lg">

                    <div class="stat  py-10">
                        <div class="stat-figure ">
                            <i class="fa-solid fa-handshake text-6xl text-primary"></i>
                        </div>
                        <div class="stat-title">Client Satisfy</div>
                        <div class="stat-value text-primary">200+</div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure">
                            <i class="fa-solid fa-trailer text-6xl text-secondary"></i>
                        </div>
                        <div class="stat-title">Our Parts</div>
                        <div class="stat-value text-secondary">40+</div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure">
                            <div class="w-30 rounded-full">
                                <i class="fa-solid fa-sack-dollar text-6xl text-black"></i>
                            </div>
                        </div>
                        <div class="stat-title">Monthly income</div>

                        <div class="stat-value ">$10000+</div>
                    </div>

                </div>
                <div className='flex flex-col lg:flex-row justify-center gap-4  py-10 px:-4 lg:px-20 text-white '>
                    <p className='text-4xl '>Feel free to work with us</p>
                    <button className='btn'>Contact Now</button>
                </div>
            </div>


        </section>


    );
};

export default BusinessSummary;