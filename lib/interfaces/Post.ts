import User from "./User";

export type PostPlacements = "frontpage" | "link" | null;

export default interface Post {
  readonly id: string;
  title: string;
  submitted: Date;
  submittedBy?: User;
  thumbnail: string;
  link: string;
  publication?: string;
  placements?: PostPlacements[];
}
