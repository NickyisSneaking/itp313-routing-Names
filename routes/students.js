import express from "express";
import * as c from "../controllers/studentcontroller.js";

const router = express.Router();
router.get("/", c.getAll);
router.get("/:id", c.getOne);
router.post("/", c.create);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

export default router;