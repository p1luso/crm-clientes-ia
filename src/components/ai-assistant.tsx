"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  
  const portfolioSummary = useQuery(api.ai.generatePortfolioSummary);
  const activityReport = useQuery(api.automation.generateActivityReport);
  const markInactiveClients = useMutation(api.automation.markInactiveClients);

  const handleMarkInactiveClients = async () => {
    try {
      const result = await markInactiveClients({ daysThreshold: 30 });
      toast.success(result.message);
    } catch (error) {
      toast.error("Error al marcar clientes inactivos");
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "Alta": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "Media": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Baja": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Media": return "bg-yellow-100 text-yellow-800";
      case "Baja": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Brain className="h-4 w-4 mr-2" />
          Asistente IA
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Asistente de Inteligencia Artificial
          </DialogTitle>
          <DialogDescription>
            Análisis inteligente y recomendaciones para optimizar tu gestión de clientes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen de la cartera */}
          {portfolioSummary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Resumen de Cartera
                </CardTitle>
                <CardDescription>
                  Análisis general de tu cartera de clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{portfolioSummary.totalClients}</div>
                    <div className="text-sm text-blue-800">Total Clientes</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{portfolioSummary.activeClients}</div>
                    <div className="text-sm text-green-800">Activos</div>
                    <div className="text-xs text-green-700">Estado: Activo</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{portfolioSummary.inactiveClients}</div>
                    <div className="text-sm text-red-800">Inactivos</div>
                    <div className="text-xs text-red-700">Estado: Inactivo</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{portfolioSummary.potentialClients}</div>
                    <div className="text-sm text-yellow-800">Potenciales</div>
                    <div className="text-xs text-yellow-700">Estado: Potencial</div>
                  </div>
                </div>
                
                {portfolioSummary.clientsNeedingAttention > 0 && (
                  <div className="p-3 bg-orange-50 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xl font-bold text-orange-600">{portfolioSummary.clientsNeedingAttention}</div>
                      <span className="text-sm text-orange-800">Clientes Necesitan Atención</span>
                    </div>
                    <p className="text-xs text-orange-700">
                      Clientes sin interacción en los últimos 30 días (independiente de su estado)
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h4 className="font-medium">Recomendaciones Inteligentes:</h4>
                  <ul className="space-y-1">
                    {portfolioSummary.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reporte de actividad */}
          {activityReport && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Reporte de Actividad
                </CardTitle>
                <CardDescription>
                  Análisis detallado de la actividad de tus clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{activityReport.activeLast7Days}</div>
                    <div className="text-sm text-green-800">Con Actividad (7 días)</div>
                    <div className="text-xs text-green-700">Última interacción reciente</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{activityReport.activeLast30Days}</div>
                    <div className="text-sm text-blue-800">Con Actividad (30 días)</div>
                    <div className="text-xs text-blue-700">Última interacción este mes</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-xl font-bold text-red-600">{activityReport.inactiveOver30Days}</div>
                    <div className="text-sm text-red-800">Sin Actividad (30+ días)</div>
                    <div className="text-xs text-red-700">Requieren seguimiento</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Distribución por Estado Asignado:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">{activityReport.statusBreakdown.activos}</div>
                        <div className="text-xs text-green-800">Estado: Activo</div>
                      </div>
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="text-lg font-bold text-red-600">{activityReport.statusBreakdown.inactivos}</div>
                        <div className="text-xs text-red-800">Estado: Inactivo</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="text-lg font-bold text-yellow-600">{activityReport.statusBreakdown.potenciales}</div>
                        <div className="text-xs text-yellow-800">Estado: Potencial</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      Los estados se asignan manualmente o mediante automatización IA
                    </p>
                  </div>

                  {activityReport.inactiveOver30Days > 0 && (
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-800">Atención Requerida</span>
                      </div>
                      <p className="text-sm text-orange-700 mb-2">
                        Tienes <strong>{activityReport.inactiveOver30Days} clientes</strong> sin actividad en más de 30 días.
                      </p>
                      <p className="text-xs text-orange-600">
                        Estos clientes pueden estar en cualquier estado (Activo, Inactivo, Potencial) pero requieren seguimiento inmediato.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Acciones automatizadas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Acciones Automatizadas
              </CardTitle>
              <CardDescription>
                Herramientas para automatizar la gestión de clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Marcar Clientes Inactivos</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Automáticamente marca como &quot;Inactivo&quot; a los clientes que no han tenido interacciones en los últimos 30 días.
                </p>
                <Button 
                  onClick={handleMarkInactiveClients}
                  variant="outline"
                  className="w-full"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Ejecutar Automatización
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Análisis Predictivo</h4>
                <p className="text-sm text-gray-600 mb-3">
                  La IA analiza patrones de comportamiento para identificar clientes en riesgo de pérdida.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon("Alta")}
                    <span className="text-sm">Clientes con alta probabilidad de pérdida</span>
                    <Badge className={getPriorityColor("Alta")}>Alta Prioridad</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon("Media")}
                    <span className="text-sm">Clientes que requieren seguimiento</span>
                    <Badge className={getPriorityColor("Media")}>Media Prioridad</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon("Baja")}
                    <span className="text-sm">Clientes con buena salud</span>
                    <Badge className={getPriorityColor("Baja")}>Baja Prioridad</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consejos de IA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Consejos de IA
              </CardTitle>
              <CardDescription>
                Recomendaciones personalizadas basadas en tus datos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">💡 Optimización de Contactos</h4>
                  <p className="text-sm text-blue-700">
                    Programa contactos regulares cada 2-3 semanas para clientes activos y cada semana para potenciales.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">📈 Crecimiento de Cartera</h4>
                  <p className="text-sm text-green-700">
                    Enfócate en convertir clientes potenciales en activos mediante seguimiento personalizado.
                  </p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-1">⚠️ Prevención de Pérdidas</h4>
                  <p className="text-sm text-orange-700">
                    Contacta inmediatamente a clientes que han estado inactivos por más de 30 días.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

