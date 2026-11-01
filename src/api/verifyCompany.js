// Asks the server whether a Company ID is valid. The list itself never reaches the browser.
// Returns { id, name } for a known ID, null for an unknown one; throws if the server can't be reached.
export async function verifyCompany(id) {
  const res = await fetch("/api/verify-company", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (res.status === 404) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(`verify-company ${res.status}`);
  return data.company;
}
