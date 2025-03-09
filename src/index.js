require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");

const usersRoutes = require("./routes/users.js");
const middlewareLogRequest = require("./middleware/logs.js");
const upload = require("./middleware/multer.js");

const app = express();
const PORT = process.env.PORT || 4000; // Gunakan default port jika tidak ditemukan

app.use(middlewareLogRequest);
app.use(express.json());
app.use("/assets", express.static("public/images"));

// Baca file JSON dokumentasi
const swaggerDocument = JSON.parse(fs.readFileSync("./apidocs.json", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", usersRoutes);
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ message: "Upload berhasil" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server berhasil dijalankan pada port ${PORT}`);
});
