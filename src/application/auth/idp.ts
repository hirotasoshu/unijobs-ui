export interface IdentityProvider {
  init(): Promise<void>;
  login(): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
  getUsername(): string | null;
  getRoles(): string[];
  getToken(): Promise<string | null>;
}
