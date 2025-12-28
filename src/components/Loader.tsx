import { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadComplete: () => void;
}

export default function Loader({ onLoadComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar el tamaño de pantalla
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint es 1024px
    };

    // Verificar tamaño inicial
    checkScreenSize();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkScreenSize);

    // Preload de imágenes críticas
    const imagesToPreload = [
      '/images/dp-2/PRIORITY_RENTALS-29.webp', // Imagen del hero
      '/assets/logo.svg', // Logo de desktop
      '/assets/logotipo.svg', // Logo de mobile
    ];

    const imagePromises = imagesToPreload.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Continuar aunque falle
        img.src = src;
      });
    });

    // Esperar a que las imágenes se carguen, especialmente la del hero
    Promise.all([
      Promise.all(imagePromises),
      new Promise((resolve) => setTimeout(resolve, 1000)), // Tiempo mínimo
    ]).then(() => {
      setIsAnimating(true);
      
      // Después de la animación de salida, ocultar el loader
      setTimeout(() => {
        setIsVisible(false);
        onLoadComplete();
      }, 500);
    });

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [onLoadComplete]);

  if (!isVisible) return null;

  // Mostrar el logo contrario al del menú:
  // - Si es mobile, mostrar logo.svg (el de desktop)
  // - Si es desktop, mostrar logotipo.svg (el de mobile)
  const logoSource = isMobile ? '/assets/logo.svg' : '/assets/logotipo.svg';

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#EFECE4] flex items-center justify-center transition-opacity duration-500 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`transition-all duration-500 ${
          isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <img
          src={logoSource}
          alt="LUNA HUAPI"
          className="max-w-[400px] max-h-[240px] w-auto h-auto object-contain animate-pulse"
        />
      </div>
    </div>
  );
}

