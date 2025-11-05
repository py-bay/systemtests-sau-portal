// spec: specs/student-login-logout-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Initial Access and Redirect Behavior', () => {
  test('1.1 Unauthenticated User Redirected to Login', async ({ page }) => {
    // 1. Navigate to base URL `https://sau-portal.de`
    await page.goto('https://sau-portal.de');
    
    // Wait for redirect to complete
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // Verification: User is automatically redirected to login page
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Verification: Login form is displayed with username and password fields
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    
    // Verification: Page title indicates login/authentication page
    await expect(page).toHaveTitle('Sign in to SAU');
  });

  test('1.2 Login Page Loads Correctly', async ({ page }) => {
    // 1. Navigate to base URL (which redirects to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // Verification: Username input field is visible and enabled
    const emailField = page.getByRole('textbox', { name: 'Email' });
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEnabled();
    
    // Verification: Password input field is visible and enabled (type="password")
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toBeEnabled();
    
    // Verification: Submit button is visible and enabled
    const signInButton = page.getByRole('button', { name: 'Sign In' });
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toBeEnabled();
    
    // Verification: No error messages are displayed initially
    await expect(page.getByText('Invalid username or password.')).not.toBeVisible();
    
    // Verification: Form is ready for user input
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
  });
});
