import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { handleVerifyCompany } from "./server/verifyCompany.js";

// Serve the same /api handlers locally that Vercel serves from api/, so `npm run dev`
// and `npm run preview` behave like production.
const API_ROUTES = { "/api/verify-company": handleVerifyCompany };

function localApi() {
  const middleware = async (req, res, next) => {
    const handler = API_ROUTES[req.url.split("?")[0]];
    if (!handler) return next();
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const request = new Request(`http://localhost${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
    });
    const response = await handler(request);
    res.statusCode = response.status;
    response.headers.forEach((v, k) => res.setHeader(k, v));
    res.end(Buffer.from(await response.arrayBuffer()));
  };
  return {
    name: "local-api",
    // Braces matter: a function returned from these hooks is treated as a post-middleware hook.
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  plugins: [react(), localApi()],
});
