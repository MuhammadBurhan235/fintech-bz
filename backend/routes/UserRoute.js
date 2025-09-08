// routes/UserRoute.js
import express from "express";
import { fetchUsers, fetchUser } from "../controllers/UserController.js";

const router = express.Router();
router.get("/", fetchUsers);
router.get("/:id", fetchUser);

export default router;
