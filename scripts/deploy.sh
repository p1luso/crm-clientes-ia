#!/bin/bash

# Script de deploy para CRM de Clientes con IA
echo "🚀 Iniciando proceso de deploy..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

# Verificar que pnpm esté instalado
if ! command -v pnpm &> /dev/null; then
    echo "❌ Error: pnpm no está instalado. Instálalo con: npm install -g pnpm"
    exit 1
fi

# Verificar que Vercel CLI esté instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

echo "🔧 Verificando configuración..."

# Verificar variables de entorno
if [ ! -f ".env.local" ]; then
    echo "⚠️  Advertencia: No se encontró .env.local"
    echo "   Asegúrate de configurar las variables de entorno antes del deploy"
    echo "   Copia env.example a .env.local y configura los valores"
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
pnpm install

# Verificar que Convex esté configurado
echo "🔍 Verificando configuración de Convex..."
if ! npx convex dev --help &> /dev/null; then
    echo "❌ Error: Convex no está configurado correctamente"
    echo "   Ejecuta: npx convex dev --configure"
    exit 1
fi

# Build del proyecto
echo "🏗️  Construyendo proyecto..."
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ Error: El build falló"
    exit 1
fi

echo "✅ Build completado exitosamente"

# Deploy a Vercel
echo "🚀 Desplegando a Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deploy completado exitosamente!"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Configura las variables de entorno en el dashboard de Vercel"
    echo "2. Ejecuta el script de configuración de Qstash:"
    echo "   node scripts/setup-qstash.js setup"
    echo "3. Prueba la aplicación en tu dominio de Vercel"
    echo ""
    echo "🔗 Recursos útiles:"
    echo "- Dashboard de Vercel: https://vercel.com/dashboard"
    echo "- Dashboard de Convex: https://convex.dev"
    echo "- Dashboard de Qstash: https://console.upstash.com"
else
    echo "❌ Error: El deploy falló"
    exit 1
fi
