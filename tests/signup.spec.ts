import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('should navigate to the signup page', async ({ page }) => {

    await page.goto('http://localhost:3000/login');


    await page.click('text=Sign Up');


    await page.waitForURL('http://localhost:3000/signup');
    await expect(page).toHaveURL('http://localhost:3000/signup');
      });