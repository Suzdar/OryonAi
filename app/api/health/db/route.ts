import { NextResponse } from "next/server";
import { logError } from "@/lib/logging";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const startedAt = Date.now();
  try {
    const { data, error } = await supabase.from("users").select("id").limit(1);

    if (error) {
      await logError("Supabase health check error", { error: error.message });
      return NextResponse.json(
        { ok: false, durationMs: Date.now() - startedAt, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      durationMs: Date.now() - startedAt,
      rowsChecked: data?.length ?? 0,
    });
  } catch (err: any) {
    await logError("Supabase health check exception", { error: err?.message });
    return NextResponse.json(
      { ok: false, durationMs: Date.now() - startedAt, error: err.message },
      { status: 500 }
    );
  }
}
