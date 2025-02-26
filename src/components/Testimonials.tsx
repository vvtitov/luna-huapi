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
    <section
      className="mx-auto min-h-[600px] bg-primary-custom w-full px-10 pointer-primary [&_*]:pointer-primary"
      id="reviews"
    >
      <div className="h-px bg-[#565656] opacity-20 flex-grow my-8 pointer-primary [&_*]:pointer-primary"></div>
      <div className="flex justify-between w-full font-inter">
        <p className="text-light text-xl">
          03
          <span className="text-light px-4">/</span>
          <span className="text-primary uppercase text-xl">
            Nuestros huéspedes
          </span>
        </p>
        <div className="space-y-8 transition-opacity duration-500 ease-in-out w-full lg:w-4/7 h-full">
          <h2 className="text-2xl font-light leading-relaxed text-gray-600 md:text-2xl lg:text-3xl mt-10">
            {testimonials[currentIndex].text}
          </h2>
          <div className="h-px bg-[#565656] opacity-20 flex-grow"></div>
          <div className="text-sm uppercase tracking-wider text-muted-foreground">
            <p>{testimonials[currentIndex].author}</p>
            <p>{testimonials[currentIndex].location}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 h-[100px] items-start translate-y-[-150px]">
        <button
          className="h-10 w-10 rounded-full border border-primary px-3 text-primary"
          aria-label="Previous testimonial"
          onClick={handlePrev}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          className="h-10 w-10 rounded-full border border-primary px-3 text-primary"
          aria-label="Next testimonial"
          onClick={handleNext}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
