// Vercel serverless function: POST /api/verify-company
import { handleVerifyCompany } from "../server/verifyCompany.js";

export function POST(request) {
  return handleVerifyCompany(request);
}
