const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Environment =================
const PORT = process.env.PORT || 5000;
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : `http://localhost:${PORT}`;

// ================= MongoDB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });

// ================= Swagger =================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Activity Tracker API",
      version: "1.0.0",
      description:
        "REST API for User Management with Activity Logs (Audit Trail)",
    },

    servers: [
      {
        url: BASE_URL,
        description:
          process.env.NODE_ENV === "production"
            ? "Production Server"
            : "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

// ================= Home Route =================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 User Activity Tracker API is Running",
    documentation: `${BASE_URL}/api-docs`,
    endpoints: {
      register: "POST /api/users/register",
      login: "POST /api/users/login",
      updateUser: "PUT /api/users/:id",
      deleteUser: "DELETE /api/users/:id",
      activityLogs: "GET /api/logs",
    },
  });
});

// ================= Routes =================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/logs", require("./routes/activityRoutes"));

// ================= 404 Handler =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================= Server =================
app.listen(PORT, () => {
  console.log("====================================");
  console.log(`🚀 Server Running on Port : ${PORT}`);
  console.log(`🌐 API Base URL          : ${BASE_URL}`);
  console.log(`📄 Swagger Docs          : ${BASE_URL}/api-docs`);
  console.log("====================================");
});