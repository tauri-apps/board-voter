export const REPO_URL = "https://github.com/tauri-apps/governance-and-guidance";
export const CANDIDATE_PAGE = `${REPO_URL}/blob/main/board-election-2025/Candidates.md`;

export type CandidateId = string;
export interface Candidate {
  id: CandidateId;
  name: string;
  avatar: string;
  intro_url: string;
}

export const CANDIDATES: Candidate[] = [
  {
    id: "jacob-bolda",
    name: "Jacob Bolda",
    avatar: "2019387",
    intro_url: `${CANDIDATE_PAGE}#jacob-bolda`,
  },
  {
    id: "bill-avery",
    name: "Bill Avery",
    avatar: "6502881",
    intro_url: `${CANDIDATE_PAGE}#bill-avery`,
  },
  {
    id: "chip-reed",
    name: "Chip Reed",
    avatar: "3301043",
    intro_url: `${CANDIDATE_PAGE}#chip-reed`,
  },
  {
    id: "fabian-lars",
    name: "Fabian-Lars",
    avatar: "30730186",
    intro_url: `${CANDIDATE_PAGE}#fabian-lars`,
  },
];
