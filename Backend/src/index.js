import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./Lib/db.js";

//Routes :
import authRoutes from "./Routes/auth.Route.js";
import projectsRoutes from "./Routes/projects.Route.js";
import userRoutes from "./Routes/users.Route.js";
import eventsRoutes from "./Routes/events.Route.js";
import communityRoutes from "./Routes/community.route.js";
import internshipRoutes from "./Routes/Intenships.route.js";
import problemRoutes from "./Routes/problemStatement.Route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/Events", eventsRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/internship", internshipRoutes);
app.use("/api/problemStatement", problemRoutes);

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  ConnectDB();
});
