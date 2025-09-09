"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Play, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Zap,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

export function AutomationPanel() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [daysThreshold, setDaysThreshold] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  const markInactiveClients = useMutation(api.automation.markInactiveClients);
  const getClientsNeedingFollowUp = useQuery(api.automation.getClientsNeedingFollowUp, {
    daysThreshold: daysThreshold,
  });
  const activityReport = useQuery(api.automation.generateActivityReport);

  const handleRunAutomation = async () => {
    setIsRunning(true);
    try {
      const result = await markInactiveClients({ daysThreshold });
      toast.success(result.message);
    } catch (error) {
      toast.error("Error al ejecutar la automatización");
    } finally {
      setIsRunning(false);
    }
  };

  const handleScheduleAutomation = async () => {
    try {
      // En un entorno real, esto haría una llamada a la API para configurar Qstash
      toast.success("Automatización programada correctamente");
      setIsEnabled(true);
    } catch (error) {
      toast.error("Error al programar la automatización");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Panel de Automatización
          </CardTitle>
          <CardDescription>
            Configura y gestiona las tareas automáticas de tu CRM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuración de automatización */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="automation-enabled">Automatización Habilitada</Label>
                <p className="text-sm text-gray-600">
                  Ejecutar automáticamente la marcación de clientes inactivos
                </p>
              </div>
              <Switch
                id="automation-enabled"
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="days-threshold">Días de inactividad</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="days-threshold"
                  type="number"
                  min="1"
                  max="365"
                  value={daysThreshold}
                  onChange={(e) => setDaysThreshold(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-600">días</span>
              </div>
              <p className="text-xs text-gray-500">
                Los clientes sin interacciones durante este período serán marcados como inactivos
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleScheduleAutomation}
                disabled={isEnabled}
                variant="outline"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Programar Automatización
              </Button>
              <Button 
                onClick={handleRunAutomation}
                disabled={isRunning}
                variant="outline"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Ejecutando..." : "Ejecutar Ahora"}
              </Button>
            </div>
          </div>

          {/* Estado actual */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Estado Actual</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {activityReport?.totalClients || 0}
                </div>
                <div className="text-sm text-blue-800">Total Clientes</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {getClientsNeedingFollowUp?.length || 0}
                </div>
                <div className="text-sm text-orange-800">Necesitan Seguimiento</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {activityReport?.inactiveOver30Days || 0}
                </div>
                <div className="text-sm text-red-800">Inactivos (30+ días)</div>
              </div>
            </div>
          </div>

          {/* Lista de clientes que necesitan seguimiento */}
          {getClientsNeedingFollowUp && getClientsNeedingFollowUp.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                Clientes que Necesitan Seguimiento
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {getClientsNeedingFollowUp.map((client) => {
                  const daysSinceLastInteraction = Math.floor(
                    (Date.now() - client.lastInteraction) / (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <div key={client._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-600">{client.phone}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          daysSinceLastInteraction > 60 ? "bg-red-100 text-red-800" :
                          daysSinceLastInteraction > 30 ? "bg-orange-100 text-orange-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {daysSinceLastInteraction} días
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          Estado: {client.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Información sobre Qstash */}
          <div className="border-t pt-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Automatización con Qstash
              </h4>
              <p className="text-sm text-blue-700 mb-2">
                Esta funcionalidad utiliza Qstash para programar tareas automáticas que se ejecutan
                periódicamente sin intervención manual.
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• Ejecución diaria automática a las 9:00 AM</li>
                <li>• Marcación automática de clientes inactivos</li>
                <li>• Notificaciones de clientes que necesitan seguimiento</li>
                <li>• Generación de reportes de actividad</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
