import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useLanguage } from "../i18n/LanguageContext";

export default function FaqAccordion() {
  const { language } = useLanguage();

  const faqItems = {
    es: [
      {
        question: "¿Dónde nos encontramos?",
        answer: "Nos encontramos a 700 m del centro de San Carlos de Bariloche, en el barrio exclusivo de Belgrano.",
        map: true
      },
      {
        question: "¿Qué servicios incluyen los departamentos?",
        answer: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Internet</li>
            <li>TV</li>
            <li>Calefacción</li>
            <li>Cochera cubierta</li>
            <li>Ropa de cama</li>
            <li>Equipamiento de baño</li>
            <li>Equipamiento completo de cocina</li>
            <li>Lavarropas (en todos excepto el departamento 1)</li>
            <li>Check-in/out sin anfitrión</li>
          </ul>
        )
      },
      {
        question: "¿Los departamentos cuentan con cochera cubierta?",
        answer: "Si, consultar disponibilidad al momento de reservar."
      },
      {
        question: "¿Cuál es la capacidad de los departamentos?",
        answer: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Departamento 1: hasta 2 personas</li>
            <li>Departamento 2: hasta 4 personas</li>
            <li>Departamento 3 y 4: hasta 6 personas</li>
          </ul>
        )
      },
      {
        question: "¿Se permiten mascotas?",
        answer: "No se permiten mascotas."
      },
      {
        question: "¿El edificio cuenta con accesibilidad para personas con movilidad reducida?",
        answer: "Si, el edificio cuenta con rampa para discapacitados y ascensores."
      }
    ],
    en: [
      {
        question: "Where are we located?",
        answer: "We are located 700 m from the center of San Carlos de Bariloche, in the exclusive Belgrano neighborhood.",
        map: true
      },
      {
        question: "What services do the apartments include?",
        answer: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Internet</li>
            <li>TV</li>
            <li>Heating</li>
            <li>Covered parking</li>
            <li>Bed linen</li>
            <li>Bathroom equipment</li>
            <li>Fully equipped kitchen</li>
            <li>Washing machine (in all except apartment 1)</li>
            <li>Self check-in/out</li>
          </ul>
        )
      },
      {
        question: "Do the apartments have covered parking?",
        answer: "Yes, check availability when booking."
      },
      {
        question: "What is the capacity of the apartments?",
        answer: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Apartment 1: up to 2 people</li>
            <li>Apartment 2: up to 4 people</li>
            <li>Apartment 3 and 4: up to 6 people</li>
          </ul>
        )
      },
      {
        question: "Are pets allowed?",
        answer: "Pets are not allowed."
      },
      {
        question: "Does the building have accessibility for people with reduced mobility?",
        answer: "Yes, the building has a ramp for disabled people and elevators."
      }
    ]
  };

  const currentFaqs = language === 'en' ? faqItems.en : faqItems.es;

  return (
    <Accordion type="single" collapsible className="w-full animate-fadeIn">
      {currentFaqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger className="text-2xl lg:text-3xl transition-all duration-300 hover:translate-x-1">{faq.question}</AccordionTrigger>
          <AccordionContent className="transition-all duration-500 animate-fadeIn">
            {faq.answer}
            {faq.map && (
              <div className="mb-4 mt-6">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.5848776539636!2d-71.30656692378092!3d-41.13392987133249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a7b7a57fb24c3%3A0x8210ae97cb7c82fa!2s20%20de%20Junio%20766%2C%20R8400%20San%20Carlos%20de%20Bariloche%2C%20R%C3%ADo%20Negro%2C%20Argentina!5e0!3m2!1sen!2sus!4v1711666043594!5m2!1sen!2sus" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
