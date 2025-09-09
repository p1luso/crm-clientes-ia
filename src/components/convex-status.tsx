"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function ConvexStatus() {
  const stats = useQuery(api.clients.getDashboardStats);

  if (stats === undefined) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-blue-800">Conectando con Convex...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-green-800">Convex conectado correctamente</span>
      </div>
      <div className="text-sm text-green-700 mt-1">
        Total clientes: {stats.total}
      </div>
    </div>
  );
}
