const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = await Project.create({
      title,
      description,
      owner: req.user.id,
      members: [req.user.id]
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { projects: project._id } });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project' });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ members: req.user.id });
  res.json(projects);
};

exports.inviteMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (!project.owner.equals(req.user.id))
      return res.status(403).json({ message: 'Only owner can invite' });

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
      await User.findByIdAndUpdate(userId, { $addToSet: { projects: project._id } });
    }
    res.json({ message: 'User invited' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to invite member' });
  }
};