import express from "express";
import { studentcontroller } from "../controllers/studentcontroller.js";

const router = express.Router();
router.post("/", studentcontroller.insert);
router.get("/", studentcontroller.get);
router.get("/list", studentcontroller.list);
router.get("/new", studentcontroller.create);
router.get("/edit/:id", studentcontroller.edit);
router.post("/update/:id", studentcontroller.update);
router.get("/:id", studentcontroller.show);
router.put("/:id", studentcontroller.update);
router.delete("/:id", studentcontroller.delete);
export default router;