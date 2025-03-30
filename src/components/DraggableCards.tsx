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
  lastX: number;
  velocity: number;
  timestamp: number;
  animationId: number | null;
}

export default function Departments() {
  const { departments } = useDepartments();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    lastX: 0,
    velocity: 0,
    timestamp: 0,
    animationId: null
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

  useEffect(() => {
    return () => {
      if (dragStateRef.current.animationId) {
        cancelAnimationFrame(dragStateRef.current.animationId);
      }
    };
  }, []);

  const getCardWidth = useCallback(() => {
    return window.innerWidth >= 1024 ? 576 + 20 : 300 + 20;
  }, []);

  const scrollToCard = useCallback((index: number) => {
    if (!sliderRef.current) return;
    
    const boundedIndex = Math.max(0, Math.min(departments.length - 1, index));
    const cardWidth = getCardWidth();
    const newScrollLeft = boundedIndex * cardWidth;
    
    if (dragStateRef.current.animationId) {
      cancelAnimationFrame(dragStateRef.current.animationId);
      dragStateRef.current.animationId = null;
    }
    
    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    
    setActiveIndex(boundedIndex);
  }, [departments.length, getCardWidth]);

  const handleCardClick = useCallback((e: React.MouseEvent, index: number) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    if (dragStateRef.current.isDragging || Math.abs(dragStateRef.current.velocity) > 0.5) {
      return;
    }
    
    if (index > activeIndex) {
      scrollToCard(Math.min(departments.length - 1, activeIndex + 1));
    } 
    else if (index < activeIndex) {
      scrollToCard(Math.max(0, activeIndex - 1));
    }
  }, [activeIndex, departments.length, scrollToCard]);

  const applyMomentum = useCallback(() => {
    if (!sliderRef.current) return;
    
    const friction = 0.92; 
    const minVelocity = 0.5;
    
    const animate = () => {
      if (!sliderRef.current) return;
      
      dragStateRef.current.velocity *= friction;
      
      sliderRef.current.scrollLeft -= dragStateRef.current.velocity;
      
      const cardWidth = getCardWidth();
      const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
      
      if (Math.abs(dragStateRef.current.velocity) > minVelocity) {
        dragStateRef.current.animationId = requestAnimationFrame(animate);
      } else {
        const snapIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
        const targetScrollLeft = snapIndex * cardWidth;
        
        if (Math.abs(sliderRef.current.scrollLeft - targetScrollLeft) > 2) {
          sliderRef.current.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
          });
        }
        
        dragStateRef.current.velocity = 0;
        dragStateRef.current.animationId = null;
      }
    };
    
    if (dragStateRef.current.animationId) {
      cancelAnimationFrame(dragStateRef.current.animationId);
    }
    
    dragStateRef.current.animationId = requestAnimationFrame(animate);
  }, [activeIndex, getCardWidth]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    if (dragStateRef.current.animationId) {
      cancelAnimationFrame(dragStateRef.current.animationId);
      dragStateRef.current.animationId = null;
    }
    
    dragStateRef.current = {
      isDragging: true,
      startX: e.pageX - sliderRef.current.offsetLeft,
      scrollLeft: sliderRef.current.scrollLeft,
      lastX: e.pageX,
      velocity: 0,
      timestamp: Date.now(),
      animationId: null
    };
    
    e.preventDefault();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    if (dragStateRef.current.animationId) {
      cancelAnimationFrame(dragStateRef.current.animationId);
      dragStateRef.current.animationId = null;
    }
    
    const touch = e.touches[0];
    dragStateRef.current = {
      isDragging: true,
      startX: touch.pageX - sliderRef.current.offsetLeft,
      scrollLeft: sliderRef.current.scrollLeft,
      lastX: touch.pageX,
      velocity: 0,
      timestamp: Date.now(),
      animationId: null
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (dragStateRef.current.isDragging) {
      applyMomentum();
      dragStateRef.current.isDragging = false;
    }
  }, [applyMomentum]);

  const handleMouseUp = useCallback(() => {
    if (dragStateRef.current.isDragging) {
      applyMomentum();
      dragStateRef.current.isDragging = false;
    }
  }, [applyMomentum]);

  const handleTouchEnd = useCallback(() => {
    if (dragStateRef.current.isDragging) {
      applyMomentum();
      dragStateRef.current.isDragging = false;
    }
  }, [applyMomentum]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { isDragging, startX, scrollLeft, lastX, timestamp } = dragStateRef.current;
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    
    const currentX = e.pageX;
    const currentTime = Date.now();
    const elapsed = currentTime - timestamp;
    const delta = lastX - currentX;
    
    if (elapsed > 0) {
      const newVelocity = delta / elapsed * 15;
      dragStateRef.current.velocity = 0.8 * newVelocity + 0.2 * dragStateRef.current.velocity;
    }
    
    dragStateRef.current.timestamp = currentTime;
    dragStateRef.current.lastX = currentX;
    
    const x = currentX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    
    requestAnimationFrame(() => {
      if (sliderRef.current && isDragging) {
        sliderRef.current.scrollLeft = scrollLeft - walk;
        
        const cardWidth = getCardWidth();
        const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
        
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    });
  }, [activeIndex, getCardWidth]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const { isDragging, startX, scrollLeft, lastX, timestamp } = dragStateRef.current;
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    
    const touch = e.touches[0];
    const currentX = touch.pageX;
    const currentTime = Date.now();
    const elapsed = currentTime - timestamp;
    const delta = lastX - currentX;
    
    if (elapsed > 0) {
      const newVelocity = delta / elapsed * 15;
      dragStateRef.current.velocity = 0.8 * newVelocity + 0.2 * dragStateRef.current.velocity;
    }
    
    dragStateRef.current.timestamp = currentTime;
    dragStateRef.current.lastX = currentX;
    
    const x = currentX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    
    requestAnimationFrame(() => {
      if (sliderRef.current && isDragging) {
        sliderRef.current.scrollLeft = scrollLeft - walk;
        
        const cardWidth = getCardWidth();
        const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
        
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    });
  }, [activeIndex, getCardWidth]);

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
          className="flex overflow-x-auto scrollbar-draggable gap-5"
          style={{ 
            scrollBehavior: dragStateRef.current.isDragging ? 'auto' : 'smooth',
            scrollSnapType: dragStateRef.current.isDragging ? 'none' : 'x mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {departments.map((department, index) => (
            <Card
              key={department.id}
              title={department.title}
              className="w-[300px] lg:w-[576px] h-fit flex-shrink-0 transition-all cursor-pointer"
              style={{ 
                scrollSnapAlign: 'start',
                transform: dragStateRef.current.isDragging 
                  ? `perspective(1000px)
                     translateZ(${Math.abs(index - activeIndex) * -10}px)`
                  : 'none',
              }}
              onClick={(e) => handleCardClick(e, index)}
            >
              <CardContent className="lg:mb-20 relative overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={department.mainImage}
                    alt={language === 'en' && department.titleEn ? department.titleEn : department.title}
                    className="object-cover w-full h-[300px] lg:h-[548px] transition-transform duration-300 mb-4"
                    draggable={false}
                    loading="eager"
                    width={576}
                    height={448}
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