import express from "express";
import { getOleoInfo } from '../controllers/dashinfo.js';
import { getFiltroInfo } from "../controllers/dashinfo.js";

const router = express.Router();

router.post("/oleo", getOleoInfo)
router.post("/filtro", getFiltroInfo)

export default router;