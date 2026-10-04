import express from "express";
import { addClub, getClubs, getClub } from "../controllers/clubcontroller.js";

const router = express.Router();
router.post("/", addClub);
router.get("/", getClubs);
router.get("/:id", getClub);

export default router;