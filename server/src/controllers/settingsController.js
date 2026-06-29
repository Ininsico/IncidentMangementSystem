const Settings = require('../models/Settings');

async function getSettings(req, res) {
  try {
    const settings = await Settings.find();
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('Get settings error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateSettings(req, res) {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await Settings.findOneAndUpdate({ key }, { key, value }, { upsert: true });
    }
    const settings = await Settings.find();
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('Update settings error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getSettings, updateSettings };
