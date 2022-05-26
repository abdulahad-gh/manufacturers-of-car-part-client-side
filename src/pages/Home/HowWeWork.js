import React from 'react';

const HowWeWork = () => {
    return (
        <section className='mt-40 px-2 lg:px-10'>
            <h2 className='text-2xl text-center mb-10'>How We <span className='text-primary font-bold'>Works?</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div class="card lg:max-w-lg bg-base-100 shadow-xl image-full">
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR6S9JTrpjJ5Z5HF-axyYvhrXfO1PYE_xRZQ&usqp=CAU" alt="Shoes" /></figure>
                    <div class="card-body p-2 lg:p-8">
                        <h2 class="card-title">Collect</h2>
                        <p>we are collect good instrument to make parts. You Can Easily Find Car Parts</p>
                        <p className='flex-col lg:flex-row gap-2 items-center'><img className='w-8 h-8 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9fAHBAZDOkAYBUlsgaXK6BPZVRWUfw-ByLQ&usqp=CAU" alt="" /> <span className='italic'>Manufacturers Of Car Part</span>
                        </p>

                    </div>
                </div>
                <div class="card lg:max-w-lg bg-base-100 shadow-xl image-full">
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR-aUTmBnSDBzS_DQLCXFAg08RgIa_Er-eBg&usqp=CAU" alt="Shoes" /></figure>
                    <div class="card-body p-2 lg:p-8">
                        <h2 class="card-title">Expert employee</h2>
                        <p>When Work With us. Your product is good always.because we have all expert employee</p>
                        <p className='flex flex-col lg:flex-row gap-2 items-center'><img className='w-8 h-8 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9fAHBAZDOkAYBUlsgaXK6BPZVRWUfw-ByLQ&usqp=CAU" alt="" /> <span className='italic'>Manufacturers Of Car Part</span>
                        </p>

                    </div>
                </div>
                <div class="card lg:max-w-lg bg-base-100 shadow-xl image-full">
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdugAokA4yOHe4V5YeLyl3tc9drscNJ_zVDQ&usqp=CAU" alt="Shoes" /></figure>
                    <div class="card-body p-2 lg:p-8">
                        <h2 class="card-title ">With warranty</h2>
                        <p>30 Day Warranty. Certificate of Limited Warranty Used Parts. A & P Auto Parts, Inc. Warrants All Parts </p>
                        <p className='flex flex-col lg:flex-row gap-2 items-center'><img className='w-8 h-8 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9fAHBAZDOkAYBUlsgaXK6BPZVRWUfw-ByLQ&usqp=CAU" alt="" /> <span className='italic'>Manufacturers Of Car Part</span>
                        </p>

                    </div>
                </div>
            </div>


        </section>
    );
};

export default HowWeWork;