require("dotenv").config();


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const connectDB = require("./config/db");

const referenceRoutes = require("./routes/reference.routes");
const projectRoutes = require("./routes/project.routes");
const serviceRoutes = require("./routes/service.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
// The larger limit allows small project-logo previews encoded as data URLs.
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend API running."
    });

});

app.use("/api/references", referenceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next)=>{
   next(createError(404, "Route not found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server error."

    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});



