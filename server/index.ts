import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Add explicit static file routes for development
  if (app.get("env") === "development") {
    // Serve favicon files with correct MIME types
    app.get('/favicon.svg', (req, res) => {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.sendFile(path.resolve(process.cwd(), 'public/favicon.svg'));
    });
    
    app.get('/favicon.ico', (req, res) => {
      res.setHeader('Content-Type', 'image/x-icon');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.sendFile(path.resolve(process.cwd(), 'public/favicon.svg'));
    });
    
    app.get('/apple-touch-icon.svg', (req, res) => {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.sendFile(path.resolve(process.cwd(), 'public/apple-touch-icon.svg'));
    });
    
    // Serve icon files from icons directory
    app.get('/icons/:filename', (req, res) => {
      const filename = req.params.filename;
      if (filename.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.sendFile(path.resolve(process.cwd(), `public/icons/${filename}`));
      }
    });
    
    // Serve specific SEO files before catch-all
    app.get('/robots.txt', (req, res) => {
      res.setHeader('Content-Type', 'text/plain');
      res.sendFile(path.resolve(process.cwd(), 'public/robots.txt'));
    });
    
    app.get('/sitemap.xml', (req, res) => {
      res.setHeader('Content-Type', 'application/xml');
      res.sendFile(path.resolve(process.cwd(), 'public/sitemap.xml'));
    });
    
    // Serve service worker with correct MIME type
    app.get('/service-worker.js', (req, res) => {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.resolve(process.cwd(), 'public/service-worker.js'));
    });
    
    // Serve manifest.json with correct MIME type
    app.get('/manifest.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.sendFile(path.resolve(process.cwd(), 'public/manifest.json'));
    });
    
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
