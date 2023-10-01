// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='logo-container'>
      <NavLink exact to='/'>
        <div id='logo-name-container'>
        {/* <i class="fa-brands fa-airbnb fa-2xl"></i> */}
        <i className="fa-solid fa-mug-hot fa-2xl"></i>
          <h1>CoffeeBnb</h1>
        </div>
      </NavLink>

      {/* <div id='create-spot-container'>
        <div id='spot-link'>
          {sessionUser && (
            <NavLink className='nav-link' exact to='/spots'>
              <p>Create a New Spot</p>
            </NavLink>
          )}
        </div>
      </div> */}
{/*
      {sessionUser && (
        <div id='create-spot-container'>
          <NavLink className='spot-link' exact to='/spots'>
            <p>Create a New Spot</p>
          </NavLink>
        </div>
      )} */}

      {isLoaded && (
        <div id='nav-container'>
          <i className="fa-solid fa-bars"></i>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
