"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Calendar, MoreHorizontal, Edit, Trash2, MessageSquare, Brain } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ClientDetailView } from "./client-detail-view";

interface Client {
  _id: string;
  name: string;
  phone: string;
  status: "Activo" | "Inactivo" | "Potencial";
  lastInteraction: number;
  interactions: Array<{
    id: string;
    date: number;
    description: string;
    type: "llamada" | "email" | "reunion" | "otro";
  }>;
  createdAt: number;
  updatedAt: number;
}

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isInteractionOpen, setIsInteractionOpen] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: client.name,
    phone: client.phone,
    status: client.status,
  });
  
  const [interactionForm, setInteractionForm] = useState({
    description: "",
    type: "llamada" as "llamada" | "email" | "reunion" | "otro",
  });

  const updateClient = useMutation(api.clients.updateClient);
  const deleteClient = useMutation(api.clients.deleteClient);
  const addInteraction = useMutation(api.clients.addInteraction);
  const changeStatus = useMutation(api.clients.changeStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Inactivo": return "bg-red-100 text-red-800";
      case "Potencial": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Hoy";
    if (diffDays === 2) return "Ayer";
    if (diffDays <= 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString("es-ES");
  };

  const handleUpdateClient = async () => {
    try {
      await updateClient({
        id: client._id as any,
        ...editForm,
      });
      toast.success("Cliente actualizado correctamente");
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Error al actualizar el cliente");
    }
  };

  const handleDeleteClient = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      try {
        await deleteClient({ id: client._id as any });
        toast.success("Cliente eliminado correctamente");
      } catch (error) {
        toast.error("Error al eliminar el cliente");
      }
    }
  };

  const handleAddInteraction = async () => {
    if (!interactionForm.description.trim()) {
      toast.error("La descripción es requerida");
      return;
    }

    try {
      await addInteraction({
        clientId: client._id as any,
        description: interactionForm.description,
        type: interactionForm.type,
      });
      toast.success("Interacción agregada correctamente");
      setInteractionForm({ description: "", type: "llamada" });
      setIsInteractionOpen(false);
    } catch (error) {
      toast.error("Error al agregar la interacción");
    }
  };

  const handleQuickStatusChange = async (newStatus: "Activo" | "Inactivo" | "Potencial") => {
    try {
      await changeStatus({
        clientId: client._id as any,
        status: newStatus,
      });
      toast.success(`Estado cambiado a ${newStatus}`);
    } catch (error) {
      toast.error("Error al cambiar el estado");
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{client.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4" />
                {client.phone}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsDetailOpen(true)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsInteractionOpen(true)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Agregar interacción
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteClient()}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(client.status)}>
              {client.status}
            </Badge>
            <span className="text-sm text-gray-500">
              {formatDate(client.lastInteraction)}
            </span>
          </div>
          
          <div className="text-sm text-gray-600">
            {client.interactions.length} interacciones registradas
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => setIsDetailOpen(true)}
            >
              Ver detalles
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsInteractionOpen(true)}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Cambio rápido de estado */}
          <div className="flex gap-1">
            {(["Activo", "Inactivo", "Potencial"] as const).map((status) => (
              <Button
                key={status}
                variant={client.status === status ? "default" : "outline"}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => handleQuickStatusChange(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog para editar cliente */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
              Modifica la información del cliente {client.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <Select value={editForm.status} onValueChange={(value: any) => setEditForm({ ...editForm, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Potencial">Potencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateClient}>
                Guardar cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para agregar interacción */}
      <Dialog open={isInteractionOpen} onOpenChange={setIsInteractionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Interacción</DialogTitle>
            <DialogDescription>
              Registra una nueva interacción con {client.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="type">Tipo de interacción</Label>
              <Select value={interactionForm.type} onValueChange={(value: any) => setInteractionForm({ ...interactionForm, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llamada">Llamada</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="reunion">Reunión</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe la interacción..."
                value={interactionForm.description}
                onChange={(e) => setInteractionForm({ ...interactionForm, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsInteractionOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddInteraction}>
                Agregar interacción
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vista detallada del cliente */}
      <ClientDetailView 
        client={client} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />
    </>
  );
}
