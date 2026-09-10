import express from "express";
const router = express.Router();

//department and professor (Sensei)
router.get("/", (req, res) => {
    res.json({
       teacher: "Prof. Sensei",
       department: "IT"
    });
});

router.get("/:id", (req, res) =>{
    res.send('Teacher with id ${req.params.id}');
});

export default router;