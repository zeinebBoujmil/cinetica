import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('should allow login with Google', async ({ page }) => {

    await page.goto('http://localhost:3000/login');


    await page.click('text=Log In with Google');

    await page.waitForURL(/accounts.google.com/);
    await expect(page).toHaveURL(/accounts.google.com/);
  });