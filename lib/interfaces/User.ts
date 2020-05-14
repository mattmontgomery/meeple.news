export default interface User {
  displayName: string;
  authDomain?: string;
  roles?: ["admin" | null];
  id: string;
  email?: string;
  apiKey?: string;
}
