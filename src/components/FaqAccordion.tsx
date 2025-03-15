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
        <AccordionTrigger>¿Cuáles son las temporadas más recomendadas para alquilar en Bariloche?</AccordionTrigger>
        <AccordionContent>
          Bariloche ofrece experiencias únicas durante todo el año. La temporada alta de invierno (julio-septiembre) es ideal para esquiar en Cerro Catedral. La temporada alta de verano (diciembre-febrero) es perfecta para actividades lacustres y senderismo. Las temporadas intermedias (octubre-noviembre y marzo-mayo) ofrecen precios más accesibles y menos turistas, con paisajes espectaculares de otoño y primavera.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>¿Qué documentación necesito para alquilar un departamento temporario?</AccordionTrigger>
        <AccordionContent>
          Para alquileres temporarios en el sur argentino generalmente se requiere: documento de identidad o pasaporte, un depósito de garantía (que se devuelve al finalizar la estadía), y el pago por adelantado del período de alquiler. Algunos propietarios pueden solicitar referencias o un formulario de reserva. Recomendamos consultar los requisitos específicos antes de confirmar la reserva.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>¿Los departamentos incluyen calefacción adecuada para el invierno patagónico?</AccordionTrigger>
        <AccordionContent>
          Sí, nuestros departamentos están equipados con sistemas de calefacción eficientes para el clima patagónico. Dependiendo de la propiedad, pueden contar con calefacción central, salamandras, estufas a gas o sistemas eléctricos. Muchas propiedades también ofrecen chimeneas a leña que brindan una experiencia acogedora durante las noches frías. Todos los sistemas son revisados periódicamente para garantizar su correcto funcionamiento.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>¿Están permitidas las mascotas en los alquileres temporarios?</AccordionTrigger>
        <AccordionContent>
          La política de mascotas varía según cada propiedad. Algunos departamentos son pet-friendly y permiten mascotas con un depósito adicional, mientras que otros no las admiten. Es importante informar al momento de la reserva si viajará con mascotas para verificar la disponibilidad de alojamientos adecuados. Para las propiedades que aceptan mascotas, solicitamos que los huéspedes sean responsables de mantener la limpieza y evitar daños al mobiliario.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>¿Los departamentos cuentan con acceso a Internet y servicios básicos?</AccordionTrigger>
        <AccordionContent>
          La mayoría de nuestros departamentos incluyen WiFi de alta velocidad y todos los servicios básicos (agua, electricidad, gas). También ofrecemos amenities como ropa de cama, toallas, utensilios de cocina y elementos de limpieza básicos. Algunas propiedades pueden incluir servicios adicionales como TV por cable, Netflix, lavarropas y secadora. La descripción detallada de cada propiedad especifica los servicios incluidos.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
