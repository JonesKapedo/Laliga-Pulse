import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { AppShell } from "@/components/app-shell";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "LALIGA Mosaico";
const APP_URL = (import.meta.env.VITE_APP_URL ?? "").replace(/\/+$/, "");
const APP_DESCRIPTION =
  "Every fan is a tile. Together, the picture.";

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p className="font-display text-2xl">Page not found</p>
    </div>
  ),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: APP_DESCRIPTION },
      { name: "theme-color", content: "#07090d" },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: APP_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: APP_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: APP_DESCRIPTION },
      ...(APP_URL
        ? [
            { property: "og:url", content: APP_URL },
            { property: "og:image", content: `${APP_URL}/og.jpg` },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { name: "twitter:image", content: `${APP_URL}/og.jpg` },
          ]
        : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <AuthProvider>
          <AppShell>
            <Outlet />
          </AppShell>
          <Toaster
            theme="dark"
            position="top-center"
            toastOptions={{
              style: {
                background: "#171e28",
                border: "1px solid #252d3a",
                color: "#f2f4f7",
              },
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
