import express from "express";
import { exportCsv } from '../controllers/exportCsv.js';


const router = express.Router();

router.post("/exportcsv", exportCsv)

export default router;