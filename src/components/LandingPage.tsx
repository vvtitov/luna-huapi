import { useState } from 'react';
import {
  ArrowUp,
} from "lucide-react";
import DraggableCards from "./DraggableCards";
import FaqAccordion from "./FaqAccordion";
import { Button } from "./ui/button";
import Testimonials from "./Testimonials";
import ParallaxSection from "./ParallaxText";
import { ParallaxCircleDivider } from "./ParallaxImage";
import BurguerMenu from "./BurguerMenu";
import Whatsapp from "./ui/whatsapp";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getNavItems = () => {
    if (language === 'en') {
      return [t('navbar.about'), t('navbar.apartments'), t('navbar.reviews'), t('navbar.contact')];
    }
    return [t('navbar.about'), t('navbar.apartments'), t('navbar.reviews'), t('navbar.contact')];
  };

  const getNavItemHref = (item: string) => {
    if (language === 'en') {
      if (item === t('navbar.about')) return "#nosotros";
      if (item === t('navbar.apartments')) return "#los-departamentos";
      if (item === t('navbar.reviews')) return "#reviews";
      if (item === t('navbar.contact')) return "#contacto";
    } else {
      if (item === t('navbar.about')) return "#nosotros";
      if (item === t('navbar.apartments')) return "#los-departamentos";
      if (item === t('navbar.reviews')) return "#reviews";
      if (item === t('navbar.contact')) return "#contacto";
    }
    return "#";
  };

  return (
    <div className="bg-background min-h-screen min-w-[300px]">

      <section className="relative h-screen w-full bg-card-foreground bg-blend-overlay bg-[url('/images/dp-2/PRIORITY_RENTALS-29.webp')] bg-cover bg-center">
        <nav id="navbar" className="absolute top-0 left-0 right-0 flex justify-between w-full items-center z-10 px-4 sm:px-6 lg:px-10">
          <div id="right-side" className="relative flex">
            <div
              id="logo-container"
              className="self-center pt-8 sm:pt-12 lg:pt-[72px]"
            >
              <img
                src="/assets/logo.svg"
                alt="LUNA HUAPI"
                width={87.71}
                height={87.71}
                className="w-[87.71px] h-[87.71px] object-cover hidden lg:block hover:scale-110 transition-all duration-300"
              />
              <p className="text-text-primary uppercase text-xl lg:hidden pt-5">
                <img
                  src="/assets/logotipo.svg"
                  alt="LUNA HUAPI"
                  width={87.71}
                  height={87.71}
                  className="w-full h-full object-cover"
                />
              </p>
            </div>
          </div>
          <div className="items-center hidden lg:flex pt-[72px] justify-end text-lg">
            <div className="flex space-x-12 items-center justify-self-center pr-8">
              {getNavItems().map(
                (item) => (
                  <a
                    key={item}
                    href={getNavItemHref(item)}
                    className="text-light relative group min-w-fit hover:text-white transition-all duration-300"
                    onClick={(event) => {
                      event.preventDefault();
                      const target = document.querySelector(
                        event.currentTarget.getAttribute("href") as string
                      );
                      if (target) {
                        target.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
            <div className="flex items-center justify-self-end pr-6">
              <div className="w-px h-[30px] bg-[#D1D1D1]"></div>
              <LanguageSelector className="text-[#D1D1D1] px-6 py-4 rounded-full flex items-center" />
              <Button
                id="btn-contactanos"
                className="group inline-flex items-center border border-[#6B6B6B] text-[#D1D1D1] px-6 py-4 rounded-full mr-4 bg-transparent text-lg transition duration-300 hover:bg-white/90 hover:text-[#3F3F3F]"
                onClick={() => {
                  window.location.href = "https://wa.me/5492944327488";
                }}
              >
                {t('navbar.contactUs')}{" "}
                <span className="ml-1" role="img" aria-label="WhatsApp">
                  <Whatsapp fill="#D1D1D1" className="transition-colors duration-300 group-hover:fill-black"/>
                </span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-self-end lg:hidden pt-8 sm:pt-12 lg:pt-[72px] pr-2 cursor-pointer" onClick={toggleMenu}>
            <BurguerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu}/>
          </div>
        </nav>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10">
          <h2 className="text-3xl md:text-3xl lg:text-4xl text-light text-balance mb-8 sm:mb-12 text-center max-w-4xl mx-auto">
            {t('hero.title')}
          </h2>
          <div className="flex flex-col justify-center items-center gap-4 lg:flex-row">
            <Button className="bg-[#D1D1D1] text-[#3F3F3F] px-8 py-4 rounded-full max-w-fit text-lg hover:bg-[#E3BDB1] hover:text-white"
              onClick={() => {
                const target = document.querySelector("#los-departamentos");
                if (target) {
                  target.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              {t('hero.bookButton')}
            </Button>
            <Button className="border border-[#6B6B6B] text-[#D1D1D1] px-8 py-4 rounded-full max-w-fit bg-transparent text-lg hover:bg-[#CADBD8] hover:text-[#3F3F3F]">
              <a href="https://www.instagram.com/lunahuapi/" target="_blank" rel="noopener noreferrer">{t('hero.followButton')}</a>
            </Button>
          </div>
        </div>
      </section>

      <ParallaxSection 
        firstText={t('parallax.firstText')} 
        secondText="" 
      /> 

      <section className="pt-5 pb-10 pointer-primary" id="nosotros">
        <div className="mx-auto px-6 lg:px-10">
          <div className="h-px bg-[#565656] opacity-20 flex-grow mb-10"></div>
          <div className="block lg:flex justify-between mb-12">
            <div className="min-w-fit font-inter">
              <p className="text-light text-lg">
                01 
                <span className="text-light px-4">/</span> 
                <span className="text-primary uppercase lg:text-xl text-lg">{t('about.section')}</span>
              </p>
            </div>
            
            <div className="flex w-full lg:justify-end">
              <div className="relative lg:w-4/6">
                <p className="text-3xl lg:text-4xl text-primary mt-10 lg:mt-5 text-balance pr-4">
                <div dangerouslySetInnerHTML={{ __html: t('about.content') }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto pb-20 px-8 lg:px-10 pointer-drag [&_*]:pointer-drag bg-[#EFECE4] pt-10" id="los-departamentos">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-10 font-inter">
            <p className="text-light text-lg">
              02 
              <span className="text-light px-4">/</span> 
              <span className="text-primary uppercase lg:text-xl text-lg">{t('apartments.section')}</span>
            </p>
          </div>
          <DraggableCards />
        </div>
      </section>

      <div className="pointer-primary [&_*]:pointer-primary bg-[#EFECE4]">
        <Testimonials />
      </div>

      <div className="relative w-full pointer-primary [&_*]:pointer-primary bg-[#EFECE4] pt-10">
        <ParallaxCircleDivider title={t('parallax.restingPlace')} buttonText={t('hero.followButton')} onButtonClick={() => {}}/>
      </div>

      <section className="mx-auto pb-12 pt-2 px-10 pointer-primary" id="preguntas-frecuentes">
        <div className="h-px bg-[#565656] opacity-20 flex-grow mb-12 mt-4"></div>
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-12 font-inter">
            <p className="text-light text-lg">
              04 
              <span className="text-light px-4">/</span> 
              <span className="text-primary uppercase text-lg">{t('faq.section')}</span>
            </p>
          </div>
          <div className="flex w-full justify-end">
            <div className="w-full lg:w-4/7">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary-custom py-12 px-10 pointer-primary [&_*]:pointer-primary font-inter" id="contacto">
        <div className="mx-auto">
          <div className="h-px bg-[#565656] opacity-20 my-8"></div>
          <div className="flex justify-between items-center mb-[15vh]">
            <h1 className="text-5xl lg:text-7xl font-light">{t('footer.title')}</h1>
            <button className="relative top-3 left-2 animate-bounce transition-all duration-2000 border border-primary rounded-full p-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ArrowUp className="text-primary" size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 items-baseline">
            <div className="uppercase text-lg lg:text-xl flex items-baseline">
              <img src="/assets/circle.svg" alt="Circle" className="self-start pt-1.5 mr-3"/>
              <div className="flex flex-col">
                <div>20 de Junio 766, Bariloche</div>
                <div className="mb-6">CP 1723, Argentina</div>
                <div>+54 (9) 294 432-7488</div>
              </div>
            </div>
            <div className="uppercase text-lg lg:text-xl flex items-center">
            <img src="/assets/circle.svg" alt="Circle" className="self-center mr-3 min-w-fit shrink-0"/>
            <a href="https://www.instagram.com/lunahuapi/" target="_blank" rel="noopener noreferrer hover:underline" 
                className="underline underline-offset-8 text-lg">{t('footer.followOnInstagram')}</a></div>
            <div className="uppercase text-md lg:text-xl flex items-center">
            <img src="/assets/circle.svg" alt="Circle" className="self-center mr-3 min-w-fit shrink-0"/>
            <a href="mailto:info@lunahuapi.com" className="text-lg">info@lunahuapi.com</a> </div>
          </div>
          <div className="flex items-center w-full justify-center pt-20">
            <p className="text-dark font-extralight text-xs">
             dev by {""}
              <a href="https://www.3mangos.site/" target="_blank" rel="noopener noreferrer hover:underline" className="underline underline-offset-4 text-sm">THREE MANGOS</a> <br/>
             <span className="text-dark font-extralight text-sm">
              &copy; 2025 LUNA HUAPI
             </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
