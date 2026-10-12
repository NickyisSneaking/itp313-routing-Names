/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { Studentmodel, insertStudent, selectAllStudents, selectStudentById, sequelize } from "../models/Studentmodel.js";
import { view } from "../middleware/view.js";

const wantsHtml = (req) => (req.headers.accept || "").includes("text/html");

const done = (req, res, message, payload) => {
  if (wantsHtml(req)) return res.send(view("message", { message, back: "/students/list" }));
  res.json(payload);
};

const studentcontroller = {
  insert: async (req, res) => {
    try {
      const student = await insertStudent(req.body);
      if (wantsHtml(req)) return done(req, res, "Student added.");
      res.status(201).json(student);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  get: async (req, res) => {
    res.json(await selectAllStudents());
  },

  show: async (req, res) => {
    const s = await selectStudentById(req.params.id);
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, age, club, school, role } = req.body;
    await Studentmodel.update({ name, age, club, school, role }, { where: { id } });
    done(req, res, "Data updated successfully.", { message: "Data updated successfully" });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await Studentmodel.destroy({ where: { id } });
    done(req, res, "Data deleted successfully.", { message: "Data deleted successfully" });
  },

  list: async (req, res) => {
    const data = await selectAllStudents();
    res.send(view("students", { data }));
  },

  create: (req, res) => {
    res.send(view("insertstudent"));
  },

  edit: async (req, res) => {
    const data = await selectStudentById(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.send(view("editstudent", { data }));
  },
};

export { studentcontroller };