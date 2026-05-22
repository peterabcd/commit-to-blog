const postRepository = require('../repositories/postRepository');

exports.list = (req, res) => {
  res.json(postRepository.getAll());
};

exports.get = (req, res) => {
  const post = postRepository.getById(Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

exports.create = (req, res) => {
  const { title, body, summary, repoName, repo_name, branch, commits, tags } = req.body;
  if (!title || !branch || !(repoName || repo_name)) {
    return res.status(400).json({ error: 'title, branch, repoName are required' });
  }
  const id = postRepository.create({
    title, body, summary,
    repoName: repoName || repo_name,
    branch, commits, tags,
  });
  res.status(201).json({ id });
};

exports.update = (req, res) => {
  postRepository.update(Number(req.params.id), req.body);
  res.json({ success: true });
};

exports.remove = (req, res) => {
  postRepository.remove(Number(req.params.id));
  res.json({ success: true });
};

exports.publish = (req, res) => {
  postRepository.publish(Number(req.params.id));
  res.json({ success: true });
};
