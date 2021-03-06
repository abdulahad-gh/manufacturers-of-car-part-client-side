import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Contact from './Contact';
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
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;