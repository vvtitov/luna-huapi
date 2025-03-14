"use client"

import { X } from "lucide-react"
import * as React from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"
import { Department } from "./ApartmentsConfig"

interface ApartmentDetailProps {
  department: Department | null;
  onClose: () => void;
}

export default function ApartmentDetail({ department, onClose }: ApartmentDetailProps) {
  if (!department) return null;

  // Combine apartment and building images
  const allImages = [
    department.mainImage,
    ...department.images.apartment,
    ...department.images.building
  ];

  const [selectedImage, setSelectedImage] = React.useState(department.mainImage);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 overflow-y-auto md:overflow-scroll bg-[#EBE6D7] scrollbar-hidden">
      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Thumbnails */}
        <div className="block md:flex flex-col gap-2 p-4 border-r space-x-3 mx-auto">
          {allImages.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(thumb)}
              className="relative w-20 h-20 overflow-hidden rounded-md hover:opacity-80 transition-opacity "
            >
              <img
                src={thumb || "/placeholder.svg"}
                alt={`Thumbnail ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative h-[20rem] md:h-full w-full md:w-1/2">
          <img 
            src={selectedImage || department.mainImage} 
            alt={department.title} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info Panel */}
        <div className="w-full relative md:w-1/2 border-t md:border-l bg-[#EBE6D7] p-5 md:overflow-scroll md:overflow-x-auto min-w-md">
          <div className="fixed top-20 right-6 md:top-8 md:right-18 lg:flex lg:justify-end rounded-full bg-background/80 backdrop-blur-sm">
            <button 
              onClick={onClose}
              className="rounded-full p-4 border border-muted font-extralight hover:scale-105 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-4 md:px-8 md:pt-16">

            <div className="h-px bg-[#565656] opacity-20 flex-grow mb-12 md:my-12"></div>
          <div className="flex flex-col items-start mb-12 font-inter">
            <p className="text-light text-lg">
              02 
              <span className="text-light px-4">/</span> 
              <span className="text-primary uppercase text-lg">{department.title}</span>
            </p>
            <p className="text-muted-foreground mt-8">
                {department.description}
              </p>
          </div>
            <div className="grid-row sm:grid-cols-3 lg:flex lg:flex-row mx-auto justify-center gap-4 mb-8 font-inter w-full text-center shrink-1 space-y-3 lg:space-y-0">
              <Card className="px-3 py-6 min-w-fit border rounded-md border-primary lg:w-1/3">
                <h3 className="font-medium text-lg">CAPACIDAD</h3>
                <p className="text-4xl text-muted-foreground">{department.capacity}</p>
              </Card>
              <Card className="px-3 py-6 min-w-fit border rounded-md border-primary lg:w-1/3">
                <h3 className="font-medium text-lg">HABITACIONES</h3>
                <p className="text-4xl text-muted-foreground">{department.bedrooms}</p>
              </Card>
              <Card className="px-3 py-6 min-w-fit border rounded-md border-primary lg:w-1/3">
                <h3 className="font-medium text-lg">BAÑOS</h3>
                <p className="text-4xl text-muted-foreground">{department.bathrooms}</p>
              </Card>
            </div>

            <div className="space-y-4 mb-8 font-inter">
              {[
                { title: "CHECK IN", desc: "15:00 HS", data: "FLEXIBLE" },
                { title: "CHECK OUT", desc: "10:00 HS", data: "FLEXIBLE" },
                { title: "MASCOTAS", desc: "CONSULTAR", data: "SI" }
              ].map((item) => (
                <div key={item.title} className="grid grid-cols-3 gap-4 py-4">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-muted-foreground">{item.desc}</div>
                  <div className="text-right text-muted-foreground">{item.data}</div>
                  <Separator className="col-span-3 bg-muted-foreground h-px" />
                  
                </div>
                
              ))}
            </div>

            <div className="flex gap-4">
              <Button className="flex bg-[#4A4A4A] text-white hover:bg-[#3A3A3A] px-6 py-4 rounded-full text-lg">
                Reserva
              </Button>
              <Button variant="default" className="bg-transparent flex rounded-full text-primary border border-primary px-6 py-4 text-lg">
                Contactanos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
