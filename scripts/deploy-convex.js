const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Desplegando funciones de Convex a producción...');

try {
  // Verificar que estamos en el directorio correcto
  if (!fs.existsSync('convex')) {
    throw new Error('No se encontró el directorio convex. Ejecuta este script desde la raíz del proyecto.');
  }

  // Verificar que Convex esté configurado
  try {
    execSync('npx convex --version', { stdio: 'pipe' });
  } catch (error) {
    throw new Error('Convex CLI no está disponible. Instálalo con: npm install -g convex');
  }

  // Verificar variables de entorno
  const envFile = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envFile)) {
    console.log('⚠️  Advertencia: No se encontró .env.local');
    console.log('   Asegúrate de configurar las variables de entorno antes del deploy');
  }

  // Deploy de Convex
  console.log('📦 Desplegando funciones de Convex...');
  execSync('npx convex deploy --prod', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });

  console.log('✅ Deploy de Convex completado exitosamente!');
  console.log('');
  console.log('📋 Próximos pasos:');
  console.log('1. Verifica que las funciones estén desplegadas en el dashboard de Convex');
  console.log('2. Configura las variables de entorno en Vercel');
  console.log('3. Despliega la aplicación frontend');
  console.log('');
  console.log('🔗 Dashboard de Convex: https://convex.dev');

} catch (error) {
  console.error('❌ Error durante el deploy de Convex:', error.message);
  process.exit(1);
}
