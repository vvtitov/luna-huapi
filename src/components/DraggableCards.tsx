import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { create } from "zustand";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Card, CardContent } from "../components/ui/card";

interface Department {
  id: string;
  title: string;
  image: string;
  description: string;
}

const useDepartments = create<{
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
}>((set) => ({
  departments: Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Departamento ${i + 1}`,
    image: "/test2.jpeg", // Fixed URL to ensure unique images
    description: `Descripción del departamento ${i + 1}.`,
  })),
  setDepartments: (departments) => set({ departments }),
}));

export default function Departments() {
  const { departments, setDepartments } = useDepartments();
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(departments);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setDepartments(reordered);
  };

  return (
    <section className="bg-background overflow-hidden">
      <div className="container mx-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="departments" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-5 overflow-x-auto h-auto w-full scrollbar-draggable cursor-grab"
              >
                {departments.map((department, index) => (
                  <Draggable
                    key={department.id}
                    draggableId={department.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`cursor-pointer shadow-lg w-[576px] flex-shrink-0 ${
                          snapshot.isDragging ? "opacity-70" : ""
                        }`}
                        onClick={() => setSelectedDepartment(department)}
                      >
                        <CardContent className="mb-10">
                          <div>
                            <img
                              src={department.image}
                              alt={department.title}
                              className="object-cover w-full rounded-lg"
                            />
                          </div>
                          <div className="flex justify-between items-center rounded-md mt-4">
                            <span className="text-sm font-semibold text-primary uppercase">
                              {department.title}
                            </span>
                            <button
                              className="text-sm font-semibold text-primary z-50 uppercase underline underline-offset-6"
                              onClick={() => setSelectedDepartment(department)}
                            >
                              Ver más →
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Dialog
          open={!!selectedDepartment}
          onOpenChange={() => setSelectedDepartment(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDepartment?.title}</DialogTitle>
            </DialogHeader>
            <img
              src={selectedDepartment?.image}
              alt={selectedDepartment?.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="mt-4 text-white">{selectedDepartment?.description}</p>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
