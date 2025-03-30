import { ArrowUpRight } from "lucide-react";
import { useLanguage } from '../i18n/LanguageContext';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface BurguerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function BurguerMenu({ isOpen, toggleMenu }: BurguerMenuProps) {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  const handleClick = (sectionId: string) => {
    try {
      toggleMenu();
      
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          console.warn(`Section with id ${sectionId} not found`);
        }
      }, 300);
    } catch (error) {
      console.error('Error scrolling to section:', error);
    }
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'es' ? 'en' : 'es');
  };

  const navItems = [
    { id: "nosotros", label: language === 'en' ? t('navbar.about') : t('navbar.about') },
    { id: "los-departamentos", label: language === 'en' ? t('navbar.apartments') : t('navbar.apartments') },
    { id: "reviews", label: t('navbar.reviews') },
    { id: "contacto", label: language === 'en' ? t('navbar.contact') : t('navbar.contact') }
  ];

  return (
    <div
      className={`inset-0 relative flex items-center justify-center transition-all duration-500 ease-in-out cursor-default ${
        isOpen ? "opacity-100 visible" : "opacity-100 text-primary"
      }`}
      style={{ zIndex: 1000 }}
    >
      <button
        className="flex items-center justify-center w-8 h-8 p-2 relative z-[1001]"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="sr-only">Toggle menu</span>
        <div
          className={`absolute w-full h-0.5 ${isOpen ? "bg-primary" : "bg-primary"} transition-all duration-500 ease-in-out ${
            isOpen ? "rotate-45 translate-y-0" : "translate-y-[-0.25rem]"
          }`}
        ></div>
        <div
          className={`absolute w-full h-0.5 ${isOpen ? "bg-primary" : "bg-primary"} transition-all duration-500 ease-in-out ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-[0.25rem]"
          }`}
        ></div>
      </button>
      
      <section
        className={`fixed inset-0 flex flex-col transition-all duration-500 ease-in-out ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ zIndex: 999 }}
        aria-hidden={!isOpen}
      >
        <div
          className="w-full h-full bg-gradient-to-b from-background via-background to-[#E3BDB1]"
        ></div>
        
        <nav className="absolute inset-0 flex flex-col items-center justify-center w-full h-full px-4 overflow-hidden">
          <div className="flex flex-col items-center max-h-full">
            <div className="w-fit h-fit mb-6 sm:mb-8">
              <img
                src="/assets/logo-dark.svg"
                alt="Logo"
                className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-cover"
              />
            </div>
            
            <ul className="text-primary text-center text-xl sm:text-2xl space-y-4 sm:space-y-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className="hover:text-primary/70 transition-colors duration-300 underline underline-offset-4 hover:cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={toggleLanguage} 
              className="text-primary px-4 py-3 rounded-full flex items-center text-lg sm:text-xl mt-6 sm:mt-8 hover:text-primary/70 transition-colors duration-300"
              aria-label={`Change language to ${language === 'es' ? 'English' : 'Spanish'}`}
            >
              {language === 'es' ? 'ES' : 'EN'} <ArrowUpRight className="ml-1" />
            </button>
          </div>
        </nav>
      </section>
    </div>
  );
}
