import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Popular Movies Page Tests', () => {
  test('should display popular movies after login', async ({ page }) => {
    // Connexion
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'mrocher');
    await page.fill('input[name="password"]', 'mrocher');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/dashboard/discover');

    // Aller à la page des films populaires
    await page.goto('http://localhost:3000/dashboard/movies/popular');

    // Vérifier que la page populaire est chargée
    const popularPage = await page.locator('[data-testid="popular-page"]');
    await expect(popularPage).toBeVisible();

    // Vérifier qu'au moins une carte de film est affichée
    const movieCards = await page.locator('[data-testid="movie-card"]');
    const cardCount = await movieCards.count();
    console.log(`Nombre de cartes trouvées : ${cardCount}`);
    expect(cardCount).toBeGreaterThan(0);

    // Vérifier qu'un film attendu est présent
    const movieTitles = await page.locator('[data-testid="movie-title"]').allTextContents();
    console.log('Titres des films trouvés :', movieTitles);
    const searchQuery = 'Terrifier 3';
    expect(
      movieTitles.some(title => title.toLowerCase().includes(searchQuery.toLowerCase()))
    ).toBeTruthy();
  });
});
