import express from "express";
import { edituser } from '../controllers/auth.js';
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/edit", edituser)
router.post("/login", login)

export default router;