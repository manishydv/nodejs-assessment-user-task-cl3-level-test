import con from "../database.js";

const createTasks = async (req, res) => {
  const { name, description, status, project_id } = req.body;
  try {
    if (!name || !description || !status || !project_id) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }
      
    const insertQuery = "INSERT INTO tasks (name, description, status, project_id) VALUES (?, ?, ?, ?)";
    con.run(insertQuery, [name, description, status, project_id], function (err) {
      if (err) return res.status(500).json({ errMsg: err.message });
      return res.status(201).json({ msg: "Task Added Successfully", task_id: this.lastID});
    });
  } catch (err) {
    return res.status(500).json({ errMsg: "Server Error." });
  }
};

const getAllTasks = async (req, res) => {
  con.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(400).json({ errMsg: err.message });
    return res.status(201).json(rows);
  });
};

const getTasksFromId = async (req, res) => {
  const taskId = req.query.id;
  con.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
    if (err) return res.status(500).json({ errMsg: err.message });
    return res.status(200).json(row);
  });
};

const getTasksFromProjectId = async (req, res) => {
  const projectId = req.query.project;
  con.all("SELECT * FROM tasks WHERE project_id = ?", [projectId], (err, rows) => {
    if (err) return res.status(500).json({ errMsg: err.message });
    return res.status(200).json(rows);
  });
};

export { createTasks, getAllTasks, getTasksFromId, getTasksFromProjectId };
