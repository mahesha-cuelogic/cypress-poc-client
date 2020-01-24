import React from 'react';

export default () => {
    return (
    <div style={{ width: '100%', minHeight: '100%' }}>
     <iframe src="http://localhost:3000" style={{ width: '100%', minHeight: '100%', position: 'absolute' }} >
      <p>Your browser does not support iframes.</p>
    </iframe>
    </div>);
}