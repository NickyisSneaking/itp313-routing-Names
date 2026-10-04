import express from "express";

const router = express.Router();

//unit act2
router.get("/", (req, res) => {
    res.json({
       subject: "Web Devolpment",
       unit: 3
    });

});

router.get("/:id", (req, res) =>{
    res.send(`subject with id ${req.params.id}`);
});

export default router;