const blogService = require('../services/blogService');

exports.generate = async (req, res, next) => {
  try {
    const { repoFullName, branch, commitShas, additionalContext } = req.body;
    if (!repoFullName || !Array.isArray(commitShas) || commitShas.length === 0) {
      return res.status(400).json({ error: 'repoFullName and commitShas[] are required' });
    }
    const draft = await blogService.generateFromCommits({ repoFullName, branch, commitShas, additionalContext });
    res.json(draft);
  } catch (e) { next(e); }
};
