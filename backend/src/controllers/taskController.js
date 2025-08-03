const Task = require('../models/Task');
const Project = require('../models/Project');
const { emitToProject } = require('../socket');

exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.members.includes(req.user.id))
      return res.status(403).json({ message: 'Not a project member' });

    const task = await Task.create({
      title, description, projectId, assignedTo, dueDate
    });
    emitToProject(projectId, "taskCreated", task);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ projectId });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    );
    if (task) emitToProject(task.projectId, "taskUpdated", task);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};