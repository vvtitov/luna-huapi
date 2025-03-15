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
      description: "Acogedor departamento con vista panorámica al Lago Nahuel Huapi. Cuenta con una amplia sala de estar, cocina equipada y balcón privado. Ideal para parejas o pequeñas familias que buscan disfrutar de la tranquilidad y belleza natural de Bariloche.",
      capacity: 4,
      bedrooms: 2,
      bathrooms: 1,
      images: {
        apartment: [
          "/images/dp-1/PRIORITY_RENTALS-1.webp",
          "/images/dp-1/PRIORITY_RENTALS-2.webp",
          "/images/dp-1/PRIORITY_RENTALS-3.webp",
          "/images/dp-1/PRIORITY_RENTALS-5.webp",
          "/images/dp-1/PRIORITY_RENTALS-11.webp",
          "/images/dp-1/PRIORITY_RENTALS-15.webp",
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
      description: "Elegante departamento con acabados de primera calidad y vistas impresionantes. Espacios amplios y luminosos, dormitorios confortables y una moderna cocina totalmente equipada. Ubicado estratégicamente para disfrutar de todas las atracciones de la zona.",
      capacity: 6,
      bedrooms: 3,
      bathrooms: 2,
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
      mainImage: "/images/dp-3/PRIORITY_RENTALS-45.webp",
      description: "Moderno departamento con diseño contemporáneo y todas las comodidades. Disfrute de sus espaciosos ambientes, terraza privada y vistas panorámicas al lago y las montañas. Perfecto para familias o grupos de amigos que buscan una experiencia única en Bariloche.",
      capacity: 5,
      bedrooms: 2,
      bathrooms: 2,
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
      description: "Exclusivo departamento de lujo con acabados premium y vistas espectaculares. Cuenta con amplios espacios, cocina gourmet, y todas las comodidades para una estadía inolvidable. Ubicación privilegiada con fácil acceso a los principales atractivos turísticos.",
      capacity: 7,
      bedrooms: 3,
      bathrooms: 2,
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
