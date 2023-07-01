import { CandidateId } from "./candidates";

export const new_vote_id = self.crypto.randomUUID.bind(self.crypto);

export interface Vote {
  yes: CandidateId[];
  no: CandidateId[];
  random_id: string;
}
