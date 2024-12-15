import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpassword');

    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:3000/login');
    await expect(page).toHaveURL('http://localhost:3000/login');
      });