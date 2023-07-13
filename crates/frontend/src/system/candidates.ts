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
  // {
  //   id: "david-lemarier",
  //   name: "David Lemarier",
  //   avatar: "avatar-david.jpg",
  //   intro_url: `${CANDIDATE_PAGE}#david-lemarier`,
  // },
  // {
  //   id: "bill-avery",
  //   name: "Bill Avery",
  //   avatar: "avatar-bill.png",
  //   intro_url: `${CANDIDATE_PAGE}#bill-avery`,
  // },
  // {
  //   id: "jacob-bolda",
  //   name: "Jacob Bolda",
  //   avatar: "avatar-jacob.jpg",
  //   intro_url: `${CANDIDATE_PAGE}#jacob-bolda`,
  // },
  // {
  //   id: "zack-chapple",
  //   name: "Zack Chapple",
  //   avatar: "avatar-zack.jpg",
  //   intro_url: `${CANDIDATE_PAGE}#zack-chapple`,
  // },
  // {
  //   id: "robin-van-boven",
  //   name: "Robin van Boven",
  //   avatar: "avatar-robin.png",
  //   intro_url: `${CANDIDATE_PAGE}#robin-van-boven`,
  // },
];
