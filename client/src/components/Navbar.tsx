// src/components/Navbar.tsx

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { logout } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Skills', path: '/explore' },
    { name: 'Offer Session', path: '/offer' },
    { name: 'My Sessions', path: '/sessions' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-50 via-sky-50 to-pink-50 shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          SkillSwap
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex items-center gap-6 transition-all duration-300 ${
            isOpen ? 'block mt-4' : 'hidden'
          } md:block`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block md:inline-block text-gray-700 hover:text-indigo-600 text-base font-medium px-2 py-1 transition-all duration-150"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-white/70 hover:bg-white text-gray-800 px-4 py-2 rounded-md shadow-sm border transition"
            >
              <User className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link
              to="/signin"
              className="mt-3 md:mt-0 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
