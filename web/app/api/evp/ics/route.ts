import { NextResponse } from "next/server";

function toUTC(d: number | string | Date) {
  const dt = new Date(d);
  return dt.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/, "Z");
}
function esc(s: string) {
  return s.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

export async function GET() {
  const recent = (globalThis as any).__evp_recent || [];
  const lines: string[] = [];
  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//NovaPrime//EVP//EN");
  lines.push("CALSCALE:GREGORIAN");
  for (const ev of recent) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${ev.id}@novaprimeai`);
    lines.push(`DTSTAMP:${toUTC(ev.timestamp)}`);
    lines.push(`DTSTART:${toUTC(ev.timestamp)}`);
    lines.push(`SUMMARY:${esc(`[${ev.userSlug}] ${ev.title}`)}`);
    if (ev.description) lines.push(`DESCRIPTION:${esc(ev.description)}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type":"text/calendar; charset=utf-8", "Cache-Control":"no-store" }
  });
}