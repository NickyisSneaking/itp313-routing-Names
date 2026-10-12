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
import { create } from "hbs";
import { Club, insertClub, selectAllClubs, selectClubById, sequelize } from "../models/Club.js";
import { view } from "../middleware/view.js";
const wantsHtml = (req) => (req.headers.accept || "").includes("text/html");

const done = (req, res, message, payload) => {
  if (wantsHtml(req)) return res.send(view("message", { message, back: "/clubs/list" }));
  res.json(payload);
};

const clubcontroller = {
  insert: async (req, res) => {
    try {
      const club = await insertClub(req.body);
      if (wantsHtml(req)) return done(req, res, "Club added.");
      res.status(201).json(club);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  get: async (req, res) => {
    res.json(await selectAllClubs());
  },

  show: async (req, res) => {
    const c = await selectClubById(req.params.id);
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(c);
  },

  // update the existing data
  update: async (req, res) => {
    const { id } = req.params;
    const { name, school, president, memberCount, room } = req.body;
    await Club.update({ name, school, president, memberCount, room }, { where: { id } });
    done(req, res, "Data updated successfully.", { message: "Data updated successfully" });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await Club.destroy({ where: { id } });
    done(req, res, "Data deleted successfully.", { message: "Data deleted successfully" });
  },

  list: async (req, res) => {
    const data = await selectAllClubs();
    res.send(view("clubs", { data }));
  },

  create: (req, res) => {
    res.send(view("insertclub"));
  },

  edit: async (req, res) => {
    const data = await selectClubById(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.send(view("editclub", { data }));
  },
};

console.log("Sensei it is working, thank you")
export { clubcontroller };