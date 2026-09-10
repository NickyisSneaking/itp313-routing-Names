import express from "express";
const router = express.Router();

//Room and building name
router.get("/", (req, res) => {
    res.json({
      room: "Room 301",
      building: "Main Building Publishing Department"
    });
});

router.get("/:id", (req, res) =>{
    res.send('Room with id ${req.params.id}');
});

export default router;