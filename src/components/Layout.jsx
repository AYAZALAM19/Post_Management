import React from 'react';
import Header from './Header/Header';
import Fotter from './Fotter/Fotter';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
    <Header/>
    <Outlet  />
    <Fotter/>
    </>
  )
}

export default Layout