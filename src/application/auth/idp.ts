import { UserId } from "../../domain/valueObjects/id";

export interface IdentityProvider {
  init(): Promise<void>;
  login(): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
  getUsername(): string | null;
  getUserId(): UserId | null;
  getRoles(): string[];
  getToken(): Promise<string | null>;
}
