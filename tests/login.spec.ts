import { test, expect } from '@playwright/test';

test('Vérification des identifiants corrects avec next-auth', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  const username = await page.locator('input[name="username"]').inputValue();
  const password = await page.locator('input[name="password"]').inputValue();

  await page.waitForURL('http://localhost:3000/dashboard/discover');
  await expect(page).toHaveURL('http://localhost:3000/dashboard/discover');
});

