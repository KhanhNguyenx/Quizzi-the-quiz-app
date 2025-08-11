import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  FileText,
  Home,
  BookOpen,
  ChevronDown,
  SquareAsterisk,
  Newspaper,
} from "lucide-react";
import "./LayoutDefault.scss";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function LayoutDefault() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mock data - replace with your actual implementation
  const isLogin = useSelector((state) => state.loginReducer);
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".header__nav")) {
        setIsMobileMenuOpen(false);
      }
      if (
        isProfileDropdownOpen &&
        !event.target.closest(".header__profile-dropdown")
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, isProfileDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Mock NavLink component - replace with actual react-router-dom NavLink
  const NavLink = ({ to, children, className, end, onClick }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  );

  const Link = ({ to, children, className }) => (
    <a href={to} className={className}>
      {children}
    </a>
  );

  return (
    <div className="layout">
      <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
        <div className="header__container">
          <div className="header__logo">
            <Link to="/" className="logo">
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.oQlJtqtY4Zwyzj0w0vyTbgHaHa?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="QuizMaster Logo"
                className="logo__image"
              />
              <span className="logo__text">QuizMaster</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="header__nav header__nav--desktop">
            <ul className="nav__menu">
              <li className="nav__item">
                <NavLink to="/" end className="nav__link">
                  <Home size={18} />
                  <span>Home</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/topics" className="nav__link">
                  <BookOpen size={18} />
                  <span>Topics</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/flashcards" className="nav__link">
                  <Newspaper size={18} />
                  <span>Flashcards</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/blogs" className="nav__link">
                  <SquareAsterisk size={18} />
                  <span>Blogs</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="header__auth">
            {isLogin ? (
              <div className="header__profile-dropdown">
                <button
                  className="profile__trigger"
                  onClick={toggleProfileDropdown}
                  aria-expanded={isProfileDropdownOpen}
                >
                  <div className="profile__avatar">
                    <User size={20} />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`profile__chevron ${
                      isProfileDropdownOpen ? "profile__chevron--open" : ""
                    }`}
                  />
                </button>

                <div
                  className={`profile__dropdown ${
                    isProfileDropdownOpen ? "profile__dropdown--open" : ""
                  }`}
                >
                  <NavLink
                    to="/profile"
                    className="dropdown__item"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </NavLink>
                  <NavLink
                    to="/answers"
                    className="dropdown__item"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <FileText size={16} />
                    <span>My Answers</span>
                  </NavLink>
                  <hr className="dropdown__divider" />
                  <NavLink
                    to="/logout"
                    className="dropdown__item dropdown__item--danger"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className="auth__buttons">
                <NavLink to="/login" className="btn btn--ghost">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn--primary">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`header__nav header__nav--mobile ${
            isMobileMenuOpen ? "header__nav--open" : ""
          }`}
        >
          <ul className="nav__menu nav__menu--mobile">
            <li className="nav__item">
              <NavLink
                to="/"
                end
                className="nav__link"
                onClick={closeMobileMenu}
              >
                <Home size={18} />
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/topics"
                className="nav__link"
                onClick={closeMobileMenu}
              >
                <BookOpen size={18} />
                <span>Topics</span>
              </NavLink>
            </li>

            {/* Mobile Auth Links */}
            <li className="nav__divider"></li>
            {isLogin ? (
              <>
                <li className="nav__item">
                  <NavLink
                    to="/profile"
                    className="nav__link"
                    onClick={closeMobileMenu}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to="/answers"
                    className="nav__link"
                    onClick={closeMobileMenu}
                  >
                    <FileText size={18} />
                    <span>My Answers</span>
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to="/logout"
                    className="nav__link nav__link--danger"
                    onClick={closeMobileMenu}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav__item">
                  <NavLink
                    to="/login"
                    className="nav__link"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to="/register"
                    className="nav__link nav__link--primary"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="header__overlay" onClick={closeMobileMenu}></div>
        )}
      </header>
      <main className="main">
        {/* Your <Outlet /> component will go here */}
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <Outlet />
        </div>
      </main>
      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} Quizzi. Created by KHANHNGUYENX. All
          rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LayoutDefault;
