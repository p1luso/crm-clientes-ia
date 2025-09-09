# 🚀 Guía de Deploy - CRM de Clientes con IA

Esta guía te llevará paso a paso para desplegar tu CRM en producción usando Vercel, Convex y Qstash.

## 📋 Prerrequisitos

- ✅ Cuenta de Vercel
- ✅ Cuenta de Convex
- ✅ Cuenta de Upstash (para Qstash)
- ✅ Node.js 18+ instalado
- ✅ pnpm instalado
- ✅ Git configurado

## 🔧 Paso 1: Preparar el Proyecto

### 1.1 Clonar y configurar
```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd crm-clientes-ia

# Instalar dependencias
pnpm install
```

### 1.2 Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env.local

# Editar con tus valores
nano .env.local
```

Configura las siguientes variables:
```env
NEXT_PUBLIC_CONVEX_URL=https://tu-deployment.convex.cloud
CONVEX_DEPLOYMENT=tu-deployment-name
QSTASH_TOKEN=tu-token-de-qstash
VERCEL_URL=tu-dominio.vercel.app
```

## 🗄️ Paso 2: Configurar Convex

### 2.1 Crear proyecto en Convex
```bash
# Login en Convex
npx convex login

# Configurar proyecto
npx convex dev --configure
```

### 2.2 Desplegar funciones
```bash
# Desplegar a producción
pnpm convex:deploy
```

### 2.3 Verificar deployment
- Ve a [convex.dev](https://convex.dev)
- Verifica que tu proyecto esté listado
- Confirma que las funciones estén desplegadas

## ⚡ Paso 3: Configurar Qstash

### 3.1 Crear cuenta en Upstash
- Ve a [upstash.com](https://upstash.com)
- Crea una cuenta gratuita
- Obtén tu token de Qstash

### 3.2 Configurar automatización
```bash
# Configurar job recurrente
pnpm qstash:setup

# Probar la automatización
pnpm qstash:test

# Listar jobs configurados
pnpm qstash:list
```

## 🌐 Paso 4: Deploy en Vercel

### 4.1 Instalar Vercel CLI
```bash
npm install -g vercel
```

### 4.2 Login en Vercel
```bash
vercel login
```

### 4.3 Deploy automático
```bash
# Usar el script de deploy
pnpm deploy
```

### 4.4 Deploy manual (alternativo)
```bash
# Deploy directo
vercel --prod
```

## 🔐 Paso 5: Configurar Variables de Entorno en Vercel

### 5.1 Acceder al dashboard
- Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
- Selecciona tu proyecto

### 5.2 Configurar variables
Ve a **Settings > Environment Variables** y agrega:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | `https://tu-deployment.convex.cloud` | URL de tu deployment de Convex |
| `CONVEX_DEPLOYMENT` | `tu-deployment-name` | Nombre del deployment de Convex |
| `QSTASH_TOKEN` | `tu-token-de-qstash` | Token de autenticación de Qstash |
| `QSTASH_CURRENT_SIGNING_KEY` | `tu-signing-key` | Clave de firma actual de Qstash |
| `QSTASH_NEXT_SIGNING_KEY` | `tu-next-signing-key` | Clave de firma siguiente de Qstash |

### 5.3 Redeploy
Después de configurar las variables:
```bash
vercel --prod
```

## 🧪 Paso 6: Verificar el Deploy

### 6.1 Verificar aplicación
- Abre tu dominio de Vercel
- Verifica que la aplicación cargue correctamente
- Prueba crear un cliente

### 6.2 Verificar Convex
- Ve al dashboard de Convex
- Verifica que los datos se estén guardando
- Prueba las funciones en tiempo real

### 6.3 Verificar Qstash
- Ve al dashboard de Upstash
- Verifica que el job esté programado
- Ejecuta una prueba manual

## 🔄 Paso 7: Configurar Automatización en Producción

### 7.1 Actualizar URL de Qstash
```bash
# Actualizar la URL en el script
export VERCEL_URL=tu-dominio.vercel.app
pnpm qstash:setup
```

### 7.2 Verificar job programado
```bash
pnpm qstash:list
```

## 📊 Paso 8: Monitoreo y Mantenimiento

### 8.1 Dashboards importantes
- **Vercel**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Convex**: [convex.dev](https://convex.dev)
- **Qstash**: [console.upstash.com](https://console.upstash.com)

### 8.2 Logs y debugging
```bash
# Ver logs de Vercel
vercel logs

# Ver logs de Convex
npx convex logs
```

## 🚨 Troubleshooting

### Problema: Convex no conecta
**Solución:**
1. Verifica `NEXT_PUBLIC_CONVEX_URL` en Vercel
2. Confirma que el deployment de Convex esté activo
3. Verifica la configuración de CORS en Convex

### Problema: Qstash no ejecuta
**Solución:**
1. Verifica `QSTASH_TOKEN` en variables de entorno
2. Confirma que la URL del endpoint sea accesible
3. Verifica la configuración del job en Upstash

### Problema: Build falla en Vercel
**Solución:**
1. Verifica que todas las dependencias estén en `package.json`
2. Confirma que no haya errores de TypeScript
3. Revisa los logs de build en Vercel

### Problema: Variables de entorno no se cargan
**Solución:**
1. Verifica que las variables estén configuradas en Vercel
2. Confirma que los nombres coincidan exactamente
3. Redeploy después de cambiar variables

## 📈 Optimizaciones Post-Deploy

### 1. Configurar dominio personalizado
- Ve a Vercel > Settings > Domains
- Agrega tu dominio personalizado
- Configura DNS según las instrucciones

### 2. Configurar SSL
- Vercel maneja SSL automáticamente
- Para dominios personalizados, sigue las instrucciones de Vercel

### 3. Configurar CDN
- Vercel incluye CDN global automáticamente
- No se requiere configuración adicional

### 4. Configurar backups
- Convex maneja backups automáticamente
- Para datos críticos, considera exportar periódicamente

## 🎉 ¡Deploy Completado!

Tu CRM de Clientes con IA está ahora desplegado en producción con:

- ✅ **Frontend**: Desplegado en Vercel con CDN global
- ✅ **Backend**: Convex funcionando en tiempo real
- ✅ **Automatización**: Qstash ejecutándose periódicamente
- ✅ **Monitoreo**: Dashboards disponibles para supervisión

### Próximos pasos recomendados:
1. Configurar dominio personalizado
2. Implementar autenticación de usuarios
3. Configurar notificaciones por email
4. Agregar más funcionalidades de IA
5. Implementar analytics avanzados

---

**¡Felicidades! Tu CRM está listo para usar en producción.** 🚀
