import React from 'react';
import Navbar from '../../components/navbar';

function LoggedArea({ children }) {
  return (
    <div id="logged-area-container">
      <Navbar />
      <div id="logged-area-children">
	{children}
      </div>
    </div>
  );
}

export default LoggedArea;
