import React from 'react';
import Navbar from './Navbar';

const Error = () => {
    return (
      <div>
        <Navbar />
        <div style={{backgroundColor: '#ff3424', color: '#fff', fontSize: 48}}>
          <h1>Error!!!</h1>
          <h6>you've been directed here because an Error occured.</h6>
        </div>
      </div>
    );
};

export default Error;
