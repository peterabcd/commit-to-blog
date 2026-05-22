const githubService = require('../services/githubService');

exports.listRepos = async (req, res, next) => {
  try { res.json(await githubService.getUserRepos()); } catch (e) { next(e); }
};

exports.listBranches = async (req, res, next) => {
  try {
    res.json(await githubService.getBranches(req.params.owner, req.params.repo));
  } catch (e) { next(e); }
};

exports.listCommits = async (req, res, next) => {
  try {
    const { branch = 'main', per_page = 30 } = req.query;
    res.json(await githubService.getCommits(req.params.owner, req.params.repo, branch, Number(per_page)));
  } catch (e) { next(e); }
};

exports.getCommit = async (req, res, next) => {
  try {
    res.json(await githubService.getCommitDetail(req.params.owner, req.params.repo, req.params.sha));
  } catch (e) { next(e); }
};
