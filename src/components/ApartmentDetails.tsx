"use client"

import { X } from "lucide-react"
import * as React from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"

interface Department {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface ApartmentDetailProps {
  department: Department | null;
  onClose: () => void;
}

export default function ApartmentDetail({ department, onClose }: ApartmentDetailProps) {
  if (!department) return null;

  const thumbnails = [
    department.image,
    "/test3.png",
    "/test.png",
    "/test3.png",
    "/test.png",
  ]

  const [selectedImage, setSelectedImage] = React.useState(department.image)

  return (
    <div className="relative w-full h-full bg-background">
      <div className="flex h-full w-full">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-2 p-4 border-r">
          {thumbnails.map((thumb, idx) => (
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
        <div className="relative flex-1">
          <img 
            src={selectedImage || department.image} 
            alt={department.title} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info Panel */}
        <div className="w-1/2 border-l bg-background overflow-y-auto">
          <div className="sticky top-0 flex justify-end p-4 bg-background/80 backdrop-blur-sm">
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-muted"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-8 pb-8">
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-2">
                {department.id} / {department.title}
              </div>
              <p className="text-muted-foreground">
                {department.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card className="p-4">
                <h3 className="font-medium mb-2">CAPACIDAD</h3>
                <p className="text-sm text-muted-foreground">4 PERSONAS</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-medium mb-2">HABITACIONES</h3>
                <p className="text-sm text-muted-foreground">2 DORMITORIOS</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-medium mb-2">BAÑOS</h3>
                <p className="text-sm text-muted-foreground">1 COMPLETO</p>
              </Card>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { title: "CHECK IN", desc: "15:00 HS", data: "FLEXIBLE" },
                { title: "CHECK OUT", desc: "10:00 HS", data: "FLEXIBLE" },
                { title: "MASCOTAS", desc: "CONSULTAR", data: "SI" }
              ].map((item) => (
                <div key={item.title} className="grid grid-cols-3 gap-4 py-4">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-muted-foreground">{item.desc}</div>
                  <div className="text-right text-muted-foreground">{item.data}</div>
                  <Separator className="col-span-3" />
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-[#4A4A4A] text-white hover:bg-[#3A3A3A] px-4 py-6 rounded-full">
                Reserva
              </Button>
              <Button variant="default" className="flex-1 rounded-full text-primary bg-transparent border border-primary">
                Contactanos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
