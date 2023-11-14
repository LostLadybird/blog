import { Outlet } from 'react-router-dom';

import Header from '../header';

import './layout.css';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="main__page">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
