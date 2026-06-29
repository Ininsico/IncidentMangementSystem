const Team = require('../models/Team');

async function createTeam(req, res) {
  try {
    const team = await Team.create(req.body);
    const populated = await Team.findById(team._id).populate('lead', 'name email').populate('members', 'name email');
    return res.status(201).json({ success: true, data: populated });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Team already exists' });
    console.error('Create team error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function listTeams(req, res) {
  try {
    const teams = await Team.find().populate('lead', 'name email').populate('members', 'name email').sort({ name: 1 });
    return res.status(200).json({ success: true, data: teams });
  } catch (err) {
    console.error('List teams error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getTeam(req, res) {
  try {
    const team = await Team.findById(req.params.id).populate('lead', 'name email').populate('members', 'name email');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    return res.status(200).json({ success: true, data: team });
  } catch (err) {
    console.error('Get team error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateTeam(req, res) {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('lead', 'name email')
      .populate('members', 'name email');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    return res.status(200).json({ success: true, data: team });
  } catch (err) {
    console.error('Update team error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteTeam(req, res) {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    return res.status(200).json({ success: true, message: 'Team deleted' });
  } catch (err) {
    console.error('Delete team error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function addTeamMember(req, res) {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('lead', 'name email').populate('members', 'name email');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    return res.status(200).json({ success: true, data: team });
  } catch (err) {
    console.error('Add team member error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function removeTeamMember(req, res) {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.params.userId } },
      { new: true }
    ).populate('lead', 'name email').populate('members', 'name email');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    return res.status(200).json({ success: true, data: team });
  } catch (err) {
    console.error('Remove team member error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createTeam, listTeams, getTeam, updateTeam, deleteTeam, addTeamMember, removeTeamMember };
