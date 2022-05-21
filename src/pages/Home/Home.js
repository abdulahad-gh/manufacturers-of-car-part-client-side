import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import OurParts from './OurParts';

const Home = () => {
    return (
        <div>
            <Banner />
            <OurParts />
            <BusinessSummary />
        </div>
    );
};

export default Home;