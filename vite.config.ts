import { defineConfig } from "vite";

function resolveBasePath(): string {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return "/";
  }

  const [, repoName] = repository.split("/");

  // User/organization pages repos serve from root.
  if (repoName.endsWith(".github.io")) {
    return "/";
  }

  return `/${repoName}/`;
}

export default defineConfig({
  // Use relative asset paths for non-Actions production builds (e.g. manual GitHub Pages deploys).
  base: process.env.GITHUB_ACTIONS ? resolveBasePath() : "./"
});
