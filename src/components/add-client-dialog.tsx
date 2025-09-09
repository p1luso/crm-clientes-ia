"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddClientDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    status: "Potencial" as "Activo" | "Inactivo" | "Potencial",
  });

  const createClient = useMutation(api.clients.createClient);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      await createClient({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        status: formData.status,
      });
      
      toast.success("Cliente creado correctamente");
      setFormData({ name: "", phone: "", status: "Potencial" });
      setIsOpen(false);
    } catch (error) {
      toast.error("Error al crear el cliente");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
          <DialogDescription>
            Completa la información básica del cliente para comenzar el seguimiento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              placeholder="Ej: Juan Pérez"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Número de teléfono *</Label>
            <Input
              id="phone"
              placeholder="Ej: +54 9 11 1234-5678"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Estado de relación</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: "Activo" | "Inactivo" | "Potencial") => 
                handleInputChange("status", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Potencial">Potencial - Cliente nuevo sin interacciones</SelectItem>
                <SelectItem value="Activo">Activo - Cliente con interacciones recientes</SelectItem>
                <SelectItem value="Inactivo">Inactivo - Cliente sin actividad reciente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              Crear Cliente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
