import { CandidateId } from "./candidates";

export const new_vote_id = self.crypto.randomUUID.bind(self.crypto);

export interface Vote {
  for: CandidateId[];
  against: CandidateId[];
  random_id: string;
}
