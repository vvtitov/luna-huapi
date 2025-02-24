import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    text: `"Un hotel icónico para los argentinos, su ubicación, su entorno, sus vistas son incomparables. Su arquitectura e historia van de la mano de su excelente servicio. Tanto los menús de sus restaurantes como sus desayunos son increíbles."`,
    author: "Lucrecia Solomon",
    location: "Buenos Aires, Arg",
  },
  {
    text: `"La estadía fue simplemente espectacular. La atención del personal, la comodidad de las habitaciones y las vistas son inolvidables. Definitivamente volveremos."`,
    author: "Martín Rodríguez",
    location: "Córdoba, Arg",
  },
  {
    text: `"Uno de los mejores hoteles en los que me he hospedado. El servicio es impecable y la gastronomía de primer nivel. ¡Lo recomiendo totalmente!"`,
    author: "Carla Fernández",
    location: "Mendoza, Arg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="container mx-auto min-h-[600px] bg-primary-custom w-full">
      <div className="h-px bg-[#565656] opacity-20 flex-grow my-8"></div>
      <div className="mb-16 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-text-primary uppercase text-xl">
          03 / Nuestros huéspedes
        </span>
      </div>

      {/* Testimonio dinámico */}
      <div className="grid lg:grid-cols-2 lg:grid-rows-3 w-full">
        {/* Botones de navegación */}
        <div className="flex gap-4 flex-row">
          <button
            className="h-10 w-10 rounded-full text-dark cursor-pointer"
            aria-label="Previous testimonial"
            onClick={handlePrev}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            className="h-10 w-10 rounded-full text-dark cursor-pointer"
            aria-label="Next testimonial"
            onClick={handleNext}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-8 transition-opacity duration-500 ease-in-out">
          <h2 className="text-2xl font-light leading-relaxed text-gray-600 md:text-3xl lg:text-2xl">
            {testimonials[currentIndex].text}
          </h2>
          <div className="h-px bg-[#565656] opacity-20 flex-grow"></div>
          <div className="text-sm uppercase tracking-wider text-muted-foreground">
            <p>{testimonials[currentIndex].author}</p>
            <p>{testimonials[currentIndex].location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
