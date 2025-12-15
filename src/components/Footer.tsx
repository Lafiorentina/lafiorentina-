import React, { useEffect, useState, useRef } from "react";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import client from "../Lib/sanityClient.js";

const Footer = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    hours: [],
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      const query = `*[_type == "openingHours"][0]{
            phone,
            email,
            hours[] {
              en,
              pt
            }
          }`;

      try {
        const data = await client.fetch(query);
        setContactInfo({
          phone: data.phone,
          email: data.email,
          hours: data.hours,
        });
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-secondary text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Main Footer Content */}
      <div className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div>
                <img
                  src="/logo.png"
                  alt={language === 'pt'
                    ? 'Logo La Fiorentina - Restaurante Italiano em Lisboa'
                    : 'La Fiorentina Logo - Italian Restaurant in Lisbon'}
                  className="h-16 w-auto mb-4 brightness-0 invert"
                  width="813"
                  height="307"
                />
                <div className="w-16 h-1 bg-primary rounded-full" />
              </div>
              <p className="text-white/70 leading-relaxed">{t("footer.experience")}</p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/lafiorentina_pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={22} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-gold" />
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-4">
                {[
                  { label: t("nav.home"), href: "#inicio" },
                  { label: t("nav.menu"), href: "#menu" },
                  { label: language === 'pt' ? 'Galeria' : 'Gallery', href: "#galeria" },
                  { label: t("nav.contact"), href: "#contato" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-gold" />
                {t("footer.contact")}
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://maps.google.com/?q=R.+de+São+Pedro+de+Alcântara+65,+Bairro+Alto,+Lisboa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors duration-300 group"
                  >
                    <MapPin size={20} className="flex-shrink-0 mt-1 text-primary group-hover:scale-110 transition-transform" />
                    <span>R. de São Pedro de Alcântara 65<br />Bairro Alto, Lisboa</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300 group"
                  >
                    <Phone size={20} className="text-primary group-hover:scale-110 transition-transform" />
                    {contactInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300 group"
                  >
                    <Mail size={20} className="text-primary group-hover:scale-110 transition-transform" />
                    {contactInfo.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Opening Hours Preview */}
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-gold" />
                {language === 'pt' ? 'Horário' : 'Hours'}
              </h4>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-white/90 font-medium mb-3">
                  {language === 'pt' ? 'Aberto todos os dias' : 'Open every day'}
                </p>
                <p className="text-gold text-lg font-serif italic">12:00 - 23:00</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a
                    href="#contato"
                    onClick={(e) => handleNavClick(e, '#contato')}
                    className="text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {language === 'pt' ? 'Ver detalhes completos →' : 'See full details →'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60 text-center md:text-left">
              © {new Date().getFullYear()} La Fiorentina. {t("footer.rights")}
            </p>
            <p className="text-sm text-white/60">
              {t("footer.madeWith")}{" "}
              <a
                href="https://propulseo-site.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors font-medium"
              >
                Propul'SEO
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
