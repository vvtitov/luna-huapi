import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center"
      >
        {language === 'es' ? 'ES' : 'EN'} <img src="/assets/arrow-down.svg" alt="Arrow Down" className="w-5 h-5 ml-1"/>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 bg-transparent border border-[#6B6B6B] rounded-md shadow-lg z-50 right-6.5">
          <button
            onClick={() => handleLanguageChange('es')}
            className="block w-full text-left px-4 py-2 hover:bg-[#D1D1D1] hover:rounded-md hover:text-[#3F3F3F] text-light"
          >
            ES
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className="block w-full text-left px-4 py-2 hover:bg-[#D1D1D1] hover:rounded-md hover:text-[#3F3F3F] text-light"
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
