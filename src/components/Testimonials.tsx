import { useState } from "react";


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
      className="mx-auto min-h-[600px] bg-primary-custom w-full px-10 pointer-primary [&_*]:pointer-primary relative min-w-[400px] pb-20"
      id="reviews"
    >
      <div className="h-px bg-[#565656] opacity-20 flex-grow"></div>
      <div className="block lg:flex justify-between w-full font-inter mt-10">
        <p className="text-light text-lg">
          03
          <span className="text-light px-4">/</span>
          <span className="text-primary uppercase text-lg">
            Nuestros huéspedes
          </span>
        </p>
        <div className="space-y-8 transition-opacity duration-500 ease-in-out w-full lg:w-4/7 h-full">
          <h2 className="text-3xl font-light text-primary md:text-2xl lg:text-3xl mt-10 text-balance">
            {testimonials[currentIndex].text}
          </h2>
          <div className="h-px bg-[#565656] opacity-20 hidden lg:flex flex-grow"></div>
          <div className="text-sm uppercase tracking-wider text-muted-foreground mb-20">
            <p>{testimonials[currentIndex].author}</p>
            <p>{testimonials[currentIndex].location}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 md:bottom-50 left-10 lg:bottom-80 lg:left-10 items-center flex flex-row gap-4">
        <button
          className="h-16 w-16 lg:h-12 lg:w-12 rounded-full border border-primary/70 items-center flex justify-center text-primary lg:text-xl text-2xl font-bold hover:bg-primary/10"
          aria-label="Previous testimonial"
          onClick={handlePrev}
        >
          ←
        </button>
        <button
          className="h-16 w-16 lg:h-12 lg:w-12 rounded-full border border-primary/70 items-center flex justify-center text-primary lg:text-xl text-2xl font-bold hover:bg-primary/10"
          aria-label="Next testimonial"
          onClick={handleNext}
        >
          →
        </button>
      </div>
    </section>
  );
}
