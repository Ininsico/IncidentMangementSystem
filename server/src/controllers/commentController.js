const Comment = require('../models/Comment');

async function updateComment(req, res) {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, author: req.user.uid },
      { body: req.body.body },
      { new: true, runValidators: true }
    ).populate('author', 'name email');
    if (!comment) return res.status(404).json({ error: 'Comment not found or unauthorized' });
    return res.status(200).json({ success: true, data: comment });
  } catch (err) {
    console.error('Update comment error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, author: req.user.uid });
    if (!comment) return res.status(404).json({ error: 'Comment not found or unauthorized' });
    return res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    console.error('Delete comment error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { updateComment, deleteComment };
