# CRM de Clientes con IA

Un sistema completo de gestión de clientes (CRM) con inteligencia artificial, desarrollado con Next.js, Convex, y Qstash.

## 🚀 Características

- **Gestión de Clientes**: CRUD completo con campos personalizados
- **Dashboard en Tiempo Real**: Actualizaciones instantáneas con Convex
- **Asistente IA**: Análisis inteligente y categorización automática
- **Automatización**: Jobs programados con Qstash para gestión automática
- **UI Moderna**: Interfaz elegante con ShadcnUI y Tailwind CSS

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: ShadcnUI, Tailwind CSS, Lucide Icons
- **Base de Datos**: Convex (tiempo real)
- **Automatización**: Qstash
- **Deploy**: Vercel
- **Gestor de Paquetes**: pnpm

## 📋 Funcionalidades

### 1. Gestión de Clientes
- ✅ Alta, edición y eliminación de clientes
- ✅ Campos: Nombre, teléfono, estado de relación, última interacción
- ✅ Estados: Activo, Inactivo, Potencial

### 2. Dashboard en Tiempo Real
- ✅ Listado de clientes con filtros y ordenamiento
- ✅ Estadísticas en tiempo real
- ✅ Actualizaciones automáticas cuando otros usuarios modifican datos

### 3. Vista de Cliente
- ✅ Información detallada del cliente
- ✅ Historial de interacciones
- ✅ Acciones rápidas (cambiar estado, agregar interacción)

### 4. Asistente IA
- ✅ Análisis de cliente individual
- ✅ Categorización automática
- ✅ Recomendaciones inteligentes
- ✅ Resumen de cartera

### 5. Automatización con Qstash
- ✅ Job recurrente para marcar clientes inactivos
- ✅ Panel de configuración
- ✅ Ejecución manual y programada

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- pnpm
- Cuenta de Convex
- Cuenta de Qstash (Upstash)

### 1. Clonar y instalar dependencias
```bash
git clone <repository-url>
cd crm-clientes-ia
pnpm install
```

### 2. Configurar Convex
```bash
npx convex dev --configure
```

### 3. Configurar variables de entorno
Copia `env.example` a `.env.local` y configura:

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

### 4. Ejecutar en desarrollo
```bash
pnpm dev
```

## 🔧 Configuración de Qstash

### 1. Crear cuenta en Upstash
- Ve a [upstash.com](https://upstash.com)
- Crea una cuenta y obtén tu token de Qstash

### 2. Configurar job recurrente
```bash
# Configurar automatización diaria
node scripts/setup-qstash.js setup

# Probar la automatización
node scripts/setup-qstash.js test

# Listar jobs configurados
node scripts/setup-qstash.js list
```

## 📱 Uso

### Dashboard Principal
- **Dashboard**: Estadísticas generales y resumen de IA
- **Clientes**: Lista de clientes con filtros y búsqueda
- **Automatización**: Panel de configuración de jobs automáticos

### Gestión de Clientes
1. **Agregar Cliente**: Botón "Nuevo Cliente" en el header
2. **Editar**: Click en el menú de opciones de cada cliente
3. **Ver Detalles**: Click en "Ver detalles" para información completa
4. **Agregar Interacción**: Registrar llamadas, emails, reuniones, etc.

### Asistente IA
1. **Analizar Cliente**: Análisis individual con recomendaciones
2. **Categorizar**: Asignación automática de estado basada en actividad
3. **Resumen de Cartera**: Análisis general con recomendaciones

### Automatización
1. **Configurar**: Habilitar automatización y definir umbrales
2. **Ejecutar**: Probar la automatización manualmente
3. **Programar**: Configurar ejecución automática diaria

## 🚀 Deploy en Vercel

### 1. Conectar repositorio
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login y deploy
vercel login
vercel
```

### 2. Configurar variables de entorno en Vercel
- Ve al dashboard de Vercel
- Selecciona tu proyecto
- Ve a Settings > Environment Variables
- Agrega todas las variables de `env.example`

### 3. Configurar Qstash para producción
```bash
# Actualizar URL en el script
export VERCEL_URL=tu-dominio.vercel.app
node scripts/setup-qstash.js setup
```

## 🧪 Testing

### Datos de prueba
El sistema incluye funciones para generar datos de prueba:

```typescript
// En el dashboard, puedes agregar clientes de prueba
// El sistema simulará interacciones automáticamente
```

### Pruebas de automatización
```bash
# Ejecutar automatización de prueba
node scripts/setup-qstash.js test

# Verificar en el dashboard que los clientes se marcaron como inactivos
```

## 📊 Monitoreo

### Convex Dashboard
- Ve a [convex.dev](https://convex.dev)
- Monitorea queries, mutations y datos en tiempo real

### Qstash Dashboard
- Ve a [console.upstash.com](https://console.upstash.com)
- Monitorea jobs programados y ejecuciones

## 🔒 Seguridad

- Autenticación con Convex
- Validación de requests de Qstash
- Variables de entorno seguras
- HTTPS obligatorio en producción

## 📈 Escalabilidad

- Convex maneja automáticamente la escalabilidad
- Qstash gestiona jobs de forma distribuida
- Vercel proporciona CDN global
- Optimizaciones de React 19

## 🐛 Troubleshooting

### Problemas comunes

1. **Convex no conecta**
   - Verificar `NEXT_PUBLIC_CONVEX_URL` en `.env.local`
   - Ejecutar `npx convex dev` para sincronizar

2. **Qstash no ejecuta**
   - Verificar `QSTASH_TOKEN` en variables de entorno
   - Comprobar que la URL del endpoint sea accesible

3. **UI no carga**
   - Verificar que todas las dependencias estén instaladas
   - Ejecutar `pnpm install` nuevamente

## 📝 Licencia

Este proyecto es parte de una prueba técnica y está disponible bajo licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, contacta al desarrollador.

---

**Desarrollado con ❤️ usando Next.js, Convex, y Qstash**