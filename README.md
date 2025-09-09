# 🚀 CRM de Clientes con IA

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)
![Convex](https://img.shields.io/badge/Convex-1.26.2-green?style=for-the-badge&logo=convex)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)

**Sistema de gestión de clientes con inteligencia artificial, desarrollado con tecnologías modernas**

[![Live Demo](https://img.shields.io/badge/Live_Demo-🚀-green?style=for-the-badge)](https://crm-clientes-ia.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/tu-usuario/crm-clientes-ia)

</div>

## 📋 Tabla de Contenidos

- [🎯 Características](#-características)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🚀 Instalación](#-instalación)
- [📱 Uso](#-uso)
- [🤖 Funcionalidades de IA](#-funcionalidades-de-ia)
- [⚡ Automatización](#-automatización)
- [📊 Dashboard](#-dashboard)
- [🔧 Configuración](#-configuración)
- [🚀 Deploy](#-deploy)
- [📸 Capturas de Pantalla](#-capturas-de-pantalla)
- [🤝 Contribuciones](#-contribuciones)
- [📄 Licencia](#-licencia)

## 🎯 Características

### ✨ **Gestión Completa de Clientes**
- **CRUD completo**: Crear, leer, actualizar y eliminar clientes
- **Campos personalizados**: Nombre, teléfono, estado de relación, última interacción
- **Estados dinámicos**: Activo, Inactivo, Potencial
- **Historial de interacciones**: Registro detallado de todas las comunicaciones

### 🔄 **Tiempo Real**
- **Actualizaciones instantáneas** con Convex
- **Sincronización automática** entre usuarios
- **Notificaciones en vivo** de cambios
- **Dashboard reactivo** que se actualiza automáticamente

### 🤖 **Inteligencia Artificial**
- **Análisis inteligente** de cada cliente
- **Categorización automática** basada en comportamiento
- **Recomendaciones personalizadas** para cada cliente
- **Resumen de cartera** con insights de IA

### ⚡ **Automatización Avanzada**
- **Jobs programados** con Qstash
- **Marcación automática** de clientes inactivos
- **Alertas inteligentes** para seguimiento
- **Reportes automáticos** de actividad

### 🎨 **UI/UX Moderna**
- **Diseño responsivo** con ShadcnUI
- **Interfaz intuitiva** y fácil de usar
- **Filtros avanzados** y búsqueda
- **Temas y personalización**

## 🛠️ Stack Tecnológico

### **Frontend**
- **Next.js 15.5.2** - Framework React con App Router
- **React 19.1.0** - Biblioteca de UI
- **TypeScript 5.9.2** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **ShadcnUI** - Componentes de UI

### **Backend**
- **Convex 1.26.2** - Base de datos en tiempo real
- **Qstash** - Automatización y jobs programados
- **Vercel** - Plataforma de deploy

### **Herramientas**
- **pnpm** - Gestor de paquetes
- **ESLint** - Linter de código
- **Lucide React** - Iconos
- **Sonner** - Notificaciones

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- pnpm
- Cuenta de Convex
- Cuenta de Upstash (para Qstash)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/crm-clientes-ia.git
cd crm-clientes-ia
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno
```bash
cp env.example .env.local
```

Edita `.env.local` con tus valores:
```env
NEXT_PUBLIC_CONVEX_URL=tu_url_de_convex
CONVEX_DEPLOYMENT=tu_deployment_name
QSTASH_TOKEN=tu_token_de_qstash
VERCEL_URL=tu_url_de_vercel
```

### 4. Configurar Convex
```bash
npx convex dev --configure
```

### 5. Ejecutar en desarrollo
```bash
pnpm dev
```

## 📱 Uso

### **Dashboard Principal**
- **Vista general** de todos los clientes
- **Estadísticas en tiempo real** de la cartera
- **Filtros avanzados** por estado y fecha
- **Búsqueda rápida** por nombre o teléfono

### **Gestión de Clientes**
1. **Agregar cliente**: Botón "Nuevo Cliente" en el header
2. **Editar información**: Click en el menú de opciones
3. **Ver detalles**: Vista completa con historial
4. **Agregar interacción**: Registrar llamadas, emails, reuniones

### **Asistente IA**
1. **Analizar cliente**: Análisis individual con recomendaciones
2. **Categorizar automáticamente**: IA asigna el estado óptimo
3. **Resumen de cartera**: Insights generales de la cartera

### **Automatización**
1. **Configurar jobs**: Panel de automatización
2. **Ejecutar manualmente**: Pruebas de automatización
3. **Monitorear**: Dashboard de jobs programados

## 🤖 Funcionalidades de IA

### **Análisis Individual**
- **Priorización inteligente** de clientes
- **Detección de riesgo** de pérdida
- **Recomendaciones personalizadas** de seguimiento
- **Análisis de patrones** de comportamiento

### **Categorización Automática**
- **Algoritmo inteligente** basado en interacciones
- **Asignación automática** de estados
- **Justificación** de cada decisión
- **Aprendizaje continuo** de patrones

### **Resumen de Cartera**
- **Métricas clave** de rendimiento
- **Tendencias** de actividad
- **Oportunidades** de crecimiento
- **Alertas** de clientes en riesgo

## ⚡ Automatización

### **Jobs Programados**
- **Marcación automática** de clientes inactivos
- **Generación de reportes** periódicos
- **Envío de alertas** por email
- **Limpieza de datos** antiguos

### **Configuración Flexible**
- **Umbrales personalizables** de inactividad
- **Frecuencia ajustable** de ejecución
- **Filtros específicos** por segmento
- **Notificaciones configurables**

## 📊 Dashboard

### **Métricas Principales**
- **Total de clientes** en la cartera
- **Clientes activos** vs inactivos
- **Interacciones recientes** (7 y 30 días)
- **Clientes que necesitan atención**

### **Visualizaciones**
- **Gráficos de tendencias** de actividad
- **Distribución por estados** de relación
- **Mapa de calor** de interacciones
- **Timeline** de actividades recientes

### **Filtros y Búsqueda**
- **Por estado** de relación
- **Por fecha** de última interacción
- **Por tipo** de interacción
- **Búsqueda de texto** libre

## 🔧 Configuración

### **Variables de Entorno**
```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://tu-proyecto.convex.cloud
CONVEX_DEPLOYMENT=tu-proyecto

# Qstash
QSTASH_TOKEN=tu_token_de_qstash
QSTASH_CURRENT_SIGNING_KEY=tu_signing_key
QSTASH_NEXT_SIGNING_KEY=tu_next_signing_key

# Vercel
VERCEL_URL=tu-dominio.vercel.app
```

### **Configuración de Convex**
```bash
# Login
npx convex login

# Configurar proyecto
npx convex dev --configure

# Deploy a producción
npx convex deploy
```

### **Configuración de Qstash**
```bash
# Configurar automatización
pnpm qstash:setup

# Probar automatización
pnpm qstash:test

# Listar jobs
pnpm qstash:list
```

## 🚀 Deploy

### **Deploy Automático con Vercel**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### **Deploy Manual**
1. **Conectar repositorio** en Vercel
2. **Configurar variables** de entorno
3. **Configurar build** settings
4. **Deploy automático** desde GitHub

### **Scripts Disponibles**
```bash
# Desarrollo
pnpm dev

# Build
pnpm build

# Producción
pnpm start

# Convex
pnpm convex:dev
pnpm convex:deploy

# Qstash
pnpm qstash:setup
pnpm qstash:test
pnpm qstash:list

# Deploy completo
pnpm deploy
```

## 📸 Capturas de Pantalla

### **Dashboard Principal**
![Dashboard](https://via.placeholder.com/800x400/1f2937/ffffff?text=Dashboard+Principal)

### **Lista de Clientes**
![Clientes](https://via.placeholder.com/800x400/1f2937/ffffff?text=Lista+de+Clientes)

### **Vista de Cliente**
![Cliente](https://via.placeholder.com/800x400/1f2937/ffffff?text=Vista+de+Cliente)

### **Asistente IA**
![IA](https://via.placeholder.com/800x400/1f2937/ffffff?text=Asistente+IA)

## 🏗️ Arquitectura

```
crm-clientes-ia/
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── api/            # API Routes
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página principal
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes ShadcnUI
│   │   ├── dashboard.tsx  # Dashboard principal
│   │   ├── client-card.tsx # Tarjeta de cliente
│   │   └── ...
│   └── lib/               # Utilidades
│       └── convex.tsx     # Configuración Convex
├── convex/                # Backend Convex
│   ├── schema.ts          # Esquema de base de datos
│   ├── clients.ts         # Funciones de clientes
│   ├── ai.ts             # Funciones de IA
│   └── automation.ts     # Funciones de automatización
├── scripts/              # Scripts de deploy
│   ├── setup-qstash.js   # Configuración Qstash
│   ├── deploy.sh         # Script de deploy
│   └── deploy-convex.js  # Deploy Convex
└── docs/                 # Documentación
    ├── README.md         # Este archivo
    └── DEPLOY.md         # Guía de deploy
```

## 🔒 Seguridad

- **Autenticación** con Convex
- **Validación** de requests de Qstash
- **Variables de entorno** seguras
- **HTTPS** obligatorio en producción
- **CORS** configurado correctamente

## 📈 Escalabilidad

- **Convex** maneja escalabilidad automáticamente
- **Qstash** distribuye jobs de forma eficiente
- **Vercel** proporciona CDN global
- **Optimizaciones** de React 19 y Next.js 15

## 🐛 Troubleshooting

### **Problemas Comunes**

1. **Convex no conecta**
   - Verificar `NEXT_PUBLIC_CONVEX_URL`
   - Ejecutar `npx convex dev`

2. **Qstash no ejecuta**
   - Verificar `QSTASH_TOKEN`
   - Comprobar URL del endpoint

3. **Build falla**
   - Verificar dependencias
   - Revisar errores de TypeScript

4. **Variables no cargan**
   - Verificar nombres exactos
   - Redeploy después de cambios

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Convex](https://convex.dev/) - Base de datos en tiempo real
- [ShadcnUI](https://ui.shadcn.com/) - Componentes de UI
- [Qstash](https://upstash.com/) - Automatización
- [Vercel](https://vercel.com/) - Plataforma de deploy

---

<div align="center">

**⭐ Si te gusta este proyecto, ¡dale una estrella! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/tu-usuario/crm-clientes-ia?style=social)](https://github.com/tu-usuario/crm-clientes-ia)
[![GitHub forks](https://img.shields.io/github/forks/tu-usuario/crm-clientes-ia?style=social)](https://github.com/tu-usuario/crm-clientes-ia)

**Desarrollado con ❤️ usando Next.js, Convex, y Qstash**

</div>