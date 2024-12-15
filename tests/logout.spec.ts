import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('Déconnexion et redirection vers la page de login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="username"]', 'mrocher');
  await page.fill('input[name="password"]', 'mrocher');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:3000/dashboard/discover');
  await expect(page).toHaveURL('http://localhost:3000/dashboard/discover');


  const logoutButton = await page.locator('button:has-text("Logout")');
  await logoutButton.click();


  await page.waitForURL('http://localhost:3000/login');
  await expect(page).toHaveURL('http://localhost:3000/login');
});
