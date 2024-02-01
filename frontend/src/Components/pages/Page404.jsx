import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => (
  <>
    <h1>TIGRA cannot find this Page</h1>
    <p>
      <Link to="/">Return on the main Page</Link>
    </p>
  </>
);

export default Page404;
