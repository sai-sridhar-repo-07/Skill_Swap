import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-100 text-gray-700 py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="text-2xl font-bold text-gray-800">
          SkillSwap<span className="text-pink-400">.</span>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900 transition">Home</Link>
          <Link to="/about" className="hover:text-gray-900 transition">About</Link>
          <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
          <Link to="/faq" className="hover:text-gray-900 transition">FAQ</Link>
        </div>

        {/* Socials */}
        <div className="flex gap-4 text-xl text-gray-600">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaTwitter />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
