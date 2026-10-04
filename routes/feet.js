import express from "express";

const god = express();

//list of the student
god.get("/", (req, res) => {
    res.json({
        name: "Takane Miyoshi",
        school: "Red Winter",
        age: "16"
    });

});

god.get("/students/:id", (req, res) =>{
    const stud = req.params.id;
    res.send(`she is ${stud} years old`);

});

export default god;