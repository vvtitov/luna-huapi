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


const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-background min-h-screen ">

      <section className="relative h-screen w-full bg-card-foreground bg-blend-overlay bg-[url('/images/main-bg.png')] bg-cover bg-center">
        <nav id="navbar" className="absolute top-0 flex justify-between w-full items-center align-middle">
          <div id="right-side" className="relative flex pl-10">
            <div
              id="logo-container"
              className="self-center pt-[72px] "
            >
              <img
                src="/src/assets/logo.svg"
                alt="LUNA HUAPI"
                width={87.71}
                height={87.71}
                className="w-[87.71px] h-[87.71px] object-cover hidden lg:block"
              />
              <p className="text-text-primary uppercase text-xl lg:hidden pt-5">
                <img
                  src="/src/assets/logotipo.svg"
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
              {["Nosotras", "Los departamentos", "Reviews", "Contacto"].map(
                (item) => (
                  <a
                    key={item}
                    href={
                      item === "Nosotras"
                        ? "#nosotras"
                        : item === "Los departamentos"
                        ? "#los-departamentos"
                        : item === "Reviews"
                        ? "#reviews"
                        : item === "Contacto"
                        ? "#contacto"
                        : "#"
                    }
                    className="text-light transition-colors relative group min-w-fit"
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
              <div className="text-[#D1D1D1] px-6 py-4 rounded-full flex items-center">
                ES <img src="/src/assets/arrow-down.svg" alt="Arrow Down" className="w-5 h-5 ml-1"/>
              </div>
              <Button
                id="btn-contactanos"
                className="inline-flex items-center border border-[#D1D1D1] text-[#D1D1D1] px-6 py-4 rounded-full mr-4 bg-transparent text-lg"
                onClick={() => {
                  window.location.href = "https://wa.me/5492944444444";
                }}
              >
                Contactanos{" "}
                <span className="ml-1" role="img" aria-label="WhatsApp">
                  <img src="/src/assets/whatsapp.svg" alt="WhatsApp" className="w-5 h-5"/>
                </span>
              </Button>
              <Button
                id="btn-reserva"
                className="btn border border-[#D1D1D1] text-[#D1D1D1] px-6 py-4 rounded-full bg-transparent text-lg"
              >
                Reserva
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-self-end lg:hidden pt-[72px] pr-10 cursor-pointer" onClick={toggleMenu}>
            <BurguerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu}/>
          </div>
        </nav>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-3/5 lg:w-3/6 pt-20">
          <h2 className="text-2xl lg:text-4xl text-light mb-16 animate-in fade-in duration-[2000ms]">
            Descubre la comodidad y el encanto de nuestros departamentos en
            alquiler en San Carlos de Bariloche, una de las ciudades mas bellas
            de la Patagonia argentina.
          </h2>
          <div className="flex flex-col justify-center items-center gap-3 lg:flex-row">
            <Button className="bg-[#F1F1F1] text-[#3F3F3F] px-8 py-4 rounded-full max-w-fit text-lg">
              Reserva tu habitacion
            </Button>
            <Button className="border border-[#D1D1D1] text-[#D1D1D1] px-8 py-4 rounded-full max-w-fit bg-transparent text-lg">
              Seguinos en instagram
            </Button>
          </div>
        </div>
      </section>

      <ParallaxSection 
        firstText="tu refugio en la naturaleza en la patagonia " 
        secondText="tu refugio en la naturaleza en la patagonia " 
      /> 

      {/* NOSOTRAS */}
      <section className="py-24 pointer-primary mb-8" id="nosotras">
        <div className="mx-auto px-6 lg:px-10">
          <div className="h-px bg-[#565656] opacity-20 flex-grow mb-10"></div>
          <div className="block lg:flex justify-between mb-12">
            <div className="min-w-fit font-inter">
            <p className="text-light text-lg">
              01 
              <span className="text-light px-4">/</span> 
              <span className="text-primary uppercase lg:text-xl text-lg">Quienes somos</span>
            </p>
            </div>
            
          <div className="flex w-full lg:justify-end">
            <div className="relative lg:w-4/6">
              <p className="text-4xl lg:text-4xl text-primary mt-10 lg:mt-5 text-pretty">
                Descubre la comodidad y el encanto de nuestros departamentos en
                alquiler en San Carlos de Bariloche, una de las ciudades mas
                bellas de la Patagonia argentina.
              </p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* LOS DEPARTAMENTOS */}
      <section className="mx-auto py-24 px-8 lg:px-10 pointer-drag [&_*]:pointer-drag" id="los-departamentos">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-5 font-inter">
            <p className="text-light text-lg">
              02 
              <span className="text-light px-4">/</span> 
              <span className="text-primary uppercase lg:text-xl text-lg">Nuestros departamentos</span>
            </p>
          </div>
          <DraggableCards />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="pointer-primary [&_*]:pointer-primary">
        <Testimonials />
      </div>

      {/* PARALLAX */}
      <div className="relative w-full pointer-primary [&_*]:pointer-primary">
        <ParallaxCircleDivider imageUrl="/paralaxbg.png" title="Tu lugar de descanso" buttonText="Seguinos en instagram" onButtonClick={() => {}}/>
      </div>

      {/* FAQ */}
      <section className="mx-auto pb-24 px-10 pointer-primary" id="preguntas-frecuentes">
        <div className="h-px bg-[#565656] opacity-20 flex-grow my-12"></div>
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-12 font-inter">
            <p className="text-light text-lg">
              04 
              <span className="text-light px-4">/</span> 
              <span className="text-primary uppercase text-lg">Preguntas frecuentes</span>
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
            <h1 className="text-5xl lg:text-7xl font-light">CONTACTO</h1>
            <button className="relative lg:top-3 top-130 left-2 animate-bounce transition-all duration-2000 border border-primary rounded-full p-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ArrowUp className="text-primary" size={24} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 md:grid-rows-2 justify-between my-15 text-dark items-start gap-10 text-primary">
            <div className="uppercase text-lg lg:text-xl flex items-baseline">
              <img src="/src/assets/circle.svg" alt="Circle" className="self-start pt-1.5 mr-3"/>
              Los jilgueros 2374, Bariloche <br /> <br />CP 1723, Argentina <br />
              54 (9) 1157963615
            </div>
            <div className="uppercase text-lg lg:text-xl flex items-center">
            <img src="/src/assets/circle.svg" alt="Circle" className="self-center mr-3 min-w-fit shrink-0"/>
            <a href="https://www.instagram.com/lunahuapi/" target="_blank" rel="noopener noreferrer hover:underline" 
                className="underline underline-offset-8 text-lg">seguinos en instagram →</a></div>
            <div className="uppercase text-md lg:text-xl flex items-center">
            <img src="/src/assets/circle.svg" alt="Circle" className="self-center mr-3 min-w-fit shrink-0"/>
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
