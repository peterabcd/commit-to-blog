const githubService = require('./githubService');
const llmService = require('./llmService');

async function generateFromCommits({ repoFullName, branch, commitShas, additionalContext }) {
  const [owner, repo] = repoFullName.split('/');
  const commits = await Promise.all(
    commitShas.map(sha => githubService.getCommitDetail(owner, repo, sha))
  );
  return llmService.generateBlogPost({ repoFullName, branch, commits, additionalContext });
}

module.exports = { generateFromCommits };
