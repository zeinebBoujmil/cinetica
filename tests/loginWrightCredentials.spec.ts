import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Login Page Tests', () => {
  test('should successfully log in with valid credentials', async ({ page }) => {

    await page.goto('http://localhost:3000/login'); 

    await page.fill('input[name="username"]', "mrocher");
    await page.fill('input[name="password"]', "mrocher");

    await page.click('button[type="submit"]');


    await page.waitForURL('http://localhost:3000/dashboard/discover');
    await expect(page).toHaveURL('http://localhost:3000/dashboard/discover');


  });

});
//npm install dotenv --save-dev    
