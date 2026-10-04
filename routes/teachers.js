import express from "express";
import { addTeacher, getTeachers, getTeacher } from "../controllers/teachercontroller.js";
const router = express.Router();
router.post("/", addTeacher);
router.get("/", getTeachers);
router.get("/:id", getTeacher);
export default router;