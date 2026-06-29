const Attachment = require('../models/Attachment');

async function deleteAttachment(req, res) {
  try {
    const attachment = await Attachment.findOneAndDelete({ _id: req.params.id, uploadedBy: req.user.uid });
    if (!attachment) return res.status(404).json({ error: 'Attachment not found or unauthorized' });
    return res.status(200).json({ success: true, message: 'Attachment deleted' });
  } catch (err) {
    console.error('Delete attachment error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { deleteAttachment };
