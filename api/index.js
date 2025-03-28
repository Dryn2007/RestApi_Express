require("dotenv").config();
const express = require("express");

const usersRoutes = require("./routes/users.js"); // Sesuaikan path dengan struktur Vercel
const middlewareLogRequest = require("./middleware/logs.js");
const upload = require("./middleware/multer.js");

const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");



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

const cors = require("cors");
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


// Export Handler untuk Vercel
module.exports = app;
