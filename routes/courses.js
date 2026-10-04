import express from "express";
import { addCourse, getCourses, getCourse } from "../controllers/coursecontroller.js";
const router = express.Router();
router.post("/", addCourse);
router.get("/", getCourses);
router.get("/:id", getCourse);
export default router;