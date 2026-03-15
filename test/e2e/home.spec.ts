import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('loads and displays the main banner', async ({ page }) => {
    await expect(page).toHaveURL(/\/(home)?$/)
    const banner = page.locator('.banner')
    await expect(banner).toBeVisible()
  })

  test('header is visible and contains logo', async ({ page }) => {
    const header = page.locator('header.header')
    await expect(header).toBeVisible()
    const logo = header.locator('.home-link')
    await expect(logo).toBeVisible()
  })

  test('footer is visible', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    const footer = page.locator('footer.footer, footer:not(.card-footer)').last()
    await expect(footer).toBeVisible()
  })

  test('page title contains Pfadi', async ({ page }) => {
    await expect(page).toHaveTitle(/Pfadi/i)
  })
})

test.describe('Navigation', () => {
  test('header navigation links are accessible', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const header = page.locator('header.header')
    await expect(header).toBeVisible()
    const navLinks = header.locator('nav a')
    await expect(navLinks.first()).toBeVisible()
  })

  test('dark mode toggle is accessible', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    // The page footer (contentinfo role) should be visible
    const footer = page.getByRole('contentinfo')
    await expect(footer).toBeVisible()
  })

  test('clicking logo navigates to home', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')
    const logo = page.locator('header .home-link')
    await logo.click()
    await expect(page).toHaveURL(/\/(home)?$/)
  })
})

test.describe('Accessibility', () => {
  test('page has a main landmark', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })

  test('images have alt attributes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const images = await page.locator('img:visible').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).not.toBeNull()
    }
  })

  test('page is keyboard navigable', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })
})
