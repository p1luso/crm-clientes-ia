"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Phone, Calendar, TrendingUp, Brain, Zap } from "lucide-react";
import { ClientCard } from "./client-card";
import { AddClientDialog } from "./add-client-dialog";
import { AIAssistant } from "./ai-assistant";
import { AutomationPanel } from "./automation-panel";
import { ConvexStatus } from "./convex-status";

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("lastInteraction");

  const clients = useQuery(api.clients.getAllClients);
  const stats = useQuery(api.clients.getDashboardStats);
  const portfolioSummary = useQuery(api.ai.generatePortfolioSummary);

  if (!clients || !stats || !portfolioSummary) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Filtrar y ordenar clientes
  const filteredClients = clients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.phone.includes(searchTerm);
      const matchesStatus = statusFilter === "all" || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "lastInteraction":
          return b.lastInteraction - a.lastInteraction;
        case "createdAt":
          return b.createdAt - a.createdAt;
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Inactivo": return "bg-red-100 text-red-800";
      case "Potencial": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Desktop Layout */}
            <div className="hidden sm:flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CRM de Clientes</h1>
                <p className="text-gray-600 mt-1">Gestiona tu cartera de clientes con inteligencia artificial</p>
              </div>
              <div className="flex gap-3">
                <AIAssistant />
                <AddClientDialog />
              </div>
            </div>
            
            {/* Mobile Layout */}
            <div className="sm:hidden space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CRM de Clientes</h1>
                <p className="text-gray-600 mt-1 text-sm">Gestiona tu cartera de clientes con inteligencia artificial</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AIAssistant />
                <AddClientDialog />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estado de Convex */}
        <ConvexStatus />
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-1">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">Dashboard</TabsTrigger>
            <TabsTrigger value="clients" className="text-xs sm:text-sm">Clientes</TabsTrigger>
            <TabsTrigger value="automation" className="text-xs sm:text-sm">Automatización</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Estadísticas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.activos} activos, {stats.inactivos} inactivos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.activos}</div>
                  <p className="text-xs text-muted-foreground">
                    {((stats.activos / stats.total) * 100).toFixed(1)}% del total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Necesitan Atención</CardTitle>
                  <Calendar className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.sinInteraccion30Dias}</div>
                  <p className="text-xs text-muted-foreground">
                    Sin interacción en 30+ días
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Potenciales</CardTitle>
                  <Zap className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.potenciales}</div>
                  <p className="text-xs text-muted-foreground">
                    Oportunidades de desarrollo
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Resumen de IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Resumen de IA - Análisis de Cartera
                </CardTitle>
                <CardDescription>
                  Recomendaciones inteligentes para optimizar tu gestión de clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{portfolioSummary.totalClients}</div>
                      <div className="text-sm text-gray-600">Total Clientes</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{portfolioSummary.activeClients}</div>
                      <div className="text-sm text-gray-600">Activos</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{portfolioSummary.clientsNeedingAttention}</div>
                      <div className="text-sm text-gray-600">Necesitan Atención</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Recomendaciones:</h4>
                    <ul className="space-y-1">
                      {portfolioSummary.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            {/* Filtros y búsqueda */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar por nombre o teléfono..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Potencial">Potencial</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lastInteraction">Última interacción</SelectItem>
                      <SelectItem value="name">Nombre</SelectItem>
                      <SelectItem value="createdAt">Fecha de creación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de clientes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <ClientCard key={client._id} client={client} />
              ))}
            </div>

            {filteredClients.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron clientes</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || statusFilter !== "all" 
                      ? "Intenta ajustar los filtros de búsqueda"
                      : "Comienza agregando tu primer cliente"
                    }
                  </p>
                  <AddClientDialog />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <AutomationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
