import { create } from "zustand";

// Define the Department interface
export interface Department {
  id: string;
  title: string;
  mainImage: string;
  description: string;
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
}

// Create the store with the departments configuration
export const useDepartments = create<{
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
}>((set) => ({
  departments: [
    {
      id: "1",
      title: "Departamento 1",
      mainImage: "/images/dp-1/PRIORITY_RENTALS-3.webp",
      description: "Este departamento ofrece un ambiente íntimo y acogedor. La sala de estar es muy luminosa, con una cocina equipada y un patio privado. Es ideal para una/dos personas que buscan una experiencia de alojamiento tranquila y relajante en Bariloche. Ubicado en el encantador barrio de Belgrano a pocas cuadras del centro.",
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
      }
    },
    {
      id: "2",
      title: "Departamento 2",
      mainImage: "/images/dp-2/PRIORITY_RENTALS-18.webp",
      description: "Exclusivo y acogedor departamento con vistas al lago Nahuel Huapi y gran parte de la ciudad. Cuenta con todas las comodidades para una estadía inolvidable. Ubicación privilegiada con fácil acceso a los principales atractivos turísticos, a pocas cuadras del centro.",
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
      }
    },
    {
      id: "3",
      title: "Departamento 3",
      mainImage: "/images/dp-3/PRIORITY_RENTALS-54.webp",
      description: "Elegante departamento con acabados de primera calidad y vistas impresionantes desde todos los ambientes al lago Nahuel Huepi y gran parte de la ciudad. Espacios amplios y luminosos, dormitorios confortables y una moderna cocina totalmente equipada. Ubicado estratégicamente para disfrutar de todas las atracciones de la zona.",
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
      }
    },
    {
      id: "4",
      title: "Departamento 4",
      mainImage: "/images/dp-4/PRIORITY_RENTALS-63.webp",
      description: "Elegante departamento con acabados de primera calidad y vistas impresionantes desde todos los ambientes al lago Nahuel Huepi y gran parte de la ciudad. Espacios amplios y luminosos, dormitorios confortables y una moderna cocina totalmente equipada. Ubicado estratégicamente para disfrutar de todas las atracciones de la zona.",
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
      }
    }
  ],
  setDepartments: (departments) => set({ departments }),
}));
