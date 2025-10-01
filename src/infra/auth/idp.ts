import Keycloak from "keycloak-js";
import { IdentityProvider } from "../../application/auth/idp";
import { UserId } from "../../domain/valueObjects/id";
import i18n from "../../i18n";

export class KeycloakIdentityProvider implements IdentityProvider {
  private keycloak: Keycloak;
  private initialized = false;

  constructor() {
    this.keycloak = new Keycloak({
      url: "http://localhost:8080",
      realm: "unijobs",
      clientId: "unijobs-ui",
    });
  }

  async init(): Promise<void> {
    if (!this.initialized) {
      await this.keycloak.init({
        onLoad: "check-sso",
        pkceMethod: "S256",
      });
      this.initialized = true;
    }
  }

  async login(): Promise<void> {
    const lng = i18n.language?.split("-")[0] || "ru";
    await this.keycloak.login({ locale: lng });
  }

  async logout(): Promise<void> {
    await this.keycloak.logout({ redirectUri: window.location.origin });
  }

  isAuthenticated(): boolean {
    return !!this.keycloak.authenticated;
  }

  getUsername(): string | null {
    const token = this.keycloak.tokenParsed;
    if (!token) return null;

    const firstName = token.given_name as string | undefined;
    const lastName = token.family_name as string | undefined;

    if (firstName || lastName) {
      return [firstName, lastName].filter(Boolean).join(" ");
    }

    return token.preferred_username ?? null;
  }

  getUserId(): UserId | null {
    return this.keycloak.tokenParsed?.sub || null;
  }

  getRoles(): string[] {
    return this.keycloak.tokenParsed?.realm_access?.roles || [];
  }

  async getToken(): Promise<string | null> {
    try {
      await this.keycloak.updateToken(30);
      return this.keycloak.token || null;
    } catch (err) {
      console.error("Token refresh failed", err);
      await this.login();
      return null;
    }
  }
}
