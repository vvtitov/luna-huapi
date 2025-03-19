import React, { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
} from "../components/ui/dialog";
import { Card, CardContent } from "../components/ui/card";
import ApartmentDetail from "./ApartmentDetails";
import { Button } from "./ui/button";
import { useDepartments, Department } from "./ApartmentsConfig";

interface DragState {
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
  lastX: number;
}

export default function Departments() {
  const { departments } = useDepartments();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    lastX: 0
  });

  // Function to scroll to a specific card
  const scrollToCard = useCallback((index: number) => {
    if (!sliderRef.current) return;
    
    const cardWidth = window.innerWidth >= 1024 ? 576 + 20 : 300 + 20;
    const newScrollLeft = index * cardWidth;
    
    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    
    setActiveIndex(index);
  }, []);

  // Handle click on card image
  const handleCardClick = useCallback((e: React.MouseEvent, index: number) => {
    // Don't trigger navigation if clicking on the "Ver más" button
    if ((e.target as HTMLElement).closest('button')) return;
    
    // If clicking on a card to the right of current active card, go to next card
    if (index > activeIndex) {
      scrollToCard(Math.min(departments.length - 1, activeIndex + 1));
    } 
    // If clicking on a card to the left of current active card, go to previous card
    else if (index < activeIndex) {
      scrollToCard(Math.max(0, activeIndex - 1));
    }
  }, [activeIndex, departments.length, scrollToCard]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    dragStateRef.current = {
      isDragging: true,
      startX: e.pageX - sliderRef.current.offsetLeft,
      scrollLeft: sliderRef.current.scrollLeft,
      lastX: e.pageX
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    dragStateRef.current.isDragging = false;
  }, []);

  const handleMouseUp = useCallback(() => {
    dragStateRef.current.isDragging = false;
    
    // Snap to nearest card after dragging ends
    if (sliderRef.current) {
      const cardWidth = window.innerWidth >= 1024 ? 576 + 20 : 300 + 20;
      const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
      
      if (newIndex !== activeIndex) {
        scrollToCard(newIndex);
      }
    }
  }, [activeIndex, scrollToCard]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { isDragging, startX, scrollLeft } = dragStateRef.current;
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    const cardWidth = window.innerWidth >= 1024 ? 576 + 20 : 300 + 20;
    const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
    setActiveIndex(newIndex);
  }, []);

  // Optimize dialog opening
  const handleOpenDialog = useCallback((department: Department) => {
    // Set loading state for this department
    setLoadingDepartment(department.id);
    
    // Set selected department and open dialog immediately
    // This prevents the modal from closing unexpectedly on mobile
    setSelectedDepartment(department);
    setIsDialogOpen(true);
    
    // Preload department images in the background after dialog is open
    const preloadImages = async () => {
      try {
        // Start loading the main image first
        const mainImg = new Image();
        mainImg.src = department.mainImage;
        
        // Then preload a few apartment images
        const imagesToPreload = [
          ...department.images.apartment.slice(0, 3)
        ];
        
        // Create an array of promises for image loading
        const preloadPromises = imagesToPreload.map(src => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
          });
        });
        
        // Wait for main image to load
        await new Promise(resolve => {
          mainImg.onload = resolve;
          mainImg.onerror = resolve;
        });
        
        // Continue preloading other images in the background
        Promise.all(preloadPromises).catch(() => {
          // Silently handle any errors
        });
      } finally {
        // Always clear loading state, even if errors occur
        setLoadingDepartment(null);
      }
    };
    
    // Start preloading in the background
    preloadImages();
  }, []);

  // Optimize dialog closing
  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    // Clear selected department after animation completes
    setTimeout(() => {
      setSelectedDepartment(null);
    }, 300);
  }, []);

  return (
    <section className="bg-[#EFECE4] overflow-hidden w-full select-none">
      <div className="mx-auto">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto scrollbar-draggable gap-5"
          style={{ 
            scrollBehavior: dragStateRef.current.isDragging ? 'auto' : 'smooth',
            scrollSnapType: dragStateRef.current.isDragging ? 'none' : 'x mandatory',
          }}
        >
          {departments.map((department, index) => (
            <Card
              key={department.id}
              className={`
                w-[300px] lg:w-[576px] h-fit flex-shrink-0 transition-all
                cursor-pointer
              `}
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
                    alt={department.title}
                    className={`
                      object-cover w-full h-[300px] lg:h-[448px] transition-transform duration-300 mb-4
                      ${dragStateRef.current.isDragging ? 'scale-[1.00]' : 'scale-100'}
                    `}
                    draggable={false}
                    loading="lazy"
                    width={576}
                    height={448}
                  />
                  <div 
                    className={`
                      absolute inset-0 transition-opacity duration-300
                      ${dragStateRef.current.isDragging ? 'opacity-100' : 'opacity-0'}
                    `}
                  />
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center rounded-md mt-4 font-inter pb-2">
                  <span className="text-xl lg:text-xl text-primary uppercase font-extralight mb-3 lg:mb-0">
                    {department.title}
                  </span>
                  <Button
                    variant="link"
                    className="text-xl lg:text-xl text-primary/60 z-50 uppercase underline underline-offset-10 pointer-primary font-extralight"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking the button
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
                        Cargando...
                      </span>
                    ) : (
                      "Ver más →"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          {selectedDepartment && (
            <ApartmentDetail 
              department={selectedDepartment} 
              onClose={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}