import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useQuery, useQueryClient } from 'react-query';
import { logout } from '../services/auth.service';

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
  { href: '/?category=sports', label: 'sports' },
  { href: '/?category=tech', label: 'technology' },
  { href: '/?category=design', label: 'design' },
  { href: '/?category=food', label: 'food' },
  { href: '/?category=science', label: 'science' },
];

const Navbar = () => {
  const { user } = useAuth();
  const naviagte = useNavigate();
  const [showProfileNavigation, setShowProfileNavigation] = useState(false);
  const queryClient = useQueryClient();

  const handleShowProfileNavigationEnter = () => {
    setShowProfileNavigation(true);
  };
  const handleShowProfileNavigationLeave = () => {
    setShowProfileNavigation(false);
  };

  const { refetch } = useQuery('logout', logout, {
    enabled: false,
    onSuccess() {
      queryClient.invalidateQueries('auth');
      naviagte('/');
      window.location.reload();
    },
  });

  const handleLogout = () => {
    refetch();
  };

  return (
    <nav>
      <div className="flex items-center justify-between p-3">
        <Link to="/">
          <img
            src="/images/blog-black.png"
            alt="app logo"
            className="h-10 w-full"
          />
        </Link>
        <div className="flex gap-3 items-center">
          <ul className="flex items-center gap-3">
            {links.map((link) => (
              <li
                key={link.href}
                className="capitalize font-light transition hover:text-[teal]"
              >
                <Link to={link.href}>{link.label} </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <>
              <div
                className="relative"
                onMouseEnter={handleShowProfileNavigationEnter}
                onMouseLeave={handleShowProfileNavigationLeave}
              >
                <span className="text-lg cursor-pointer hover:text-teal-400">
                  {user?.name}
                </span>
                {showProfileNavigation && (
                  <div className="absolute top-full border rounded z-10 bg-white w-32">
                    <Link
                      to={'/my-blogs'}
                      className="text-black text-base w-fit"
                    >
                      <div className=" hover:bg-light-green px-5 py-2 cursor-pointer w-full">
                        My Blogs
                      </div>
                    </Link>
                    <div
                      className="flex items-center gap-3 hover:bg-light-green px-5 py-2 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <button className="text-black text-lg">logout</button>
                    </div>
                  </div>
                )}
              </div>
              <Link
                className="border border-[teal] text-[teal] rounded px-5 py-1 transition-all hover:bg-[teal] hover:text-white tracking-wide"
                to="/create-blog"
              >
                Write
              </Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
