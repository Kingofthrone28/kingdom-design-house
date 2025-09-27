import React from 'react';

const EmailIcon = ({ className = "w-5 h-5", fill = "#ffd700" }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '16px', height: '16px' }}
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
};

export default EmailIcon;