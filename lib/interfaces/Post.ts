import User from "./User";

export default interface Post {
  id: string;
  title: string;
  submittedBy?: User;
  thumbnail: string;
  link: string;
  publication?: string;
}
