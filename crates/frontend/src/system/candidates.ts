export const REPO_URL = "https://github.com/tauri-apps/governance-and-guidance";
export const CANDIDATE_PAGE = `${REPO_URL}/blob/main/board-election-2023/Candidates.md`;

export type CandidateId = string;
export interface Candidate {
  id: CandidateId;
  name: string;
  avatar: string;
  intro_url: string;
}

export const CANDIDATES: Candidate[] = [
  {
    id: "robin-van-boven",
    name: "Robin van Boven",
    avatar: "https://avatars.githubusercontent.com/u/497556",
    intro_url: `${CANDIDATE_PAGE}#robin-van-boven`,
  },
  {
    id: "robin-b",
    name: "Robin B",
    avatar: "https://avatars.githubusercontent.com/u/497556",
    intro_url: `${CANDIDATE_PAGE}#robin-van-boven`,
  },
  {
    id: "robin-c",
    name: "Robin C",
    avatar: "https://avatars.githubusercontent.com/u/497556",
    intro_url: `${CANDIDATE_PAGE}#robin-van-boven`,
  },
];
