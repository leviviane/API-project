// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='logo-bar'>
      <NavLink exact to='/'>
        <div id='logo-name-bar'>
        <i class="fa-brands fa-airbnb"></i>
          <h1>Vivbnb</h1>
        </div>
      </NavLink>

      {isLoaded && (
        <div id='nav-bar'>
          <i className="fa-solid fa-bars"></i>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
