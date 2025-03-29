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

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getNavItems = () => {
    if (language === 'en') {
      return ["About Us", "The Apartments", "Reviews", "Contact"];
    }
    return ["Nosotros", "Los departamentos", "Reviews", "Contacto"];
  };

  const getNavItemHref = (item: string) => {
    if (language === 'en') {
      if (item === "About Us") return "#nosotros";
      if (item === "The Apartments") return "#los-departamentos";
      if (item === "Reviews") return "#reviews";
      if (item === "Contact") return "#contacto";
    } else {
      if (item === "Nosotros") return "#nosotros";
      if (item === "Los departamentos") return "#los-departamentos";
      if (item === "Reviews") return "#reviews";
      if (item === "Contacto") return "#contacto";
    }
    return "#";
  };

  return (
    <div className="bg-background min-h-screen min-w-[300px]">

      <section className="relative h-screen w-full bg-card-foreground bg-blend-overlay bg-[url('/images/dp-2/PRIORITY_RENTALS-29.webp')] bg-cover bg-center">
        <nav id="navbar" className="relative top-0 flex justify-between w-full items-center align-middle z-10">
          <div id="right-side" className="relative flex pl-10">
            <div
              id="logo-container"
              className="self-center pt-[72px] "
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
          <div className="items-center hidden lg:flex w-[946px] pt-[72px] justify-end text-lg">
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
            <div className="flex items-center justify-self-end pr-10">
              <div className="w-px h-[30px] bg-[#D1D1D1]"></div>
              <LanguageSelector className="text-[#D1D1D1] px-6 py-4 rounded-full flex items-center" />
              <Button
                id="btn-contactanos"
                className="group inline-flex items-center border border-[#6B6B6B] text-[#D1D1D1] px-6 py-4 rounded-full mr-4 bg-transparent text-lg transition duration-300 hover:bg-[#D1D1D1] hover:text-[#3F3F3F]"
                onClick={() => {
                  window.location.href = "https://wa.me/5492944327488";
                }}
              >
                {language === 'en' ? 'Contact Us' : 'Contactanos'}{" "}
                <span className="ml-1" role="img" aria-label="WhatsApp">
                  <Whatsapp fill="#D1D1D1" className="transition-colors duration-300 group-hover:fill-black"/>
                </span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-self-end lg:hidden pt-[72px] pr-10 cursor-pointer" onClick={toggleMenu}>
            <BurguerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu}/>
          </div>
        </nav>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col min-h-screen min-w-full items-center justify-center">
          <h2 className="text-3xl md:text-3xl lg:text-4xl text-light text-balance mb-12 text-center px-10 lg:max-w-3/5 min-w-[300px]">
            {language === 'en' ? 'Discover the comfort and charm of our apartments in San Carlos de Bariloche, one of the most beautiful cities in Argentine Patagonia.' : 'Descubre la comodidad y el encanto de nuestros departamentos en San Carlos de Bariloche, una de las ciudades mas bellas de la Patagonia argentina.'}
          </h2>
          <div className="flex flex-col justify-center items-center gap-4 lg:flex-row">
            <Button className="bg-[#D1D1D1] text-[#3F3F3F] px-8 py-4 rounded-full max-w-fit text-lg hover:bg-[#E3BDB1] hover:text-white">
              {language === 'en' ? 'Book your room' : 'Reserva tu habitación'}
            </Button>
            <Button className="border border-[#6B6B6B] text-[#D1D1D1] px-8 py-4 rounded-full max-w-fit bg-transparent text-lg hover:bg-[#CADBD8] hover:text-[#3F3F3F]">
              <a href="https://www.instagram.com/lunahuapi/" target="_blank" rel="noopener noreferrer">{language === 'en' ? 'Follow us on instagram' : 'Seguinos en instagram'}</a>
            </Button>
          </div>
        </div>
      </section>

      <ParallaxSection 
        firstText={language === 'en' ? 'your refuge in Patagonian nature' : 'tu refugio en la naturaleza patagonica'} 
        secondText="" 
      /> 

      {/* NOSOTROS */}
      <section className="pt-10 pb-20 pointer-primary mb-8" id="nosotros">
        <div className="mx-auto px-6 lg:px-10">
          <div className="h-px bg-[#565656] opacity-20 flex-grow mb-10"></div>
          <div className="block lg:flex justify-between mb-12">
            <div className="min-w-fit font-inter">
              <p className="text-light text-lg">
                01 
                <span className="text-light px-4">/</span> 
                <span className="text-primary uppercase lg:text-xl text-lg">{language === 'en' ? 'Who we are' : 'Quienes somos'}</span>
              </p>
            </div>
            
            <div className="flex w-full lg:justify-end">
              <div className="relative lg:w-4/6">
                <p className="text-3xl lg:text-4xl text-primary mt-10 lg:mt-5 text-balance pr-4">
                {language === 'en' ? 'At Luna Huapi, we invite you to enjoy a unique experience in Patagonia. We are an exclusive complex of only 4 apartments designed to provide comfort, privacy and warmth in every detail. Located in San Carlos de Bariloche, we combine the tranquility of nature with access to the best activities and landscapes of the region. Our priority is that you feel at home, with attentive and personalized service, so that every moment of your stay is unforgettable.' : 'En Luna Huapi te invitamos a disfrutar de una experiencia única en la Patagonia. Somos un exclusivo complejo de solo 4 departamentos diseñados para brindarte confort, privacidad y calidez en cada detalle. Ubicados en San Carlos de Bariloche, combinamos la tranquilidad de la naturaleza con el acceso a las mejores actividades y paisajes de la región. Nuestra prioridad es que te sientas como en casa, con un servicio atento y personalizado, para que cada momento de tu estadía sea inolvidable.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOS DEPARTAMENTOS */}
      <section className="mx-auto pb-40 px-8 lg:px-10 pointer-drag [&_*]:pointer-drag bg-[#EFECE4] pt-20" id="los-departamentos">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-5 font-inter">
            <p className="text-light text-lg">
              02 
              <span className="text-light px-4">/</span> 
              <span className="text-primary uppercase lg:text-xl text-lg">{language === 'en' ? 'Our apartments' : 'Nuestros departamentos'}</span>
            </p>
          </div>
          <DraggableCards />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="pointer-primary [&_*]:pointer-primary bg-[#EFECE4]">
        <Testimonials />
      </div>

      {/* PARALLAX */}
      <div className="relative w-full pointer-primary [&_*]:pointer-primary bg-[#EFECE4] pt-10">
        <ParallaxCircleDivider title={language === 'en' ? 'Your place of rest' : 'Tu lugar de descanso'} buttonText={language === 'en' ? 'Follow us on instagram' : 'Seguinos en instagram'} onButtonClick={() => {}}/>
      </div>

      {/* FAQ */}
      <section className="mx-auto pb-24 pt-14 px-10 pointer-primary" id="preguntas-frecuentes">
        <div className="h-px bg-[#565656] opacity-20 flex-grow my-12"></div>
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-12 font-inter">
            <p className="text-light text-lg">
              04 
              <span className="text-light px-4">/</span> 
              <span className="text-primary uppercase text-lg">{language === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes'}</span>
            </p>
          </div>
          <div className="flex w-full justify-end">
            <div className="w-full lg:w-4/7">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary-custom py-12 px-10 pointer-primary [&_*]:pointer-primary font-inter" id="contacto">
        <div className="mx-auto">
          <div className="h-px bg-[#565656] opacity-20 my-8"></div>
          <div className="flex justify-between items-center mb-[15vh]">
            <h1 className="text-5xl lg:text-7xl font-light">{language === 'en' ? 'CONTACT' : 'CONTACTO'}</h1>
            <button className="relative lg:top-3 top-130 left-2 animate-bounce transition-all duration-2000 border border-primary rounded-full p-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                className="underline underline-offset-8 text-lg">{language === 'en' ? 'Follow us on instagram →' : 'seguinos en instagram →'}</a></div>
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
