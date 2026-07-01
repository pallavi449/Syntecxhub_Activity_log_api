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
    customSiteTitle: "User Activity Tracker API",
  })
);

// ================= Home Page =================
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>

<head>
<title>User Activity Tracker API</title>

<style>

body{
margin:0;
padding:0;
font-family:Arial,Helvetica,sans-serif;
background:#0f172a;
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.container{
text-align:center;
max-width:700px;
padding:40px;
}

h1{
font-size:42px;
margin-bottom:15px;
}

p{
font-size:18px;
color:#d1d5db;
}

.status{
display:inline-block;
margin-top:20px;
padding:10px 20px;
background:#16a34a;
border-radius:25px;
font-weight:bold;
}

.btn{
display:inline-block;
margin-top:35px;
padding:15px 35px;
background:#2563eb;
color:white;
text-decoration:none;
font-size:18px;
border-radius:8px;
transition:0.3s;
}

.btn:hover{
background:#1d4ed8;
}

.card{
margin-top:40px;
background:#1e293b;
padding:25px;
border-radius:12px;
text-align:left;
}

.card h3{
margin-top:0;
}

.footer{
margin-top:40px;
font-size:14px;
color:#94a3b8;
}

</style>

</head>

<body>

<div class="container">

<h1>🚀 User Activity Tracker API</h1>

<p>
REST API built with
<strong>Node.js</strong>,
<strong>Express.js</strong>,
<strong>MongoDB</strong>,
JWT Authentication,
Swagger Documentation and
Activity Log (Audit Trail).
</p>

<div class="status">
✅ API is Live
</div>

<br>

<a href="/api-docs" class="btn">
📄 Open Swagger Documentation
</a>

<div class="card">

<h3>Available Endpoints</h3>

<ul>
<li>POST /api/users/register</li>
<li>POST /api/users/login</li>
<li>PUT /api/users/:id</li>
<li>DELETE /api/users/:id</li>
<li>GET /api/logs</li>
</ul>

</div>

<div class="footer">
Built with ❤️ using Express.js & MongoDB
</div>

</div>

</body>

</html>
`);
});

// ================= Routes =================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/logs", require("./routes/activityRoutes"));

// ================= 404 =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================= Server =================
app.listen(PORT, () => {
  console.log("==========================================");
  console.log(`🚀 Server Running`);
  console.log(`🌐 Base URL : ${BASE_URL}`);
  console.log(`📄 Swagger  : ${BASE_URL}/api-docs`);
  console.log("==========================================");
});