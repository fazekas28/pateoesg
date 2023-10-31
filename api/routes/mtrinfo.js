import express from "express";
import { storeMtrInfo } from "../controllers/mtrinfo.js";

const router = express.Router();

router.post("/storemtr", storeMtrInfo)

export default router;