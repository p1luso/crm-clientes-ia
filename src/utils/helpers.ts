import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CLIENT_STATUS, INTERACTION_TYPES, PRIORITY_LEVELS } from "./constants";
import type { ClientStatus, InteractionType, Priority } from "@/types";

// Utilidad para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formateo de fechas
export function formatDate(
  timestamp: number,
  format: "short" | "long" | "datetime" | "relative" = "short"
): string {
  const date = new Date(timestamp);
  const now = new Date();

  switch (format) {
    case "short":
      return date.toLocaleDateString("es-ES");
    case "long":
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "datetime":
      return date.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    case "relative":
      return formatRelativeDate(date, now);
    default:
      return date.toLocaleDateString("es-ES");
  }
}

function formatRelativeDate(date: Date, now: Date): string {
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Hoy";
  if (diffDays === 2) return "Ayer";
  if (diffDays <= 7) return `Hace ${diffDays} días`;
  if (diffDays <= 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays <= 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
  return `Hace ${Math.floor(diffDays / 365)} años`;
}

// Colores para estados
export function getStatusColor(status: ClientStatus): string {
  switch (status) {
    case CLIENT_STATUS.ACTIVO:
      return "bg-green-100 text-green-800 border-green-200";
    case CLIENT_STATUS.INACTIVO:
      return "bg-red-100 text-red-800 border-red-200";
    case CLIENT_STATUS.POTENCIAL:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

// Colores para prioridades
export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case PRIORITY_LEVELS.ALTA:
      return "bg-red-100 text-red-800";
    case PRIORITY_LEVELS.MEDIA:
      return "bg-yellow-100 text-yellow-800";
    case PRIORITY_LEVELS.BAJA:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Iconos para tipos de interacción
export function getInteractionIcon(type: InteractionType): string {
  switch (type) {
    case INTERACTION_TYPES.LLAMADA:
      return "📞";
    case INTERACTION_TYPES.EMAIL:
      return "📧";
    case INTERACTION_TYPES.REUNION:
      return "🤝";
    case INTERACTION_TYPES.OTRO:
      return "📝";
    default:
      return "📝";
  }
}

// Validación de formularios
export function validateClientForm(data: {
  name: string;
  phone: string;
  status: ClientStatus;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "El nombre es requerido";
  } else if (data.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  } else if (data.name.trim().length > 100) {
    errors.name = "El nombre no puede tener más de 100 caracteres";
  }

  if (!data.phone.trim()) {
    errors.phone = "El teléfono es requerido";
  } else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(data.phone)) {
    errors.phone = "El teléfono tiene un formato inválido";
  } else if (data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "El teléfono debe tener al menos 10 dígitos";
  }

  return errors;
}

export function validateInteractionForm(data: {
  description: string;
  type: InteractionType;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.description.trim()) {
    errors.description = "La descripción es requerida";
  } else if (data.description.trim().length < 5) {
    errors.description = "La descripción debe tener al menos 5 caracteres";
  } else if (data.description.trim().length > 500) {
    errors.description = "La descripción no puede tener más de 500 caracteres";
  }

  return errors;
}

// Utilidades de búsqueda y filtrado
export function filterClients(
  clients: any[],
  searchTerm: string,
  statusFilter: string
): any[] {
  return clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
}

export function sortClients(clients: any[], sortBy: string): any[] {
  return [...clients].sort((a, b) => {
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
}

// Utilidades de cálculo
export function calculateDaysSince(timestamp: number): number {
  return Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
}

export function isClientInactive(
  lastInteraction: number,
  thresholdDays: number = 30
): boolean {
  return calculateDaysSince(lastInteraction) > thresholdDays;
}

// Utilidades de texto
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Utilidades de arrays
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

// Utilidades de debounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Utilidades de storage
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail
  }
}
