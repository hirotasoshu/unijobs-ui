import Keycloak from "keycloak-js";
import { IdentityProvider } from "../../application/auth/idp";

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
    await this.keycloak.login();
  }

  async logout(): Promise<void> {
    await this.keycloak.logout({ redirectUri: window.location.origin });
  }

  isAuthenticated(): boolean {
    return !!this.keycloak.authenticated;
  }

  getUsername(): string | null {
    return this.keycloak.tokenParsed?.preferred_username || null;
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
