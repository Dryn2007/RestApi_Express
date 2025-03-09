require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");

const usersRoutes = require("./routes/users.js");

const middlewareLogRequest = require("./middleware/logs.js");
const upload = require("./middleware/multer.js");

const app = express();
app.use(middlewareLogRequest);
app.use(express.json());
app.use("/assets", express.static("public/images"))

// Baca file JSON dokumentasi
const swaggerDocument = JSON.parse(fs.readFileSync("./apidocs.json", "utf-8"));
// Middleware Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/users", usersRoutes);
app.post("/upload",upload.single('photo'),(req, res)=> {
  res.json({
    message: "upload berhasil"
  })
})

app.use((err, req, res, next)=>{
  res.json({
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`server berhasil dijalankan pada port ${PORT}`);
});


