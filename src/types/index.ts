// Tipos principales del sistema CRM

export type ClientStatus = "Activo" | "Inactivo" | "Potencial";

export type InteractionType = "llamada" | "email" | "reunion" | "otro";

export type Priority = "Alta" | "Media" | "Baja";

export interface Interaction {
  id: string;
  date: number;
  description: string;
  type: InteractionType;
}

export interface Client {
  _id: string;
  name: string;
  phone: string;
  status: ClientStatus;
  lastInteraction: number;
  interactions: Interaction[];
  createdAt: number;
  updatedAt: number;
}

export interface ClientFormData {
  name: string;
  phone: string;
  status: ClientStatus;
}

export interface InteractionFormData {
  description: string;
  type: InteractionType;
}

export interface DashboardStats {
  total: number;
  activos: number;
  inactivos: number;
  potenciales: number;
  sinInteraccion30Dias: number;
}

export interface AIAnalysis {
  analysis: string;
  priority: Priority;
  suggestion: string;
  daysSinceLastInteraction: number;
  totalInteractions: number;
}

export interface PortfolioSummary {
  totalClients: number;
  activeClients: number;
  inactiveClients: number;
  potentialClients: number;
  clientsNeedingAttention: number;
  recommendations: string[];
}

export interface ActivityReport {
  totalClients: number;
  activeLast7Days: number;
  activeLast30Days: number;
  inactiveOver30Days: number;
  inactiveOver60Days: number;
  statusBreakdown: {
    activos: number;
    inactivos: number;
    potenciales: number;
  };
  generatedAt: number;
}

export interface AutomationResult {
  message: string;
  updatedClients: number;
  threshold: number;
  processedAt: number;
}

export interface QstashJob {
  messageId: string;
  url: string;
  cron?: string;
  state?: string;
}

// Tipos para formularios
export interface ClientFormErrors {
  name?: string;
  phone?: string;
  status?: string;
}

export interface InteractionFormErrors {
  description?: string;
  type?: string;
}

// Tipos para filtros y búsqueda
export interface ClientFilters {
  searchTerm: string;
  statusFilter: string;
  sortBy: string;
}

// Tipos para la UI
export interface TabConfig {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface CardConfig {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  trend?: "up" | "down" | "stable";
  color: "blue" | "green" | "orange" | "red" | "yellow";
}

// Tipos para configuración
export interface AppConfig {
  convexUrl: string;
  qstashToken: string;
  automationThreshold: number;
  features: {
    aiEnabled: boolean;
    automationEnabled: boolean;
    realTimeEnabled: boolean;
  };
}

// Tipos para errores
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: number;
}

// Tipos para notificaciones
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
