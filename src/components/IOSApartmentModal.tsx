import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Department } from "./ApartmentsConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface IOSApartmentModalProps {
  department: Department;
  onClose: () => void;
  isOpen: boolean;
}

/**
 * Un componente modal simplificado específicamente para iOS
 * que evita problemas de rendimiento y cierre automático
 */
export default function IOSApartmentModal({ department, onClose, isOpen }: IOSApartmentModalProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Limitamos drásticamente el número de imágenes para iOS
  const allImages = React.useMemo(() => {
    // Máximo 3 imágenes para evitar problemas de memoria
    const uniqueImages = [
      ...new Set([
        ...department.images.apartment.slice(0, 2),
        ...department.images.building.slice(0, 1)
      ])
    ].filter(img => img !== department.mainImage);
    
    return [department.mainImage, ...uniqueImages.slice(0, 2)];
  }, [department]);

  const [selectedImage, setSelectedImage] = useState(department.mainImage);
  const [isLoading, setIsLoading] = useState(false);

  // Evitamos el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    }
    
    return () => {
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const navigateToNextImage = () => {
    setIsLoading(true);
    const currentIndex = allImages.findIndex(img => img === selectedImage);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
  };

  const navigateToPreviousImage = () => {
    setIsLoading(true);
    const currentIndex = allImages.findIndex(img => img === selectedImage);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[prevIndex]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#EBE6D7] overflow-y-auto overscroll-none" 
      style={{ 
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'none'
      }}
    >
      <div className="flex flex-col h-full w-full">
        <div className="relative h-[20rem] md:h-1/2 w-full">
          <img 
            src={selectedImage || department.mainImage} 
            alt={department.title} 
            className="object-cover w-full h-full cursor-pointer"
            width={800}
            height={600}
            loading="eager"
            onLoad={handleImageLoad}
            onClick={navigateToNextImage}
            style={{ touchAction: 'manipulation' }}
          />
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-background/30 backdrop-blur-sm">
              <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
          
          <div className="absolute bottom-4 left-0 right-0 hidden lg:flex justify-center items-center space-x-4">
            <button 
              onClick={navigateToPreviousImage}
              className="p-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button 
              onClick={navigateToNextImage}
              className="p-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>

        <div className="w-full relative md:w-full border-t md:border-l bg-[#EBE6D7] p-5 overflow-y-auto">
          <div className="fixed top-20 right-3 md:top-8 md:right-8 lg:flex lg:justify-end rounded-full bg-background/80 backdrop-blur-sm">
            <button 
              onClick={onClose}
              className="p-3 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 hover:scale-115 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-4 mt-10">
            <div className="flex flex-col items-start mb-12 font-inter">
              <p className="text-light text-lg">
                02 
                <span className="text-light px-4">/</span> 
                <span className="text-primary uppercase text-lg">{language === 'en' && department.titleEn ? department.titleEn : department.title}</span>
              </p>
              <p className="text-muted-foreground mt-8">
                {language === 'en' ? department.descriptionEn || department.description : department.description}
              </p>
            </div>
            
            <div className="grid-row sm:grid-cols-3 lg:flex lg:flex-row mx-auto justify-center gap-4 mb-8 font-inter w-full text-center shrink-1 space-y-3 lg:space-y-0">
              <Card className="px-3 py-6 border rounded-md border-primary/70 lg:w-1/3">
                <h3 className="font-medium text-lg text-primary">{t('apartment.capacity')}</h3>
                <p className="text-4xl text-muted-foreground">{department.capacity}</p>
              </Card>
              <Card className="px-3 py-6 border rounded-md border-primary/70 lg:w-1/3">
                <h3 className="font-medium text-lg text-primary">{t('apartment.bedrooms')}</h3>
                <p className="text-4xl text-muted-foreground">{department.bedrooms}</p>
              </Card>
              <Card className="px-3 py-6 border rounded-md border-primary/70 lg:w-1/3">
                <h3 className="font-medium text-lg text-primary">{t('apartment.bathrooms')}</h3>
                <p className="text-4xl text-muted-foreground">{department.bathrooms}</p>
              </Card>
            </div>

            <div className="space-y-4 mb-8 font-inter">
              {[
                { title: t('apartment.checkIn'), desc: department.checkIn.time, data: language === 'en' ? "FLEXIBLE" : department.checkIn.flexibility },
                { title: t('apartment.checkOut'), desc: department.checkOut.time, data: language === 'en' ? "FLEXIBLE" : department.checkOut.flexibility },
                { title: t('apartment.parking'), desc: language === 'en' ? "YES" : department.parking.details, data: language === 'en' ? (department.parking.availability === "DISPONIBLE" ? "AVAILABLE" : "CHECK AVAILABILITY") : department.parking.availability }
              ].map((item) => (
                <div key={item.title} className="grid grid-cols-3 gap-4 py-4 items-end">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-muted-foreground">{item.desc}</div>
                  <div className="text-right text-muted-foreground">{item.data}</div>
                  <Separator className="col-span-3 bg-muted-foreground h-px" />
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button 
                className="flex bg-[#4A4A4A] text-white hover:bg-[#3A3A3A] px-6 py-4 rounded-full text-lg"
                onClick={() => {
                  if (department.airbnbUrl) {
                    window.open(department.airbnbUrl, "_blank");
                  }
                }}
              >
                {t('apartment.book')}
              </Button>
              <Button 
                variant="default" 
                className="border border-primary/70 text-primary px-6 py-4 rounded-full mr-4 bg-transparent text-lg transition duration-300 hover:bg-white hover:text-[#3F3F3F]"
                onClick={() => {
                  if (department.whatsappUrl) {
                    window.open(department.whatsappUrl, "_blank");
                  } else {
                    window.open("https://wa.me/5492944327488", "_blank");
                  }
                }}
              >
                {t('apartment.contact')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
