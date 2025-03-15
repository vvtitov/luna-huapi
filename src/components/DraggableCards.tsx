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
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { isDragging, startX, scrollLeft } = dragStateRef.current;
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    const cardWidth = 576 + 20;
    const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
    setActiveIndex(newIndex);
  }, []);

  // Optimize dialog opening
  const handleOpenDialog = useCallback((department: Department) => {
    // Set loading state for this department
    setLoadingDepartment(department.id);
    
    // Preload department images before opening dialog
    const preloadImages = async () => {
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
      
      // Set selected department and open dialog
      setSelectedDepartment(department);
      setIsDialogOpen(true);
      setLoadingDepartment(null);
      
      // Continue preloading other images in the background
      Promise.all(preloadPromises).catch(() => {
        // Silently handle any errors
      });
    };
    
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
              `}
              style={{ 
                scrollSnapAlign: 'start',
                transform: dragStateRef.current.isDragging 
                  ? `perspective(1000px)
                     translateZ(${Math.abs(index - activeIndex) * -10}px)`
                  : 'none',
                
              }}
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
                    onClick={() => handleOpenDialog(department)}
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