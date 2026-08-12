// Optional live GitHub activity for a project card: when it works, it adds
// "Updated N ago" (and a star count, only if non-zero — showing "★ 0" on
// every card would look worse than showing nothing). When it fails — rate
// limited, network down, GitHub having a bad day — every call site treats
// `null` as "just render the static data.ts content," so the portfolio
// never depends on GitHub being reachable.

export type RepoActivity = {
  pushedAt: string;
  stars: number;
};

function parseOwnerRepo(githubUrl: string): string | null {
  const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+?)\/?$/);
  return match ? match[1] : null;
}

export async function getRepoActivity(githubUrl: string): Promise<RepoActivity | null> {
  const ownerRepo = parseOwnerRepo(githubUrl);
  if (!ownerRepo) return null;

  try {
    const res = await fetch(`https://api.github.com/repos/${ownerRepo}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (typeof data.pushed_at !== "string" || typeof data.stargazers_count !== "number") {
      return null;
    }

    return { pushedAt: data.pushed_at, stars: data.stargazers_count };
  } catch {
    return null;
  }
}

export function timeAgo(isoDate: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  const units: [string, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [label, secondsInUnit] of units) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
