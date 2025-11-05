// spec: specs/student-login-logout-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Logout Flow', () => {
  test('3.1 Logout via Profile Icon', async ({ page }) => {
    // 1. Log in using valid credentials
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    await page.getByRole('textbox', { name: 'Email' }).fill('test-stud');
    await page.getByRole('textbox', { name: 'Password' }).fill('test-stud');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('https://sau-portal.de/', { timeout: 10000 });
    
    // 2. Verify user is on authenticated page
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).toBeVisible();
    
    // 3. Locate profile icon in header (second button in header)
    const profileButton = page.locator('button').nth(1);
    
    // 4. Click on profile icon
    await profileButton.click();
    
    // Verification: Profile menu opens when clicking profile icon
    await expect(page.getByRole('heading', { name: 'User Information' })).toBeVisible();
    
    // 5. Locate logout button in dialog
    const logoutButton = page.getByRole('button', { name: 'Logout' });
    
    // Verification: Logout option is visible and clickable
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toBeEnabled();
    
    // 6. Click logout option
    await logoutButton.click();
    
    // Verification: After clicking logout, user is redirected to login page
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Verification: Authenticated UI elements are no longer visible (back on login page)
    await expect(page.getByRole('button', { name: 'Prüfungen und Noten' })).not.toBeVisible();
  });

  test('3.2 Cannot Access Authenticated Pages After Logout', async ({ page }) => {
    // 1. Complete logout from test 3.1 - log in first
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    await page.getByRole('textbox', { name: 'Email' }).fill('test-stud');
    await page.getByRole('textbox', { name: 'Password' }).fill('test-stud');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('https://sau-portal.de/', { timeout: 10000 });
    
    // 2. Note a protected URL from the authenticated session
    const protectedURL = page.url();
    expect(protectedURL).toBe('https://sau-portal.de/');
    
    // Logout
    await page.locator('button').nth(1).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 3. Attempt to navigate directly to that protected URL
    await page.goto(protectedURL);
    
    // Verification: User is redirected back to login page
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // Verification: Protected page is not accessible
    // Verification: Login form is displayed
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    
    // Verification: No authenticated content is shown
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).not.toBeVisible();
  });

  test('3.3 Profile Icon Visible When Logged In', async ({ page }) => {
    // 1. Log in using valid credentials
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    await page.getByRole('textbox', { name: 'Email' }).fill('test-stud');
    await page.getByRole('textbox', { name: 'Password' }).fill('test-stud');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('https://sau-portal.de/', { timeout: 10000 });
    
    // 2. Examine page header
    const profileButton = page.locator('button').nth(1);
    
    // Verification: Profile icon is visible in header
    await expect(profileButton).toBeVisible();
    
    // Verification: Icon is clickable/interactive
    await expect(profileButton).toBeEnabled();
    
    // Verify it opens the profile menu
    await profileButton.click();
    await expect(page.getByRole('heading', { name: 'User Information' })).toBeVisible();
  });
});
