// Constantes de la aplicación

export const APP_CONFIG = {
  name: "CRM de Clientes con IA",
  version: "1.0.0",
  description: "Sistema de gestión de clientes con inteligencia artificial",
  author: "Tu Nombre",
  repository: "https://github.com/tu-usuario/crm-clientes-ia",
} as const;

export const CLIENT_STATUS = {
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
  POTENCIAL: "Potencial",
} as const;

export const INTERACTION_TYPES = {
  LLAMADA: "llamada",
  EMAIL: "email",
  REUNION: "reunion",
  OTRO: "otro",
} as const;

export const PRIORITY_LEVELS = {
  ALTA: "Alta",
  MEDIA: "Media",
  BAJA: "Baja",
} as const;

export const SORT_OPTIONS = {
  LAST_INTERACTION: "lastInteraction",
  NAME: "name",
  CREATED_AT: "createdAt",
} as const;

export const FILTER_OPTIONS = {
  ALL: "all",
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
  POTENCIAL: "Potencial",
} as const;

export const AUTOMATION_CONFIG = {
  DEFAULT_THRESHOLD_DAYS: 30,
  MIN_THRESHOLD_DAYS: 1,
  MAX_THRESHOLD_DAYS: 365,
  CRON_SCHEDULE: "0 9 * * *", // Diario a las 9:00 AM
} as const;

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  ANIMATION_DURATION: 200,
  PAGINATION_SIZE: 10,
} as const;

export const API_ENDPOINTS = {
  QSTASH: "/api/qstash",
  HEALTH: "/api/health",
} as const;

export const ERROR_MESSAGES = {
  CLIENT_NOT_FOUND: "Cliente no encontrado",
  INVALID_DATA: "Datos inválidos",
  NETWORK_ERROR: "Error de conexión",
  UNAUTHORIZED: "No autorizado",
  SERVER_ERROR: "Error del servidor",
} as const;

export const SUCCESS_MESSAGES = {
  CLIENT_CREATED: "Cliente creado correctamente",
  CLIENT_UPDATED: "Cliente actualizado correctamente",
  CLIENT_DELETED: "Cliente eliminado correctamente",
  INTERACTION_ADDED: "Interacción agregada correctamente",
  AUTOMATION_EXECUTED: "Automatización ejecutada correctamente",
} as const;

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 20,
    PATTERN: /^[\+]?[0-9\s\-\(\)]+$/,
  },
  DESCRIPTION: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 500,
  },
} as const;

export const DATE_FORMATS = {
  SHORT: "dd/MM/yyyy",
  LONG: "dd 'de' MMMM 'de' yyyy",
  DATETIME: "dd/MM/yyyy HH:mm",
  RELATIVE: "relative",
} as const;

export const THEME_CONFIG = {
  COLORS: {
    primary: "blue",
    secondary: "gray",
    success: "green",
    warning: "yellow",
    error: "red",
  },
  SPACING: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
} as const;
