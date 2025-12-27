import { create } from "zustand";

export interface Department {
  id: string;
  title: string;
  titleEn?: string;
  mainImage: string;
  description: string;
  descriptionEn?: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  checkIn: {
    time: string;
    flexibility: string;
  };
  checkOut: {
    time: string;
    flexibility: string;
  };
  parking: {
    availability: string;
    details: string;
  };
  images: {
    apartment: string[];
    building: string[];
  };
  airbnbUrl?: string;
  whatsappUrl?: string;
}

export const useDepartments = create<{
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
}>((set) => ({
  departments: [
    {
      id: "1",
      title: "Departamento 1",
      titleEn: "Apartment 1",
      mainImage: "/images/dp-1/PRIORITY_RENTALS-3.webp",
      description: "Este departamento ofrece un ambiente íntimo y acogedor. La sala de estar es muy luminosa, con una cocina equipada y un patio privado. Es ideal para una/dos personas que buscan una experiencia de alojamiento tranquila y relajante en Bariloche. Ubicado en el encantador barrio de Belgrano a pocas cuadras del centro.",
      descriptionEn: "This apartment offers an intimate and cozy atmosphere. The living room is very bright, with an equipped kitchen and a private patio. It is ideal for one/two people looking for a quiet and relaxing accommodation experience in Bariloche. Located in the charming Belgrano neighborhood, just a few blocks from downtown.",
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      checkIn: {
        time: "15:00 HS",
        flexibility: "FLEXIBLE"
      },
      checkOut: {
        time: "10:00 HS",
        flexibility: "FLEXIBLE"
      },
      parking: {
        availability: "CONSULTAR",
        details: "SI"
      },
      images: {
        apartment: [
          "/images/dp-1/PRIORITY_RENTALS-1.webp",
          "/images/dp-1/PRIORITY_RENTALS-2.webp",
          "/images/dp-1/PRIORITY_RENTALS-3.webp",
          "/images/dp-1/PRIORITY_RENTALS-4.webp",
          "/images/dp-1/PRIORITY_RENTALS-5.webp",
          "/images/dp-1/PRIORITY_RENTALS-11.webp",
          "/images/dp-1/PRIORITY_RENTALS-16.webp",
          "/images/dp-1/PRIORITY_RENTALS-17.webp"
        ],
        building: [
          "/images/building/PRIORITY_RENTALS-89.webp",
          "/images/building/PRIORITY_RENTALS-91.webp",
          "/images/building/PRIORITY_RENTALS-94.webp"
        ]
      },
      airbnbUrl: "https://www.airbnb.com/rooms/1374124103625430747?viralityEntryPoint=1&unique_share_id=62589437-8DDE-4BD0-BDA6-45C5A0EE634E&slcid=bd9296bc8a6749ce97d6be4d76634364&s=76&feature=share&adults=1&channel=native&slug=srJ4cYPC&source_impression_id=p3_1743272414_P31XeY1POJymhNcL",
      whatsappUrl: "https://wa.me/5492944327488"
    },
    {
      id: "2",
      title: "Departamento 2",
      titleEn: "Apartment 2",
      mainImage: "/images/dp-2/PRIORITY_RENTALS-18.webp",
      description: "Exclusivo y acogedor departamento con vistas al lago Nahuel Huapi y gran parte de la ciudad. Cuenta con todas las comodidades para una estadía inolvidable. Ubicación privilegiada con fácil acceso a los principales atractivos turísticos, a pocas cuadras del centro.",
      descriptionEn: "Exclusive and cozy apartment with views of Lake Nahuel Huapi and much of the city. It has all the amenities for an unforgettable stay. Privileged location with easy access to the main tourist attractions, just a few blocks from downtown.",
      capacity: 6,
      bedrooms: 2,
      bathrooms: 1,
      checkIn: {
        time: "15:00 HS",
        flexibility: "FLEXIBLE"
      },
      checkOut: {
        time: "10:00 HS",
        flexibility: "FLEXIBLE"
      },
      parking: {
        availability: "DISPONIBLE",
        details: "SI"
      },
      images: {
        apartment: [
          "/images/dp-2/PRIORITY_RENTALS-18.webp",
          "/images/dp-2/PRIORITY_RENTALS-21.webp",
          "/images/dp-2/PRIORITY_RENTALS-22.webp",
          "/images/dp-2/PRIORITY_RENTALS-29.webp",
          "/images/dp-2/PRIORITY_RENTALS-30.webp",
          "/images/dp-2/PRIORITY_RENTALS-33.webp",
          "/images/dp-2/PRIORITY_RENTALS-34.webp",
          "/images/dp-2/PRIORITY_RENTALS-38.webp",
          "/images/dp-2/PRIORITY_RENTALS-42.webp",
          "/images/dp-2/PRIORITY_RENTALS-43.webp"
        ],
        building: [
          "/images/building/PRIORITY_RENTALS-89.webp",
          "/images/building/PRIORITY_RENTALS-91.webp",
          "/images/building/PRIORITY_RENTALS-94.webp"
        ]
      },
      airbnbUrl: "https://www.airbnb.com/rooms/1374617103778219319?viralityEntryPoint=1&unique_share_id=5F98E60F-5DBB-43F2-911E-60C64C343966&slcid=db2a20a719e047fe92e57cbc58ebbbc3&s=76&feature=share&adults=1&channel=native&slug=ephIqucK&source_impression_id=p3_1743272415_P34WwPzD06C-19Eb",
      whatsappUrl: "https://wa.me/5492944327488"
    },
    {
      id: "3",
      title: "Departamento 3",
      titleEn: "Apartment 3",
      mainImage: "/images/dp-3/PRIORITY_RENTALS-54.webp",
      description: "Elegante departamento con acabados de primera calidad y vistas impresionantes desde todos los ambientes al lago Nahuel Huepi y gran parte de la ciudad. Espacios amplios y luminosos, dormitorios confortables y una moderna cocina totalmente equipada. Ubicado estratégicamente para disfrutar de todas las atracciones de la zona.",
      descriptionEn: "Elegant apartment with high-quality finishes and impressive views from all rooms to Lake Nahuel Huapi and much of the city. Spacious and bright spaces, comfortable bedrooms, and a fully equipped modern kitchen. Strategically located to enjoy all the attractions in the area.",
      capacity: 6,
      bedrooms: 2,
      bathrooms: 1,
      checkIn: {
        time: "15:00 HS",
        flexibility: "FLEXIBLE"
      },
      checkOut: {
        time: "10:00 HS",
        flexibility: "FLEXIBLE"
      },
      parking: {
        availability: "DISPONIBLE",
        details: "SI"
      },
      images: {
        apartment: [
          "/images/dp-3/PRIORITY_RENTALS-45.webp",
          "/images/dp-3/PRIORITY_RENTALS-47.webp",
          "/images/dp-3/PRIORITY_RENTALS-48.webp",
          "/images/dp-3/PRIORITY_RENTALS-50.webp",
          "/images/dp-3/PRIORITY_RENTALS-53.webp",
          "/images/dp-3/PRIORITY_RENTALS-54.webp",
          "/images/dp-3/PRIORITY_RENTALS-55.webp",
          "/images/dp-3/PRIORITY_RENTALS-58.webp",
          "/images/dp-3/PRIORITY_RENTALS-60.webp",
          "/images/dp-3/PRIORITY_RENTALS-75.webp"
        ],
        building: [
          "/images/building/PRIORITY_RENTALS-89.webp",
          "/images/building/PRIORITY_RENTALS-91.webp",
          "/images/building/PRIORITY_RENTALS-94.webp"
        ]
      },
      airbnbUrl: "https://www.airbnb.com/rooms/1374719870793463869?viralityEntryPoint=1&unique_share_id=462AE7DD-A74D-499B-81E7-C604F87DCD83&slcid=fef3d59def94443cab98eb76b1ab11d9&s=76&feature=share&adults=1&channel=native&slug=vqns6SKw&source_impression_id=p3_1743272416_P3Q1GiAs1JjoTXBo",
      whatsappUrl: "https://wa.me/5492944327488"
    },
    {
      id: "4",
      title: "Departamento 4",
      titleEn: "Apartment 4",
      mainImage: "/images/dp-4/PRIORITY_RENTALS-63.webp",
      description: "Elegante departamento con acabados de primera calidad y vistas impresionantes desde todos los ambientes al lago Nahuel Huepi y gran parte de la ciudad. Espacios amplios y luminosos, dormitorios confortables y una moderna cocina totalmente equipada. Ubicado estratégicamente para disfrutar de todas las atracciones de la zona.",
      descriptionEn: "Elegant apartment with high-quality finishes and impressive views from all rooms to Lake Nahuel Huapi and much of the city. Spacious and bright spaces, comfortable bedrooms, and a fully equipped modern kitchen. Strategically located to enjoy all the attractions in the area.",
      capacity: 4,
      bedrooms: 1,
      bathrooms: 1,
      checkIn: {
        time: "15:00 HS",
        flexibility: "FLEXIBLE"
      },
      checkOut: {
        time: "10:00 HS",
        flexibility: "FLEXIBLE"
      },
      parking: {
        availability: "DISPONIBLE",
        details: "SI"
      },
      images: {
        apartment: [
          "/images/dp-4/PRIORITY_RENTALS-63.webp",
          "/images/dp-4/PRIORITY_RENTALS-66.webp",
          "/images/dp-4/PRIORITY_RENTALS-67.webp",
          "/images/dp-4/PRIORITY_RENTALS-70.webp",
          "/images/dp-4/PRIORITY_RENTALS-72.webp",
          "/images/dp-4/PRIORITY_RENTALS-79.webp",
          "/images/dp-4/PRIORITY_RENTALS-80.webp",
          "/images/dp-4/PRIORITY_RENTALS-83.webp",
          "/images/dp-4/PRIORITY_RENTALS-86.webp",
          "/images/dp-4/PRIORITY_RENTALS-87.webp"
        ],
        building: [
          "/images/building/PRIORITY_RENTALS-89.webp",
          "/images/building/PRIORITY_RENTALS-91.webp",
          "/images/building/PRIORITY_RENTALS-94.webp"
        ]
      },
      airbnbUrl: "https://www.airbnb.com.ar/rooms/1579884448844179015",
      whatsappUrl: "https://wa.me/5492944327488"
    }
  ],
  setDepartments: (departments) => set({ departments }),
}));
