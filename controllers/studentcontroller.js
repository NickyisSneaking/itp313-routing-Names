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
import { Studentmodel, sequelize } from "../models/Studentmodel.js";
await sequelize.sync();
const studentcontroller ={
  index: async (req, res) => {
    res.send("Index Page");
  },
};

export const getAll = async (req, res) => {
  res.json(await Studentmodel.findAll());
};

export const getOne = async (req, res) => {
  const s = await Studentmodel.findByPk(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found" });
  res.json(s);
};

export const create = async (req, res) => {
  try {
    res.status(201).json(await Studentmodel.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  const s = await Studentmodel.findByPk(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found" });
  res.json(await s.update(req.body));
};

export const remove = async (req, res) => {
  const s = await Studentmodel.findByPk(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found" });
  await s.destroy();
  res.status(204).end();
};

export { studentcontroller };