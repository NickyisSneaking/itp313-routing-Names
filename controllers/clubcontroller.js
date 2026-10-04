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
import { Club, selectClubById, sequelize } from "../models/Club.js";
import { insertClub, selectAllClubs } from "../models/Club.js" //reference to club at models
await sequelize.sync();
const clubcontroller ={
  index: async (req, res) => {
    res.send("Index Page");
  },
};
export const addClub = async (req, res) => {
  try {
    res.status(201).json(await insertClub(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getClubs = async (req, res) => {
  res.json(await selectAllClubs());
};

export const getClub = async (req, res) => {
  const c = await selectClubById(req.params.id);
  if (!c) return res.status(404).json({ error: "Not found"});
  res.json(c); 
};

export { clubcontroller };