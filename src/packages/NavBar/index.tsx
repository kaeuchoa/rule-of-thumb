import React, { useState } from 'react';

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`} role='menu'>
        <a href="/trials">Past Trials</a>
        <a href="/about">How it works</a>
        <a href="/login">Login/Sign up</a>
      </div>
      <button className="menu-toggle" aria-label='toggle menu' onClick={handleMenuToggle}/>
    </nav>
  );
};

export default Navbar;
