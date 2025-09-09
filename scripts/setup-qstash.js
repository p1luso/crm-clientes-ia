const { Client } = require("@upstash/qstash");

// Configuración de Qstash
const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

async function setupRecurringJob() {
  try {
    console.log("🚀 Configurando job recurrente de Qstash...");

    // URL del endpoint (ajustar según tu dominio de Vercel)
    const endpointUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/qstash`
      : "http://localhost:3000/api/qstash";

    // Crear job recurrente que se ejecute cada día a las 9:00 AM
    const job = await qstash.publishJSON({
      url: endpointUrl,
      cron: "0 9 * * *", // Cada día a las 9:00 AM
      body: {
        action: "markInactiveClients",
        daysThreshold: 30,
      },
    });

    console.log("✅ Job recurrente creado exitosamente:");
    console.log(`   Job ID: ${job.messageId}`);
    console.log(`   URL: ${endpointUrl}`);
    console.log(`   Cron: 0 9 * * * (diario a las 9:00 AM)`);
    console.log(`   Descripción: Marcar clientes inactivos después de 30 días`);

    return job;
  } catch (error) {
    console.error("❌ Error configurando job recurrente:", error);
    throw error;
  }
}

async function testJob() {
  try {
    console.log("🧪 Probando job de Qstash...");

    const endpointUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/qstash`
      : "http://localhost:3000/api/qstash";

    // Ejecutar job inmediatamente para prueba
    const job = await qstash.publishJSON({
      url: endpointUrl,
      body: {
        action: "markInactiveClients",
        daysThreshold: 30,
      },
    });

    console.log("✅ Job de prueba ejecutado:");
    console.log(`   Job ID: ${job.messageId}`);
    console.log(`   URL: ${endpointUrl}`);

    return job;
  } catch (error) {
    console.error("❌ Error ejecutando job de prueba:", error);
    throw error;
  }
}

async function listJobs() {
  try {
    console.log("📋 Listando jobs de Qstash...");
    
    const jobs = await qstash.schedules.list();
    
    console.log(`✅ Encontrados ${jobs.length} jobs:`);
    jobs.forEach((job, index) => {
      console.log(`   ${index + 1}. ID: ${job.scheduleId}`);
      console.log(`      URL: ${job.destination}`);
      console.log(`      Cron: ${job.cron}`);
      console.log(`      Estado: ${job.state}`);
      console.log("");
    });

    return jobs;
  } catch (error) {
    console.error("❌ Error listando jobs:", error);
    throw error;
  }
}

// Función principal
async function main() {
  const command = process.argv[2];

  switch (command) {
    case "setup":
      await setupRecurringJob();
      break;
    case "test":
      await testJob();
      break;
    case "list":
      await listJobs();
      break;
    default:
      console.log("Uso: node scripts/setup-qstash.js [setup|test|list]");
      console.log("");
      console.log("Comandos disponibles:");
      console.log("  setup - Configurar job recurrente diario");
      console.log("  test  - Ejecutar job de prueba inmediatamente");
      console.log("  list  - Listar todos los jobs configurados");
      break;
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  setupRecurringJob,
  testJob,
  listJobs,
};
