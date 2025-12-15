import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);

      // Track active section
      const sections = ['inicio', 'menu', 'galeria', 'sala', 'contato'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const menuItems = [
    { label: t('nav.home'), href: '#inicio', id: 'inicio' },
    { label: t('nav.menu'), href: '#menu', id: 'menu' },
    { label: t('nav.gallery'), href: '#galeria', id: 'galeria' },
    { label: t('nav.contact'), href: '#contato', id: 'contato' }
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 96;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        element.focus({ preventScroll: true });
      }
      setIsOpen(false);
    }
  };

  return (
    <header role="banner">
      {/* Background with glassmorphism */}
      <div
        className={`fixed w-full h-24 z-40 transition-all duration-500 ${
          hasScrolled
            ? 'bg-secondary/90 backdrop-blur-md shadow-elegant'
            : 'bg-transparent'
        }`}
        aria-hidden="true"
      />

      <nav className="fixed w-full z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0 z-50 relative">
              <a
                href="#inicio"
                onClick={handleClick}
                className="block py-2 transition-transform duration-300 hover:scale-105"
                aria-label="La Fiorentina - Back to home"
              >
                <img
                  src="/logo.png"
                  alt={t('nav.home') === 'Início'
                    ? 'Logo La Fiorentina - Restaurante Italiano Autêntico em Lisboa, Bairro Alto'
                    : 'La Fiorentina Logo - Authentic Italian Restaurant in Lisbon, Bairro Alto'}
                  className="h-16 md:h-20 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-300 brightness-0 invert"
                  width="813"
                  height="307"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleClick}
                  className={`relative text-white font-medium tracking-wide transition-all duration-300 py-2 group ${
                    activeSection === item.id ? 'text-primary' : 'hover:text-primary'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3 md:gap-4">
              <LanguageSwitcher />

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-menu"
              >
                <div className="relative w-6 h-5 flex flex-col justify-center items-center">
                  <span
                    className={`absolute h-0.5 w-6 bg-white rounded-full transform transition-all duration-300 ${
                      isOpen ? 'rotate-45' : '-translate-y-2'
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
                      isOpen ? 'opacity-0 scale-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-6 bg-white rounded-full transform transition-all duration-300 ${
                      isOpen ? '-rotate-45' : 'translate-y-2'
                    }`}
                  />
                </div>
              </button>

              {/* Desktop Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 group"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <span className="text-sm font-medium tracking-wider uppercase">Menu</span>
                <div className="relative w-5 h-4 flex flex-col justify-center items-center">
                  <span
                    className={`absolute h-0.5 w-5 bg-white rounded-full transform transition-all duration-300 ${
                      isOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-3 bg-white rounded-full transition-all duration-300 ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-5 bg-white rounded-full transform transition-all duration-300 ${
                      isOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Fullscreen Menu Overlay */}
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-50 transition-all duration-500 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          {/* Background with blur */}
          <div className="absolute inset-0 bg-secondary/95 backdrop-blur-lg" />

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group z-10"
            aria-label="Close menu"
          >
            <X size={28} className="text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Menu content */}
          <nav className="relative flex flex-col items-center justify-center min-h-screen px-4">
            {/* Logo in menu */}
            <div className={`mb-12 transition-all duration-500 delay-100 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              <span className="text-gold text-sm tracking-ultra-wide uppercase">Ristorante Italiano</span>
            </div>

            {/* Menu items */}
            <ul className="space-y-2 md:space-y-4 text-center" role="menu">
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  role="none"
                  className={`transition-all duration-500 ${
                    isOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: isOpen ? `${150 + index * 75}ms` : '0ms' }}
                >
                  <a
                    href={item.href}
                    onClick={handleClick}
                    className={`inline-block text-4xl md:text-6xl font-serif italic py-3 px-8 transition-colors duration-300 ${
                      activeSection === item.id ? 'text-primary' : 'text-white hover:text-primary'
                    }`}
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Bottom decorative line */}
            <div className={`mt-16 flex items-center gap-4 transition-all duration-500 delay-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="w-12 h-px bg-gold/50" />
              <span className="text-gold/60 text-xs tracking-widest uppercase">Bairro Alto, Lisboa</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;