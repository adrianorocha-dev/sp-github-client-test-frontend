export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company?: string;
  bio?: string;
  blog?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
}
