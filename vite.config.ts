import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const processEnv =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env ?? {};

  const repository = processEnv.GITHUB_REPOSITORY ?? env.GITHUB_REPOSITORY;
  const owner = processEnv.GITHUB_REPOSITORY_OWNER ?? env.GITHUB_REPOSITORY_OWNER;
  const isGithubActions =
    processEnv.GITHUB_ACTIONS === "true" ||
    env.GITHUB_ACTIONS === "true" ||
    !!processEnv.GITHUB_ACTIONS ||
    !!env.GITHUB_ACTIONS;
  const repoName = repository?.split("/")[1];
  const isUserOrOrgPages =
    !!repoName &&
    !!owner &&
    repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  const pagesBase =
    isGithubActions && repoName && !isUserOrOrgPages ? `/${repoName}/` : "/";

  return {
    base: pagesBase,
    plugins: [react()],
  };
});
