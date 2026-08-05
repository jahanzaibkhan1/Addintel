import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // Selectors — update if site uses different attributes
  private readonly emailInput = this.page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first();
  private readonly passwordInput = this.page.locator('input[type="password"]').first();
  private readonly loginButton = this.page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")').first();
  private readonly errorMessage = this.page.locator('[class*="error"], [class*="alert"], [role="alert"]').first();

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string) {
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, password);
    await Promise.all([
      this.clickElement(this.loginButton),
      this.page.waitForLoadState('networkidle'),
    ]);
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return this.getText(this.errorMessage);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return (
      (await this.isVisible(this.emailInput)) &&
      (await this.isVisible(this.passwordInput))
    );
  }

  async isErrorVisible(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async assertOnLoginPage() {
    await expect(this.page).toHaveURL(/login/);
  }
}