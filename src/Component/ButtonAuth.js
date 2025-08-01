import React from 'react';
import './ButtonAuth.css';

const ButtonAuth = ({ label = 'Log In' }) => {
  const isRegister = label.toLowerCase() === 'register';

  return (
    <div className="auth-wrapper">
      <div aria-label={`${label} Button`} tabIndex={0} role="button" className="user-profile">
        <div className="user-profile-inner">
          {isRegister ? (

            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15 14a6 6 0 1 0-6 0 8 8 0 0 0-6 7 1 1 0 0 0 1 1h8.26a7.87 7.87 0 0 1-.26-2 8 8 0 0 1 5-7.42zm-6-2a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm13 7h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z" />
            </svg>
          ) : (
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
            </svg>
          )}
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default ButtonAuth;
