import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/wedding-invitation/").
export default defineConfig({
  base: process.env["BASE_PATH"] ?? "/",
  server: { port: 3000 },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
      // Static single-page output so it can be hosted on GitHub Pages.
      spa: { enabled: true },
    }),
    viteReact(),
    tailwindcss(),
    nitro(),
  ],
});
