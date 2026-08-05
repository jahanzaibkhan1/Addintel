import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  private readonly navMenu = this.page.locator('nav, [class*="sidebar"], [class*="menu"]').first();
  private readonly userAvatar = this.page.locator('[class*="avatar"], [class*="user-icon"], [class*="profile"]').first();
  private readonly logoutButton = this.page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign out")').first();
  private readonly printerManagerLink = this.page.locator('a:has-text("Printer"), [href*="printer"]').first();
  private readonly connectionsLink = this.page.locator('a:has-text("Connection"), [href*="connection"]').first();

  constructor(page: Page) {
    super(page);
  }

  async isLoggedIn(): Promise<boolean> {
    return (
      !this.page.url().includes('/login') &&
      (await this.isVisible(this.navMenu))
    );
  }

  async logout() {
    await this.clickElement(this.userAvatar);
    await this.clickElement(this.logoutButton);
    await this.waitForPageLoad();
  }

  async navigateToPrinterManager() {
    await this.clickElement(this.printerManagerLink);
    await this.waitForPageLoad();
  }

  async navigateToConnections() {
    await this.clickElement(this.connectionsLink);
    await this.waitForPageLoad();
  }

  async assertOnDashboard() {
    await expect(this.page).not.toHaveURL(/login/);
  }
}