import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel";
import ContactForm from "./components/ContactForm";
import Gallery from "./components/Gallery";
import AnimatedSection from "./components/AnimatedSection";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  FileText,
} from "lucide-react";
import { useLanguage } from "./contexts/LanguageContext";
import client, { urlFor } from "./Lib/sanityClient.js";

function App() {
  const [heroData, setHeroData] = useState({
    phrase1: { en: "", pt: "" },
    phrase2: { en: "", pt: "" },
  });
  const [menuData, setMenuData] = useState({
    title: "",
    pdfUrl: "",
    description: "",
  });
  const [galleryData, setGalleryData] = useState({
    title: "",
    images: [] as { url: string; alt: string }[],
  });
  const [roomData, setRoomData] = useState({
    images: [],
  });
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    hours: [],
  });
  const [scrollY, setScrollY] = useState(0);
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToMenu = () => {
    const menuSection = document.querySelector("#menu");
    if (menuSection) {
      const navbarHeight = 96;
      const elementPosition = menuSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const query = `*[_type == "heroText"][0]{
          phrase1,
          phrase2
        }`;

        const data = await client.fetch(query);

        setHeroData({
          phrase1: data.phrase1,
          phrase2: data.phrase2,
        });
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const query = `*[_type == "menu"][0]{
          title,
          description,
          pdfFile {
            asset->{
              _id,
              url
            }
          }
        }`;

        const data = await client.fetch(query);
        const pdfUrl = data.pdfFile?.asset?.url || "";

        setMenuData({
          title: data.title,
          pdfUrl: pdfUrl,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const query = `*[_type == "gallery"][0]{
          title,
          images[] {
            asset->{
              _id,
              url
            },
            alt
          }
        }`;

        const data = await client.fetch(query);

        const cmsImages = data?.images?.map((image: any) => ({
          url: urlFor(image.asset).url(),
          alt: image.alt || (language === 'pt' 
            ? 'Fotos do restaurante La Fiorentina - Restaurante italiano em Lisboa, Bairro Alto' 
            : 'La Fiorentina restaurant photos - Italian restaurant in Lisbon, Bairro Alto'),
        })) || [];

        // Fallback images to ensure 10 images for the gallery (1 featured + 9 for 3x3 grid)
        const fallbackImages = [
          {
            url: '/gallery-fallback.jpg',
            alt: language === 'pt'
              ? 'Interior do restaurante La Fiorentina - Restaurante italiano em Lisboa, Bairro Alto'
              : 'La Fiorentina restaurant interior - Italian restaurant in Lisbon, Bairro Alto'
          },
        ];

        // Combine CMS images with fallback, ensure 10 images minimum (1 featured + 9 for 3x3)
        const allImages = cmsImages.length >= 10 ? cmsImages : [...cmsImages, ...fallbackImages].slice(0, 10);

        setGalleryData({
          title: data?.title || '',
          images: allImages,
        });
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGalleryData();
  }, [language]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const query = `*[_type == "ourRoomGallery"][0]{
          images[] {
            asset->{
              _id,
              url
            },
            caption
          }
        }`;

        const data = await client.fetch(query);

        const images = data.images.map((image: any) => ({
          url: urlFor(image.asset).url(),
          caption: image.caption || "",
        }));

        setRoomData({
          images: images,
        });
      } catch (error) {
        console.error("Error fetching room gallery data:", error);
      }
    };

    fetchRoomData();
  }, []);

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

  const getTranslatedHours = (hours: any[]) => {
    if (!hours || hours.length === 0) return null;

    return hours.map((hour) => {
      if (language === "pt") {
        return hour.pt;
      }
      return hour.en;
    });
  };

  return (
    <div className="font-sans bg-cream overflow-x-hidden">
      <Navbar />

      <main id="main-content">
        {/* ==========================================
            HERO SECTION - Luxurious with Parallax
           ========================================== */}
        <section
          id="inicio"
          ref={heroRef}
          className="relative min-h-screen overflow-hidden"
        >
          {/* Parallax Background */}
          <div
            className="absolute inset-0 w-full h-[120%]"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            <img
              src="/hero-bg.jpg"
              alt="La Fiorentina - Interior do restaurante italiano em Lisboa, Bairro Alto"
              className="absolute inset-0 w-full h-full object-cover ken-burns"
              loading="eager"
              decoding="async"
              width="2840"
              height="1894"
            />
          </div>

          {/* Content */}
          <div className="relative min-h-screen flex items-center justify-center text-white px-4 z-10">
            <div className="max-w-4xl text-center">
              {/* Subtitle */}
              <div className="mb-6 animate-fade-in-down" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <span className="inline-block text-gold/90 text-sm tracking-[0.3em] uppercase font-light">
                  Ristorante Italiano
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-7xl md:text-8xl lg:text-9xl mb-6 animate-fade-in-up font-display text-white" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                La Fiorentina
              </h1>

              {/* Decorative line */}
              <div className="flex items-center justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
                <span className="w-24 h-px bg-gold/60" />
              </div>

              {/* Dynamic phrases */}
              {heroData.phrase1[language] && (
                <p className="text-xl md:text-2xl font-serif italic text-white/90 mb-3 animate-fade-in-up" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
                  {heroData.phrase1[language]}
                </p>
              )}
              {heroData.phrase2[language] && (
                <p className="text-base md:text-lg text-white/60 font-light tracking-wide animate-fade-in-up" style={{ animationDelay: '1.1s', animationFillMode: 'both' }}>
                  {heroData.phrase2[language]}
                </p>
              )}

              {/* CTA Button */}
              <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '1.3s', animationFillMode: 'both' }}>
                <a
                  href="#menu"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToMenu();
                  }}
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:shadow-lg"
                >
                  <FileText size={18} />
                  {t("menu.discover")}
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            onClick={handleScrollToMenu}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          >
            <div className="scroll-indicator group-hover:border-primary transition-colors duration-300" />
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
        </section>

        {/* ==========================================
            MENU SECTION - Elegant Asymmetric Layout
           ========================================== */}
        <section id="menu" className="py-24 md:py-32 bg-cream relative overflow-hidden" aria-labelledby="menu-heading">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Section Header */}
            <AnimatedSection animation="fade-up" className="text-center mb-16">
              <span className="text-gold text-sm tracking-ultra-wide uppercase mb-4 block">
                Gastronomia Italiana
              </span>
              <h2 id="menu-heading" className="text-5xl md:text-6xl font-serif italic text-secondary title-decorated">
                {t("menu.title")}
              </h2>
            </AnimatedSection>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text Content */}
              <AnimatedSection animation="fade-right" delay={200}>
                <div className="space-y-8">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {t("menu.description")}
                  </p>

                  {/* Features list */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { text: language === 'pt' ? "Massas Frescas" : "Fresh Pasta" },
                      { text: language === 'pt' ? "Pizza Artesanal" : "Artisan Pizza" },
                      { text: language === 'pt' ? "Vinhos Italianos" : "Italian Wines" },
                      { text: language === 'pt' ? "Sobremesas Caseiras" : "Homemade Desserts" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-elegant hover:shadow-elegant-lg transition-all duration-300"
                      >
                        <span className="font-medium text-secondary">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href="https://drive.google.com/file/d/1UaKU7XOqNlnKFHlqpEQ8_C-0psoLeWfb/view?usp=sharing"
                    className="btn-luxury btn-glow inline-flex items-center gap-3 bg-secondary text-white px-10 py-4 rounded-full text-lg font-medium tracking-wide"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText size={22} />
                    {t("menu.discover")}
                  </a>
                </div>
              </AnimatedSection>

              {/* Image */}
              <AnimatedSection animation="fade-left" delay={400}>
                <div className="relative">
                  {/* Decorative frame */}
                  <div className="absolute -inset-4 border-2 border-gold/20 rounded-3xl" />
                  <div className="absolute -inset-8 border border-gold/10 rounded-3xl" />

                  <div className="image-zoom rounded-2xl overflow-hidden shadow-elegant-xl">
                    <img
                      src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80"
                      alt={language === 'pt' 
                        ? 'Cozinha italiana autêntica do La Fiorentina - Restaurante italiano em Lisboa' 
                        : 'Authentic Italian kitchen at La Fiorentina - Italian restaurant in Lisbon'}
                      className="w-full aspect-[4/5] object-cover"
                      width="800"
                      height="1000"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -left-6 bg-primary text-white px-6 py-4 rounded-2xl shadow-elegant-lg">
                    <p className="text-sm font-medium opacity-80">{language === 'pt' ? 'Desde' : 'Since'}</p>
                    <p className="text-3xl font-serif italic">1985</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ==========================================
            GALLERY SECTION - Immersive Masonry
           ========================================== */}
        <section id="galeria" className="py-24 md:py-32 bg-secondary/5 relative overflow-hidden" aria-labelledby="gallery-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <AnimatedSection animation="fade-up" className="text-center mb-16">
              <span className="text-gold text-sm tracking-ultra-wide uppercase mb-4 block">
                {language === 'pt' ? 'Nossa Coleção' : 'Our Collection'}
              </span>
              <h2 id="gallery-heading" className="text-5xl md:text-6xl font-serif italic text-secondary title-decorated">
                {language === "pt" ? "Galeria" : "Gallery"}
              </h2>
              <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto">
                {language === 'pt'
                  ? 'Descubra os sabores e a atmosfera única do La Fiorentina'
                  : 'Discover the flavors and unique atmosphere of La Fiorentina'}
              </p>
            </AnimatedSection>

            {/* Gallery Component */}
            <AnimatedSection animation="scale" delay={200}>
              <Gallery images={galleryData.images} />
            </AnimatedSection>
          </div>
        </section>

        {/* ==========================================
            OUR ROOM SECTION - Elegant Showcase
           ========================================== */}
        <section id="sala" className="py-24 md:py-32 bg-cream relative overflow-hidden" aria-labelledby="room-heading">
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <AnimatedSection animation="fade-up" className="text-center mb-16">
              <span className="text-gold text-sm tracking-ultra-wide uppercase mb-4 block">
                {language === 'pt' ? 'Ambiente' : 'Ambiance'}
              </span>
              <h2 id="room-heading" className="text-5xl md:text-6xl font-serif italic text-secondary title-decorated">
                {t("room.title")}
              </h2>
            </AnimatedSection>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Carousel */}
              <AnimatedSection animation="fade-right" delay={200}>
                <ImageCarousel images={roomData.images} showKenBurns height="550px" />
              </AnimatedSection>

              {/* Text Content */}
              <AnimatedSection animation="fade-left" delay={400}>
                <div className="space-y-8">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {t("room.description")}
                  </p>

                  {/* Rating Card */}
                  <a
                    href="https://www.google.com/search?sa=X&sca_esv=f0158aba78c19323&rlz=1C5CHFA_enNL1119NL1119&sxsrf=AE3TifOxskwThfay9TN7EEN9A1CEd1HMUA:1765555800762&q=La+Fiorentina+Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NDIxMzAxNrU0NjOxNLIwNTY13sDI-IpRyCdRwS0zvyg1ryQzL1HBsSyzeBErFkEAB1qibUQAAAA&rldimm=1246043593649285353&tbm=lcl&hl=fr-PT&ved=2ahUKEwixrNfyt7iRAxW3gf0HHSSEODoQ9fQKegQIVxAG&biw=2280&bih=1308&dpr=1.5#lkt=LocalPoiReviews&lrd=0xd1933171ce63867:0x114ad60bee1de8e9,3,,,,"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-elegant p-8 block hover:shadow-elegant-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 ${star <= 4 ? 'text-gold fill-gold' : 'text-gold'}`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-serif italic text-secondary underline decoration-2 decoration-gold/50 group-hover:decoration-gold transition-colors cursor-pointer">
                        4,82/5
                      </span>
                      <span className="text-gray-500 underline decoration-1 decoration-gray-400 group-hover:decoration-gray-600 transition-colors cursor-pointer">
                        {language === 'pt' ? '2826 avis' : '2826 reviews'} {t("room.rating")}
                      </span>
                    </div>
                    <blockquote className="text-lg italic text-gray-600 border-l-4 border-gold pl-4">
                      "{t("room.review")}"
                    </blockquote>
                  </a>

                  {/* Location highlight */}
                  <div className="flex items-center gap-4 p-6 bg-secondary/5 rounded-2xl">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary">Bairro Alto</p>
                      <p className="text-gray-600">{language === 'pt' ? 'Coração histórico de Lisboa' : 'Historic heart of Lisbon'}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ==========================================
            CONTACT SECTION - Modern & Elegant
           ========================================== */}
        <section id="contato" className="py-24 md:py-32 bg-white relative overflow-hidden" aria-labelledby="contact-heading">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-1/4" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Section Header */}
            <AnimatedSection animation="fade-up" className="text-center mb-16">
              <span className="text-gold text-sm tracking-ultra-wide uppercase mb-4 block">
                {language === 'pt' ? 'Entre em Contato' : 'Get in Touch'}
              </span>
              <h2 id="contact-heading" className="text-5xl md:text-6xl font-serif italic text-secondary title-decorated">
                {t("contact.title")}
              </h2>
            </AnimatedSection>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact Info */}
              <AnimatedSection animation="fade-right" delay={200}>
                <div className="space-y-8">
                  {/* Location Card - Clickable to Google Maps */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=La+Fiorentina+R.+de+São+Pedro+de+Alcântara+65+Lisboa+Portugal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-elegant p-8 block hover:shadow-elegant-lg transition-all duration-300 group cursor-pointer"
                  >
                    <h3 className="text-2xl font-serif italic mb-6 text-secondary flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      {t("contact.how.to.reach")}
                    </h3>
                    <div className="space-y-2 text-gray-600 group-hover:text-gray-800 transition-colors">
                      <p className="font-semibold text-lg text-secondary">La Fiorentina</p>
                      <p>R. de São Pedro de Alcântara 65</p>
                      <p>Bairro Alto, Lisboa</p>
                      <p>Portugal</p>
                    </div>
                    <p className="mt-4 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      {language === 'pt' ? 'Ver no Google Maps' : 'View on Google Maps'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </p>
                  </a>

                  {/* Contact Details Card */}
                  <div className="card-elegant p-8">
                    <h3 className="text-2xl font-serif italic mb-6 text-secondary flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      {t("contact.talk.to.us")}
                    </h3>
                    <div className="space-y-4">
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="flex items-center gap-4 p-4 rounded-xl bg-cream hover:bg-primary/5 transition-colors duration-300 group"
                      >
                        <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{contactInfo.phone}</span>
                      </a>

                      <div className="flex items-start gap-4 p-4 rounded-xl bg-cream">
                        <Clock className="w-5 h-5 text-primary mt-1" />
                        <div className="space-y-1">
                          {contactInfo.hours && contactInfo.hours.length > 0 && (
                            <>
                              {getTranslatedHours(contactInfo.hours)?.map(
                                (hour, index) => (
                                  <p key={index} className="text-gray-600">{hour}</p>
                                )
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Contact Form */}
              <AnimatedSection animation="fade-left" delay={400}>
                <div className="card-elegant p-8 md:p-10">
                  <h3 className="text-2xl font-serif italic mb-8 text-secondary">
                    {language === 'pt' ? 'Envie uma Mensagem' : 'Send a Message'}
                  </h3>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Map */}
            <AnimatedSection animation="scale" delay={600} className="mt-16">
              <div className="rounded-2xl overflow-hidden shadow-elegant-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.275259750262!2d-9.144994684685773!3d38.71472537959791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19338e21f11ab1%3A0x1d94d0fb5f5b6ae5!2sR.%20de%20S%C3%A3o%20Pedro%20de%20Alc%C3%A2ntara%2065%2C%201250-238%20Lisboa%2C%20Portugal!5e0!3m2!1spt!2spt!4v1645541234567!5m2!1spt!2spt"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={language === 'pt'
                    ? 'Mapa de localização do restaurante La Fiorentina - Rua de São Pedro de Alcântara 65, Bairro Alto, Lisboa'
                    : 'La Fiorentina restaurant location map - Rua de São Pedro de Alcântara 65, Bairro Alto, Lisbon'}
                  aria-label={language === 'pt'
                    ? 'Mapa interativo mostrando a localização do La Fiorentina no Bairro Alto'
                    : 'Interactive map showing La Fiorentina location in Bairro Alto'}
                />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
