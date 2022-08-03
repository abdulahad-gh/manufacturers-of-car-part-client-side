import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{title} | Manufacturers Of Car Part</title>
        </Helmet>
    );
};

export default PageTitle;