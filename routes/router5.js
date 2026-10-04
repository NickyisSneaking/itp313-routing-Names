import express from "express";
const router = express.Router();

//Room and building name
router.get("/", (req, res) => {
    res.json({
     schedule: "MWF 9AM-12PM",
     section: "3F2"
    });
});

router.get("/:id", (req, res) =>{
    res.send(`Schedule with id ${req.params.id}`);
});

export default router;