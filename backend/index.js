import express from "express";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/users", userRoute);

app.listen(8080, () => console.log("Server is running on port 8080"));
