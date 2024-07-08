export const REPO_URL = "https://github.com/tauri-apps/governance-and-guidance";
export const CANDIDATE_PAGE = `${REPO_URL}/blob/main/board-election-2024/Candidates.md`;

export type CandidateId = string;
export interface Candidate {
  id: CandidateId;
  name: string;
  avatar: string;
  intro_url: string;
}

export const CANDIDATES: Candidate[] = [
  {
    id: "daniel-thompson-yvetot",
    name: "Daniel Thompson-Yvetot",
    avatar: "35242872",
    intro_url: `${CANDIDATE_PAGE}#daniel-thompson-yvetot`,
  },
  {
    id: "lucas-nogueira",
    name: "Lucas Nogueira",
    avatar: "20051258",
    intro_url: `${CANDIDATE_PAGE}#lucas-nogueira`,
  },
];
