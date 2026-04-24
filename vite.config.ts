import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const repository = env.GITHUB_REPOSITORY;
  const owner = env.GITHUB_REPOSITORY_OWNER;
  const repoName = repository?.split("/")[1];
  const isUserOrOrgPages =
    !!repoName &&
    !!owner &&
    repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  const pagesBase =
    env.GITHUB_ACTIONS && repoName && !isUserOrOrgPages ? `/${repoName}/` : "/";

  return {
    base: pagesBase,
    plugins: [react()],
  };
});
