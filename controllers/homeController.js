
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
  export const homePage = (req, res) => {
  res.render("home", { title: "XianFire Home" });
  console.log("You can add here sensei");

};

const esc = (v) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const wantsHtml = (req) => (req.headers.accept || "").includes("text/html");

const layout = (body) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Clubs</title></head>
<body style="font-family:sans-serif;max-width:800px;margin:20px auto">${body}</body></html>`;

const form = (action, c = {}) => `
<form method="post" action="${action}">
  <input type="text" name="name" placeholder="name" value="${esc(c.name)}"><br>
  <input type="text" name="school" placeholder="school" value="${esc(c.school)}"><br>
  <input type="text" name="president" placeholder="president" value="${esc(c.president)}"><br>
  <input type="text" name="memberCount" placeholder="memberCount" value="${esc(c.memberCount)}"><br>
  <input type="text" name="room" placeholder="room" value="${esc(c.room)}"><br>
  <input type="submit">
</form>`;

const done = (req, res, message, payload) => {
  if (wantsHtml(req)) {
    return res.send(layout(`<p>${message}</p><a href="/clubs/list">Back to list</a>`));
  }
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
    const clubs = await selectAllClubs();
    const rows = clubs
      .map(
        (c) => `
    <tr>
      <td>${esc(c.name)}</td>
      <td>${esc(c.school)}</td>
      <td>${esc(c.president)}</td>
      <td>${esc(c.memberCount)}</td>
      <td>${esc(c.room)}</td>
      <td>
        <a href="/clubs/edit/${c.id}">edit</a> |
        <a href="#" class="del" data-id="${c.id}">delete</a>
      </td>
    </tr>`
      )
      .join("");

    res.send(
      layout(`
  <h2 style="text-align:center">CRUD OPERATION</h2>
  <p style="text-align:center"><a href="/clubs/new">add new</a></p>
  <table border="1" cellpadding="6" style="margin:auto">
    <tr><th>Name</th><th>School</th><th>President</th><th>Members</th><th>Room</th><th>action</th></tr>
    ${rows}
  </table>
  <script>
    document.querySelectorAll(".del").forEach(function (a) {
      a.addEventListener("click", async function (e) {
        e.preventDefault();
        if (!confirm("Delete this club?")) return;
        await fetch("/clubs/" + a.dataset.id, { method: "DELETE" });
        location.reload();
      });
    });
  </script>`)
    );
  },

  create: (req, res) => {
    res.send(layout(`<h2>Add new club</h2>${form("/clubs")}<a href="/clubs/list">Back to list</a>`));
  },

  edit: async (req, res) => {
    const c = await selectClubById(req.params.id);
    if (!c) return res.status(404).json({ error: "Not found" });
    res.send(layout(`<h2>Edit club</h2>${form("/clubs/update/" + c.id, c)}<a href="/clubs/list">Back to list</a>`));
  },
};

export { clubcontroller };
