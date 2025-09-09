"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  Calendar, 
  MessageSquare, 
  Brain, 
  Zap, 
  Edit, 
  Trash2,
  Clock,
  User,
  Activity
} from "lucide-react";
import { toast } from "sonner";

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

interface ClientDetailViewProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export function ClientDetailView({ client, isOpen, onClose }: ClientDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingInteraction, setIsAddingInteraction] = useState(false);
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
  const analyzeClient = useQuery(api.ai.analyzeClient, { clientId: client._id as any });
  const categorizeClient = useMutation(api.ai.categorizeClient);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Inactivo": return "bg-red-100 text-red-800";
      case "Potencial": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "llamada": return <Phone className="h-4 w-4" />;
      case "email": return <MessageSquare className="h-4 w-4" />;
      case "reunion": return <Calendar className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRelativeDate = (timestamp: number) => {
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
      setIsEditing(false);
    } catch (error) {
      toast.error("Error al actualizar el cliente");
    }
  };

  const handleDeleteClient = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer.")) {
      try {
        await deleteClient({ id: client._id as any });
        toast.success("Cliente eliminado correctamente");
        onClose();
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
      setIsAddingInteraction(false);
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

  const handleCategorizeClient = async () => {
    try {
      const result = await categorizeClient({ clientId: client._id as any });
      toast.success(`Cliente categorizado automáticamente: ${result.previousStatus} → ${result.newStatus}`);
    } catch (error) {
      toast.error("Error al categorizar el cliente");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {client.name}
          </DialogTitle>
          <DialogDescription>
            Información detallada y gestión del cliente
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="interactions">Interacciones</TabsTrigger>
            <TabsTrigger value="ai">Análisis IA</TabsTrigger>
            <TabsTrigger value="actions">Acciones</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información Básica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="edit-name">Nombre completo</Label>
                        <Input
                          id="edit-name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-phone">Teléfono</Label>
                        <Input
                          id="edit-phone"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-status">Estado</Label>
                        <Select 
                          value={editForm.status} 
                          onValueChange={(value: any) => setEditForm({ ...editForm, status: value })}
                        >
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
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateClient}>Guardar</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{client.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Última interacción: {formatRelativeDate(client.lastInteraction)}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                        className="w-full"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar información
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total interacciones:</span>
                    <span className="font-medium">{client.interactions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cliente desde:</span>
                    <span className="font-medium">{formatDate(client.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Última actualización:</span>
                    <span className="font-medium">{formatDate(client.updatedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Historial de Interacciones</h3>
              <Button onClick={() => setIsAddingInteraction(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Nueva Interacción
              </Button>
            </div>

            {client.interactions.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sin interacciones</h3>
                  <p className="text-gray-600 mb-4">
                    Este cliente aún no tiene interacciones registradas.
                  </p>
                  <Button onClick={() => setIsAddingInteraction(true)}>
                    Agregar primera interacción
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {client.interactions
                  .sort((a, b) => b.date - a.date)
                  .map((interaction) => (
                    <Card key={interaction.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {getInteractionIcon(interaction.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium capitalize">
                                {interaction.type}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatDate(interaction.date)}
                              </span>
                            </div>
                            <p className="text-gray-700">{interaction.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Análisis de Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyzeClient ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">Estado:</span>
                        <p className="text-sm text-gray-600">{analyzeClient.analysis}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Prioridad:</span>
                        <Badge className={
                          analyzeClient.priority === "Alta" ? "bg-red-100 text-red-800" :
                          analyzeClient.priority === "Media" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }>
                          {analyzeClient.priority}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Días sin contacto:</span>
                        <p className="text-sm text-gray-600">{analyzeClient.daysSinceLastInteraction}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Total interacciones:</span>
                        <p className="text-sm text-gray-600">{analyzeClient.totalInteractions}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-blue-800">Recomendación:</span>
                        <p className="text-sm text-blue-700 mt-1">{analyzeClient.suggestion}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-sm text-gray-600 mt-2">Analizando cliente...</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Acciones IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleCategorizeClient}
                    className="w-full"
                    variant="outline"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Categorizar Automáticamente
                  </Button>
                  <p className="text-xs text-gray-600">
                    La IA analizará las interacciones y asignará el estado más apropiado.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cambio Rápido de Estado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(["Activo", "Inactivo", "Potencial"] as const).map((status) => (
                    <Button
                      key={status}
                      variant={client.status === status ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleQuickStatusChange(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Acciones Peligrosas</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleDeleteClient}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Cliente
                  </Button>
                  <p className="text-xs text-gray-600 mt-2">
                    Esta acción no se puede deshacer.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog para agregar interacción */}
        <Dialog open={isAddingInteraction} onOpenChange={setIsAddingInteraction}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Interacción</DialogTitle>
              <DialogDescription>
                Registra una nueva interacción con {client.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="interaction-type">Tipo de interacción</Label>
                <Select 
                  value={interactionForm.type} 
                  onValueChange={(value: any) => setInteractionForm({ ...interactionForm, type: value })}
                >
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
                <Label htmlFor="interaction-description">Descripción</Label>
                <Textarea
                  id="interaction-description"
                  placeholder="Describe la interacción..."
                  value={interactionForm.description}
                  onChange={(e) => setInteractionForm({ ...interactionForm, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingInteraction(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddInteraction}>
                  Agregar interacción
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
