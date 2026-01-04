import { supabase } from "./supabase";

export type LogLevel = "error" | "warn" | "info" | "debug";

async function logWithLevel(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  try {
    await supabase.from("logs").insert({ level, message, meta });
  } catch (err) {
    // Fallback to console if logging fails to avoid masking the original error path.
    console.error("Log insert failed", err, { level, message, meta });
  }
}

export async function logError(message: string, meta?: Record<string, unknown>) {
  await logWithLevel("error", message, meta);
}

export async function logWarn(message: string, meta?: Record<string, unknown>) {
  await logWithLevel("warn", message, meta);
}

export async function logInfo(message: string, meta?: Record<string, unknown>) {
  await logWithLevel("info", message, meta);
}

export async function logDebug(message: string, meta?: Record<string, unknown>) {
  await logWithLevel("debug", message, meta);
}
