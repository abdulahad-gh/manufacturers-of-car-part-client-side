import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import HowWeWork from './HowWeWork';
import OurParts from './OurParts';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <Banner />
            <OurParts />
            <BusinessSummary />
            <Reviews />
            <HowWeWork />
        </div>
    );
};

export default Home;