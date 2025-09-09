import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    // Verificar que la request viene de Qstash
    const signature = request.headers.get("upstash-signature");
    if (!signature) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ejecutar la automatización de clientes inactivos
    const result = await convex.mutation(api.automation.markInactiveClients, {
      daysThreshold: 30, // Marcar como inactivos después de 30 días
    });

    console.log("Qstash automation executed:", result);

    return NextResponse.json({
      success: true,
      message: "Automation executed successfully",
      result,
    });
  } catch (error) {
    console.error("Error executing Qstash automation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Endpoint para configurar el job recurrente
export async function GET() {
  return NextResponse.json({
    message: "Qstash automation endpoint is ready",
    instructions: "Use POST to trigger the automation",
  });
}
