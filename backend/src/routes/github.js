const { Router } = require('express');
const ctrl = require('../controllers/githubController');

const router = Router();

router.get('/repos', ctrl.listRepos);
router.get('/repos/:owner/:repo/branches', ctrl.listBranches);
router.get('/repos/:owner/:repo/commits', ctrl.listCommits);
router.get('/repos/:owner/:repo/commits/:sha', ctrl.getCommit);

module.exports = router;
