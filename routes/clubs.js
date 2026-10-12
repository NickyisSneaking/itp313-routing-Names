import express from "express";
import { clubcontroller } from "../controllers/clubcontroller.js";

const router = express.Router();
router.post("/", clubcontroller.insert);
router.get("/", clubcontroller.get);
router.get("/list", clubcontroller.list);
router.get("/new", clubcontroller.create);
router.get("/edit/:id", clubcontroller.edit);
router.post("/update/:id", clubcontroller.update);
router.get("/:id", clubcontroller.show);
router.put("/:id", clubcontroller.update);
router.delete("/:id", clubcontroller.delete);
export default router;