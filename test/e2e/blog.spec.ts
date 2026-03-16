import { test, expect } from '@playwright/test'

test.describe('Blog page', () => {
  test('blog section is reachable via anchor', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.goto('/#Blog')
    await page.waitForTimeout(500)

    const blogSection = page.locator('#Blog, section[id="Blog"]')
    await expect(blogSection).toBeAttached()
  })

  test('blog post page renders article content', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const postLinks = page.locator('a[href*="/blog/"]')
    const count = await postLinks.count()

    if (count > 0) {
      await postLinks.first().click()
      await page.waitForLoadState('networkidle')

      // Use main article — more specific than bare 'article' which matches cards too
      const article = page.locator('main article').first()
      await expect(article).toBeVisible()

      const heading = page.locator('h1')
      await expect(heading).toBeVisible()
    } else {
      test.skip(true, 'No blog posts found — API may not be available')
    }
  })

  test('back link returns to home from blog post', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const postLinks = page.locator('a[href*="/blog/"]')
    const count = await postLinks.count()

    if (count > 0) {
      await postLinks.first().click()
      await page.waitForLoadState('networkidle')

      const backLink = page.locator('.back-link')
      await expect(backLink).toBeVisible()
      await backLink.click()
      await page.waitForLoadState('networkidle')

      // App redirects / to /home
      await expect(page).toHaveURL(/\/(home)?$/)
    } else {
      test.skip(true, 'No blog posts found — API may not be available')
    }
  })
})
