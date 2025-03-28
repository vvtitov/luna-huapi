import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>¿Dónde nos encontramos?</AccordionTrigger>
        <AccordionContent>
          Nos encontramos a 700 m del centro de San Carlos de Bariloche, en el barrio exclusivo de Belgrano.
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>¿Qué servicios incluyen los departamentos?</AccordionTrigger>
        <AccordionContent>
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>¿Los departamentos cuentan con cochera cubierta?</AccordionTrigger>
        <AccordionContent>
          Si, consultar disponibilidad al momento de reservar.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>¿Cuál es la capacidad de los departamentos?</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 space-y-1">
            <li>Departamento 1: hasta 2 personas</li>
            <li>Departamento 3: hasta 4 personas</li>
            <li>Departamento 3 y 4: hasta 6 personas</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>¿Se permiten mascotas?</AccordionTrigger>
        <AccordionContent>
          No se permiten mascotas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>¿El edificio cuenta con accesibilidad para personas con movilidad reducida?</AccordionTrigger>
        <AccordionContent>
          Si, el edificio cuenta con rampa para discapacitados y ascensores.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
