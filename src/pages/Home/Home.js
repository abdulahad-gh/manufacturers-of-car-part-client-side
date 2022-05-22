import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import OurParts from './OurParts';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <Banner />
            <OurParts />
            <BusinessSummary />
            <Reviews />
        </div>
    );
};

export default Home;