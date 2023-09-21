import React, { useState } from "react";
import Footer from "../Shared/Footer";
import PageTitle from "../Shared/PageTitle";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import Contact from "./Contact";
import HowWeWork from "./HowWeWork";
import OurParts from "./OurParts";
import Reviews from "./Reviews";
import Spinner from "../Shared/Spinner";

const Home = () => {
  const [spinner, setSpinner] = useState(true);

  setTimeout(() => {
    setSpinner(false);
  }, 500);

  return (
    <>
      <PageTitle title="Home" />

      <Banner />
      {spinner ? (
        <Spinner />
      ) : (
        <div>
          <OurParts />
          <BusinessSummary />
          <Reviews />
          <HowWeWork />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
