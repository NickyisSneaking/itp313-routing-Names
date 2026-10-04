import express from "express";
import { addSchool, getSchools, getSchool } from "../controllers/schoolcontroller.js";
const router = express.Router();
router.post("/", addSchool);
router.get("/", getSchools);
router.get("/:id", getSchool);
export default router;