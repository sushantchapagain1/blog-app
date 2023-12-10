import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
