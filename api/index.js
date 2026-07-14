import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import { Redis } from "@upstash/redis";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// Initialize Upstash Redis client
const redis = url && token ? new Redis({ url, token }) : null;

if (!redis) {
  console.warn(
    "WARNING: Upstash Redis credentials are missing in .env.local.\n" +
      "Please make sure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.",
  );
}

// GET /api/geolocation - Geolocation endpoint for Vercel headers
app.get("/api/geolocation", (req, res) => {
  const country = req.headers["x-vercel-ip-country"] || "";
  const region = req.headers["x-vercel-ip-country-region"] || "";
  const city = req.headers["x-vercel-ip-city"] || "";

  return res.status(200).json({
    country: typeof country === "string" ? country.toUpperCase() : "",
    region: typeof region === "string" ? region.toUpperCase() : "",
    city: typeof city === "string" ? city : "",
  });
});

// GET /api/visitors - Unique visitor counter endpoint
app.get("/api/visitors", async (req, res) => {
  if (!redis) {
    return res.status(503).json({ error: "Database configuration missing" });
  }

  try {
    // 1. Retrieve the client's IP address (handling standard proxies like Vercel and Cloudflare)
    const rawIp =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
    const ip = Array.isArray(rawIp)
      ? rawIp[0]
      : typeof rawIp === "string"
        ? rawIp.split(",")[0].trim()
        : rawIp;

    // 2. Retrieve the User-Agent
    const ua = req.headers["user-agent"] || "unknown";

    // 3. Generate a privacy-friendly unique SHA-256 hash
    const hash = crypto
      .createHash("sha256")
      .update(`${ip}-${ua}`)
      .digest("hex");
    const key = `visitor_hash:${hash}`;

    // 4. Attempt to set the key in Redis (only if it does not exist) with 24 hours (86400 seconds) expiration
    const isNew = await redis.set(key, "1", { nx: true, ex: 86400 });

    let count;
    if (isNew === "OK" || isNew === true) {
      // First time this unique visitor is seen within 24 hours: increment the counter
      count = await redis.incr("total_visitors");
    } else {
      // Repeat visitor: retrieve the current counter value
      const val = await redis.get("total_visitors");
      count = val ? parseInt(val, 10) : 0;
    }

    return res.status(200).json({ totalVisitors: count });
  } catch (error) {
    console.error("Error in visitor counting endpoint:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve frontend build static files in standalone production mode
const distPath = path.resolve(process.cwd(), "dist");
app.use(express.static(distPath));

// Fallback all other client-side routing to index.html for SPA support
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(distPath, "index.html"));
// });

// Run standalone Express server locally when not running on Vercel
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Express server is running locally on port ${PORT}`);
  });
}

// Export the app for Vercel Serverless Function runtime
export default app;
