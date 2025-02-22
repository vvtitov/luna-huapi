import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  PhoneCall,
} from "lucide-react";
import DraggableCards from "./DraggableCards";
import FaqAccordion from "./FaqAccordion";
const LandingPage = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-screen bg-card-foreground color-dark bg-opacity-75 bg-blend-overlay bg-[url('/test3.png')] bg-cover bg-center text-secondary-custom grid grid-cols-2">
        <nav className="absolute top-0 left-0 right-0 p-6 flex md:flex-row justify-between items-center w-full">
          <div id="right-side" className="flex items-start justify-start">
            <div id="logo-container" className="w-[87.71px] h-[87.71px] mr-20">
              <img
                src="/logo.svg"
                alt="LUNA HUAPI"
                width={87.71}
                height={87.71}
                className="w-full h-full object-cover hidden lg:block"
              />
              <p className="text-text-primary uppercase text-xl lg:hidden pt-5">
                <img
                  src="/logotipo.svg"
                  alt="LUNA HUAPI"
                  width={87.71}
                  height={87.71}
                  className="w-full h-full object-cover"
                />
              </p>
            </div>
          </div>
          <div className="lg:grid-cols-2 items-center gap-12 hidden lg:grid overflow-none">
            <div className="flex space-x-12 items-center justify-self-end">
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
                    className="text-light hover:text-primary transition-colors relative group min-w-fit"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
            <div className="flex items-center justify-self-end">
              <div className="w-px h-[30px] bg-[#D1D1D1]"></div>
              <div className="text-[#D1D1D1] px-6 py-4 rounded-full flex items-center">
                EN <ArrowUpRight className="ml-2" size={20} />
              </div>
              <button
                id="btn-contactanos"
                className="min-w-fit inline-flex items-center border border-[#D1D1D1] text-[#D1D1D1] px-6 py-4 rounded-full mr-4"
                onClick={() => {
                  window.location.href = "https://wa.me/5492944444444";
                }}
              >
                Contactanos{" "}
                <span className="ml-2" role="img" aria-label="WhatsApp">
                  <PhoneCall className="w-4 h-4" />
                </span>
              </button>
              <button
                id="btn-reserva"
                className="btn border border-[#D1D1D1] text-[#D1D1D1] px-6 py-4 rounded-full"
              >
                Reserva
              </button>
            </div>
          </div>
          <div className="flex items-center justify-self-end lg:hidden ">
            <img src="/burger-menu.svg" alt="Menu" />
          </div>
        </nav>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-3xl text-light mb-16">
            Descubre la comodidad y el encanto de nuestros departamentos en
            alquiler en San Carlos de Bariloche, una de las ciudades mas bellas
            de la Patagonia argentina.
          </h2>
          <div className="flex justify-center space-x-5">
            <button className="bg-[#F1F1F1] text-[#3F3F3F] px-8 py-4 rounded-full">
              Reserva tu habitacion
            </button>
            <button className="border border-[#D1D1D1] text-[#D1D1D1] px-8 py-4 rounded-full">
              Seguinos en instagram
            </button>
          </div>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="py-24">
        <div className="container mx-auto">
          <div className="h-px bg-[#565656] opacity-20 flex-grow"></div>
          <div className="flex justify-between items-center mb-12">
            <span className="text-dark uppercase text-xl">
              01 / Quienes somos
            </span>
          </div>
          <div className="grid grid-cols-2 gap-24">
            <div></div>
            <div className="relative">
              <p className="text-2xl text-muted mb-8">
                Descubre la comodidad y el encanto de nuestros departamentos en
                alquiler en San Carlos de Bariloche, una de las ciudades mas
                bellas de la Patagonia argentina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="bg-secondary-custom py-24">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <span className="text-dark uppercase text-xl">
              02 / Nuestros departamentos
            </span>
          </div>

          <div className="relative">
            <div className="absolute -top-30 right-50 w-[156px] h-[156px] border border-black rounded-full flex items-center justify-center">
              <span className="text-black uppercase">Drag</span>
            </div>
          </div>

          <DraggableCards />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[url('/placeholder.svg?height=1125&width=1920')] bg-cover bg-center py-24 hidden">
        <div className="container mx-auto text-center">
          <h2 className="text-8xl font-light uppercase mb-12">
            Call to Action
          </h2>
          <button className="bg-background text-text-primary px-8 py-4 rounded-full">
            Primary CTA
          </button>
          <a
            href="#"
            className="text-text-primary uppercase text-xl border-b border-text-primary pb-1"
          >
            Learn More
          </a>
        </div>
      </section>

      <section className="container mx-auto min-h-[600px] bg-primary-custom w-full">
        <div className="h-px bg-[#565656] opacity-20 flex-grow my-8"></div>
        <div className="mb-16 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-text-primary uppercase text-xl">
            03 / Nuestros huespedes
          </span>
        </div>

        <div className="grid gap-[15vw] md:grid-cols-[100px_1fr]">
          <div className="flex gap-4 flex-row">
            <button
              className="h-10 w-10 rounded-full text-dark cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              className="h-10 w-10 rounded-full text-dark cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-light leading-relaxed text-gray-600 md:text-3xl lg:text-2xl">
              "Un hotel iconico para los argentinos, su ubicacion, su entorno,
              sus vistas son incomparables. Su arquitectura e historia van de la
              mano de su excelente servicio. Tanto los menus de sus
              restaurantes, como sus desayunos son increibles."
            </h2>
            <div className="h-px bg-[#565656] opacity-20 flex-grow"></div>
            <div className="text-sm uppercase tracking-wider text-muted-foreground">
              <p>Lucrecia Solomon</p>
              <p>Buenos Aires, Arg</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-24">
        <div className="h-px bg-[#565656] opacity-20 flex-grow my-8"></div>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <span className="text-dark uppercase text-xl">
              04 / Preguntas frecuentes
            </span>
          </div>
          <div className="grid grid-cols-2 gap-24">
            <div></div>
            <div>
              <div className="flex justify-between items-center">
                <FaqAccordion />
              </div>
              {/* Repeat for other questions */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-custom py-12">
        <div className="container mx-auto">
          <div className="h-px bg-[#565656] opacity-20 my-8"></div>
          <div className="flex justify-between items-center mb-[15vh]">
            <h1 className="text-dark text-5xl font-light">CONTACTO</h1>
            <button className="border border-primary rounded-full p-4">
              <ArrowUp className="text-primary" size={24} />
            </button>
          </div>
          <div className="grid grid-cols-3 justify-between my-15 text-dark">
            <span className="uppercase text-md">
              Los jilgueros 2374, Bariloche <br /> CP 1723, Argentina <br />
              54 (9) 1157963615
            </span>
            <span className="uppercase text-md">seguinos en instagram → </span>
            <span className="uppercase text-md">info@lunahuapi.com</span>
          </div>
          <div className="flex items-center w-full justify-end">
            <span className="text-dark text-xl">&copy; 2025 LUNA HUAPI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
