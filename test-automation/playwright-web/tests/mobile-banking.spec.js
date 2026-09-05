const { test, expect, devices } = require('@playwright/test');

// Gunakan konfigurasi Emulasi Peranti Mudah Alih (Pixel 5)
test.use({ ...devices['Pixel 5'] });

test.describe('AeroBank Mobile Banking E2E Test Suite', () => {

    test('TC001: Should login via mobile PIN, perform DuitNow transfer, and verify receipt', async ({ page }) => {
        // 1. Navigasi ke URL Mobile App Live Kau
        await page.goto('https://hazique96.github.io/mobile-banking-app/', { waitUntil: 'networkidle' });

        // 2. Semak Paparan Skrin Login / PIN
        const loginBtn = page.locator('[data-testid="btn-login"], [data-testid="btn-submit-login"]').first();
        await expect(loginBtn).toBeVisible({ timeout: 10000 });

        // Fill Login Credentials / PIN
        const usernameInput = page.locator('[data-testid="input-username"], [data-testid="input-pin"]').first();
        if (await usernameInput.isVisible()) {
            await usernameInput.fill('123456');
        }
        await loginBtn.click();

        // 3. Verify Dashboard Mobile & Account Balance
        const balanceDisplay = page.locator('[data-testid="text-balance"], [data-testid="account-balance"]').first();
        await expect(balanceDisplay).toBeVisible({ timeout: 10000 });

        // 4. Trigger DuitNow Transfer Flow
        const transferBtn = page.locator('[data-testid="btn-transfer"], [data-testid="btn-duitnow"]').first();
        if (await transferBtn.isVisible()) {
            await transferBtn.click();
        }

        // Fill Recipient & Amount
        const recipientInput = page.locator('[data-testid="input-recipient"]');
        if (await recipientInput.isVisible()) {
            await recipientInput.fill('109988776655');
            await page.fill('[data-testid="input-amount"]', '250.00');
            await page.click('[data-testid="btn-confirm-transfer"], [data-testid="btn-pay"]');
        }

        // 5. Verify OTP / Loading Delay & Digital Receipt
        const receiptStatus = page.locator('[data-testid="receipt-status"], [data-testid="receipt-title"]').first();
        await expect(receiptStatus).toBeVisible({ timeout: 10000 });
    });

});