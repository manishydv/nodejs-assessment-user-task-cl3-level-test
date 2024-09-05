import con from "../database.js";

const createProject = async (req, res) => {
  const { name, description } = req.body;
  const created_by = req.user.id;
  try {
    if (!name || !description) return res.status(400).json({ errMsg: "Required Information Not Present" });

    const insertQuery = "INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)";
    con.run(insertQuery, [name, description, created_by], function (err) {
      if (err) return res.status(500).json({ errMsg: err.message });
      return res.status(201).json({ msg: "Project Created", project_id: this.lastID });
    });
  } catch (err) {
    return res.status(500).json({ errMsg: "Server Error." });
  }
};

const getAllProject = async (req, res) => {
  con.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) return res.status(500).json({ errMsg: err.message });
    return res.status(200).json(rows);
  });
};

const getProjectFromId = async (req, res) => {
  const projectId = req.query.id;
  con.get("SELECT * FROM projects WHERE id = ?", [projectId], (err, row) => {
    if (err) return res.status(500).json({ errMsg: err.message });
    if (!row) return res.status(404).json({ errMsg: "Project not found" });
    return res.status(200).json(row);
  });
};

export { createProject, getAllProject, getProjectFromId };
