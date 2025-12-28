import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "../components/ui/dialog";
import { Card, CardContent } from "../components/ui/card";
import ApartmentDetail from "./ApartmentDetails";
import IOSApartmentModal from "./IOSApartmentModal";
import { Button } from "./ui/button";
import { useDepartments, Department } from "./ApartmentsConfig";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../i18n/LanguageContext";

interface DragState {
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
  startY?: number;
}

export default function Departments() {
  const { departments } = useDepartments();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });
  
  const isIOS = useRef<boolean>(false);
  
  useEffect(() => {
    isIOS.current = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-draggable::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }
    `;
    document.head.appendChild(style);

    departments.forEach(department => {
      const img = new Image();
      img.src = department.mainImage;
    });

    return () => {
      document.head.removeChild(style);
    };
  }, [departments]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    // No iniciar drag si se hace clic en un botón o enlace
    if ((e.target as HTMLElement).closest('button, a')) {
      return;
    }
    
    dragStateRef.current = {
      isDragging: true,
      startX: e.pageX,
      scrollLeft: sliderRef.current.scrollLeft,
    };
    setIsDragging(true);
    
    e.preventDefault();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    // No iniciar drag si se toca un botón o enlace
    const target = e.touches[0];
    const element = document.elementFromPoint(target.clientX, target.clientY);
    if (element?.closest('button, a')) {
      return;
    }
    
    const touch = e.touches[0];
    dragStateRef.current = {
      isDragging: true,
      startX: touch.pageX,
      scrollLeft: sliderRef.current.scrollLeft,
      startY: touch.pageY,
    };
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isDragging || !sliderRef.current) return;

    e.preventDefault();
    
    const x = e.pageX;
    const walk = x - dragStateRef.current.startX;
    sliderRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isDragging || !sliderRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.pageX - dragStateRef.current.startX);
    const deltaY = Math.abs((touch.pageY || 0) - (dragStateRef.current.startY || 0));
    
    // Solo prevenir default si el movimiento es principalmente horizontal
    if (deltaX > deltaY && deltaX > 3) {
      e.preventDefault();
      
      // Multiplicador para hacer el drag más rápido y suave en mobile
      const walk = (touch.pageX - dragStateRef.current.startX) * 1.5;
      sliderRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    dragStateRef.current.isDragging = false;
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dragStateRef.current.isDragging = false;
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    dragStateRef.current.isDragging = false;
    dragStateRef.current.startY = undefined;
    setIsDragging(false);
  }, []);

  const handleOpenDialog = useCallback((department: Department) => {
    setLoadingDepartment(department.id);
    
    if (isIOS.current) {
      setSelectedDepartment(department);
      setIsDialogOpen(true);
      
      setTimeout(() => {
        setLoadingDepartment(null);
      }, 300);
    } else {
      setSelectedDepartment(department);
      
      setTimeout(() => {
        setIsDialogOpen(true);
        
        const preloadMainImage = async () => {
          try {
            const mainImg = new Image();
            mainImg.src = department.mainImage;
            
            await Promise.race([
              new Promise(resolve => {
                mainImg.onload = resolve;
                mainImg.onerror = resolve;
              }),
              new Promise(resolve => setTimeout(resolve, 2000))
            ]);
          } finally {
            setLoadingDepartment(null);
          }
        };
        
        preloadMainImage();
      }, 50);
    }
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    
    const delay = isIOS.current ? 800 : 500;
    
    setTimeout(() => {
      setSelectedDepartment(null);
      
      // Asegurar que la página permanezca en la sección de departamentos
      const departmentsSection = document.getElementById('los-departamentos');
      if (departmentsSection) {
        departmentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, delay);
  }, []);

  return (
    <section id="los-departamentos" className="bg-[#EFECE4] overflow-hidden w-full select-none">
      <div className="mx-auto">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          className={`flex overflow-x-auto scrollbar-draggable gap-5 touch-pan-x pl-6 lg:pl-10 pr-6 lg:pr-10 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ 
            scrollBehavior: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {departments.map((department, index) => (
            <Card
              key={index}
              className="min-w-[300px] lg:min-w-[576px] bg-transparent border-none shadow-none touch-none flex-shrink-0"
            >
              <CardContent className="lg:mb-20 relative overflow-hidden">
                <div className="relative overflow-hidden w-[300px] h-[300px] lg:w-[576px] lg:h-[576px] mb-4">
                  <img
                    src={department.mainImage}
                    alt={language === 'en' && department.titleEn ? department.titleEn : department.title}
                    className="object-cover w-full h-full transition-transform duration-300"
                    draggable={false}
                    loading="eager"
                    width={576}
                    height={576}
                  />
                  <div 
                    className="absolute inset-0 transition-opacity duration-300"
                  />
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center rounded-md mt-4 font-inter pb-2">
                  <span className="text-xl lg:text-xl text-primary uppercase font-extralight mb-3 lg:mb-0">
                    {language === 'en' && department.titleEn ? department.titleEn : department.title}
                  </span>
                  <Button
                    variant="link"
                    className="text-xl lg:text-xl text-primary/60 z-50 uppercase underline underline-offset-10 pointer-primary font-extralight"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDialog(department);
                    }}
                    disabled={loadingDepartment === department.id}
                  >
                    {loadingDepartment === department.id ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-4 w-4 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('apartment.loading')}
                      </span>
                    ) : (
                      t('apartment.seeMore')
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {isIOS.current ? (
        selectedDepartment && (
          <IOSApartmentModal
            department={selectedDepartment}
            onClose={() => {
              setIsDialogOpen(false);
              setTimeout(() => {
                setSelectedDepartment(null);
                
                // Asegurar que la página permanezca en la sección de departamentos
                const departmentsSection = document.getElementById('los-departamentos');
                if (departmentsSection) {
                  departmentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 500);
            }}
            isOpen={isDialogOpen}
          />
        )
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent>
            {selectedDepartment && (
              <ApartmentDetail 
                department={selectedDepartment} 
                onClose={() => {
                  setIsDialogOpen(false);
                  setTimeout(() => {
                    setSelectedDepartment(null);
                    
                    // Asegurar que la página permanezca en la sección de departamentos
                    const departmentsSection = document.getElementById('los-departamentos');
                    if (departmentsSection) {
                      departmentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 500);
                }}
                isIOS={false}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}