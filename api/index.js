import "dotenv/config";
import express from "express";
import usersRoutes from "./routes/users.js"; // Sesuaikan path dengan struktur Vercel
import middlewareLogRequest from "./middleware/logs.js";
import upload from "./middleware/multer.js";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";


// Menentukan __dirname di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Dokumentasi API dengan Swagger",
    },
  },
  apis: [path.join(__dirname, "./routes/*.js")], // Sesuaikan path
};
const openapiSpecifications = swaggerJsdoc(options);

const app = express();

// Middleware
app.use(middlewareLogRequest);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "./images"))); // Sesuaikan path
app.use(cors());

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(openapiSpecifications, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
  })
);

app.use("/api/users", usersRoutes);

// Route Upload
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ message: "Upload berhasil" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
  
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Export untuk Vercel
export default app;
