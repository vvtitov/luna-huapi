import { ArrowUpRight } from "lucide-react";
import { useLanguage } from '../i18n/LanguageContext';

interface BurguerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function BurguerMenu({ isOpen, toggleMenu }: BurguerMenuProps) {
  const { language, changeLanguage } = useLanguage();

  const handleClick = (sectionId: string) => {
    try {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Section with id ${sectionId} not found`);
      }
      toggleMenu();
    } catch (error) {
      console.error('Error scrolling to section:', error);
    }
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'es' ? 'en' : 'es');
  };

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
        className={`fixed inset-0 flex transition-all duration-500 ease-in-out ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"

        }`}
        style={{ zIndex: 999 }}
      >
        <div
          className="w-full h-full bg-gradient-to-b from-background via-background to-[#E3BDB1]"
          style={isOpen ? { overflow: "hidden" } : {}}
        >
        </div>
        <nav className="absolute flex flex-col gap-5 items-center justify-center mx-auto w-full">
            
          <div className="w-fit h-fit mt-20">
            <img
              src="/assets/logo-dark.svg"
              alt="Logo"
              className="w-[100px] h-[100px] object-cover"
            />
          </div>
          <ul className="text-primary text-center text-2xl mt-20">
            <li className="mb-6">
              <button
                onClick={() => handleClick("nosotros")}
                className="hover:text-primary transition-colors duration-300 underline underline-offset-4 hover:cursor-pointer"
                style={{ zIndex: 999 }}
              >
                {language === 'en' ? 'About Us' : 'Nosotros'}
              </button>
            </li>
            <li className="mb-6">
              <button
                onClick={() => handleClick("los-departamentos")}
                className="hover:text-primary transition-colors duration-300 underline underline-offset-4 hover:cursor-pointer"
                style={{ zIndex: 999 }}
              >
                {language === 'en' ? 'The Apartments' : 'Los departamentos'}
              </button>
            </li>
            <li className="mb-6">
              <button
                onClick={() => handleClick("reviews")}
                className="hover:text-primary transition-colors duration-300 underline underline-offset-4 hover:cursor-pointer"
                style={{ zIndex: 999 }}
              >
                Reviews
              </button>
            </li>
            <li className="mb-6">
              <button
                onClick={() => handleClick("contacto")}
                className="hover:text-primary transition-colors duration-300 underline underline-offset-4 hover:cursor-pointer"
                style={{ zIndex: 999 }}
              >
                {language === 'en' ? 'Contact' : 'Contacto'}
              </button>
            </li>
          </ul>
          <button 
            onClick={toggleLanguage} 
            className="text-primary px-6 py-4 rounded-full flex items-center text-xl mt-5 hover:text-primary transition-colors duration-300 hover:cursor-pointer"
          >
            {language === 'es' ? 'ES' : 'EN'} <ArrowUpRight />
          </button>
        </nav>
      </section>
      {isOpen && (
        <div className="fixed w-screen h-screen inset-0 z-50" style={{ overflow: "hidden" }}></div>
      )}
    </div>
  );
}
