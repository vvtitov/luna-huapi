import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const testimonials = {
  es: [
    {
      text: `"Un apartamento súper bonito con una ubicación estupenda (frente a un pequeño supermercado y a unos 10 minutos a pie del centro). Fue muy tranquilo y muy moderno.
Los propietarios eran súper amables.
Nos permitieron entrar en el apartamento a las 12:00 p.m. y al dia siguiente toda la ropa sucia se lavó y dobló para nosotros de forma gratuita. Volveríamos al apartamento inmediatamente y lo recomendamos encarecidamente."`,
      author: "Benita",
      location: "Agonia, Suiza",
    },
    {
      text: `"Las vistas al lago Nahuel Huapi desde este departamento son impresionantes. Los espacios son amplios y luminosos, y la ubicación es perfecta para explorar Bariloche. La cocina está totalmente equipada y los dormitorios son muy confortables. Sin duda volveremos en nuestra próxima visita."`,
      author: "Carlos Méndez",
      location: "Santiago, Chile",
    },
    {
      text: `"Un departamento íntimo y acogedor, ideal para parejas. La sala de estar es muy luminosa y el patio privado es perfecto para relajarse después de un día de excursiones. La ubicación en el barrio Belgrano es tranquila pero cercana a todo. Excelente atención de los anfitriones."`,
      author: "Laura Gómez",
      location: "Rosario, Argentina",
    },
  ],
  en: [
    {
      text: `"A super nice apartment with a great location (opposite a small supermarket and about a 10-minute walk from the center). It was very quiet and very modern.
The owners were super friendly.
They let us into the apartment at 12:00 p.m. and the next day all the dirty clothes were washed and folded for us free of charge. We would return to the apartment immediately and highly recommend it."`,
      author: "Benita",
      location: "Agonia, Switzerland",
    },
    {
      text: `"The views of Lake Nahuel Huapi from this apartment are breathtaking. The spaces are spacious and bright, and the location is perfect for exploring Bariloche. The kitchen is fully equipped and the bedrooms are very comfortable. We will definitely return on our next visit."`,
      author: "Carlos Méndez",
      location: "Santiago, Chile",
    },
    {
      text: `"An intimate and cozy apartment, ideal for couples. The living room is very bright and the private patio is perfect for relaxing after a day of excursions. The location in the Belgrano neighborhood is quiet but close to everything. Excellent attention from the hosts."`,
      author: "Laura Gómez",
      location: "Rosario, Argentina",
    },
  ]
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  
  const currentTestimonials = language === 'en' ? testimonials.en : testimonials.es;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentTestimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === currentTestimonials.length - 1 ? 0 : prevIndex + 1
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
            {language === 'en' ? 'Our Guests' : 'Nuestros huéspedes'}
          </span>
        </p>
        <div className="space-y-8 transition-opacity duration-500 ease-in-out w-full lg:w-4/7 h-full">
          <h2 className="text-2xl font-light text-primary md:text-2xl lg:text-3xl mt-10 text-balance">
            {currentTestimonials[currentIndex].text}
          </h2>
          <div className="h-px bg-[#565656] opacity-20 hidden lg:flex flex-grow"></div>
          <div className="text-sm uppercase tracking-wider text-muted-foreground mb-20">
            <p>{currentTestimonials[currentIndex].author}</p>
            <p>{currentTestimonials[currentIndex].location}</p>
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
