import React, { useState, useRef, useCallback } from "react";
import { create } from "zustand";
import {
  Dialog,
  DialogContent,
} from "../components/ui/dialog";
import { Card, CardContent } from "../components/ui/card";
import ApartmentDetail from "./ApartmentDetails";
import { Button } from "./ui/button";

interface Department {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
  lastX: number;
}

const useDepartments = create<{
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
}>((set) => ({
  departments: Array.from({ length: 4 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Departamento ${i + 1}`,
    image: "/test3.png",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `,
  })),
  setDepartments: (departments) => set({ departments }),
}));

export default function Departments() {
  const { departments } = useDepartments();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
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

  return (
    <section className="bg-background overflow-hidden w-full pointer-drag select-none">
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
                    src={department.image}
                    alt={department.title}
                    className={`
                      object-cover w-full h-[300px] lg:h-[648px] transition-transform duration-300 mb-4
                      ${dragStateRef.current.isDragging ? 'scale-[1.00]' : 'scale-100'}
                    `}
                    draggable={false}
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
                    className="text-xl lg:text-xl text-primary/60 z-50 uppercase underline underline-offset-10 underline-
                    hover:cursor-pointer font-extralight"
                    onClick={() => setSelectedDepartment(department)}
                  >
                    Ver más →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
        <DialogContent>
          <ApartmentDetail 
            department={selectedDepartment} 
            onClose={() => setSelectedDepartment(null)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}