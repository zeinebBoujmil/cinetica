//j'ai pas réussi à faire fonctionner ce test ... 


import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Popular Movies Page Tests', () => {
  test('should display popular movies after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'mrocher');
    await page.fill('input[name="password"]', 'mrocher');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/dashboard/discover');

    await page.goto('http://localhost:3000/dashboard/movies/popular');

    const popularPage = await page.locator('[data-testid="popular-page"]');
    await expect(popularPage).toBeVisible();

    //problème ici ! 
    const movieCards = await page.locator('[data-testid="movie-card"]');
    const cardCount = await movieCards.count();
    console.log(`Nombre de cartes trouvées : ${cardCount}`);
    expect(cardCount).toBeGreaterThan(0);

    const movieTitles = await page.locator('[data-testid="movie-title"]').allTextContents();
    console.log('Titres des films trouvés :', movieTitles);
    const searchQuery = 'Terrifier 3';
    expect(
      movieTitles.some(title => title.toLowerCase().includes(searchQuery.toLowerCase()))
    ).toBeTruthy();
  });
});
