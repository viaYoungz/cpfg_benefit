import { COMPANIES } from "./companies.js";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

// POST { id } → 200 { ok: true, company: { id, name } } | 404 { ok: false }.
// Standard Request → Response, so the same handler runs in the Vite dev server and on Vercel.
export async function handleVerifyCompany(request) {
  if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);

  let id = "";
  try {
    const body = await request.json();
    id = String(body?.id ?? "").trim().toUpperCase().slice(0, 64);
  } catch (_) {
    return json({ ok: false, error: "body" }, 400);
  }

  const company = id && COMPANIES[id];
  if (!company) {
    // Slow down guessing a little; real rate limiting belongs at the host (e.g. Vercel firewall rules).
    await new Promise((r) => setTimeout(r, 600));
    return json({ ok: false }, 404);
  }
  return json({ ok: true, company: { id, name: company.name } });
}
