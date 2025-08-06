const { test, expect } = require("@playwright/test")

test.describe("Map Embed Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the map page
    await page.goto("http://localhost:8002/")
  })

  test("should show default address when no query parameter", async ({
    page,
  }) => {
    // Wait for the page to load
    await page.waitForLoadState("networkidle")

    // Check that the default address is displayed
    const addressDisplay = await page.locator("#address-display")
    await expect(addressDisplay).toHaveText("New York, NY")

    // Check that the iframe is present
    const iframe = await page.locator("#map-iframe")
    await expect(iframe).toBeVisible()

    // Check that the iframe src contains the default address
    const iframeSrc = await iframe.getAttribute("src")
    expect(iframeSrc).toContain("q=New%20York%2C%20NY")
  })

  test("should update address and map when query parameter is provided", async ({
    page,
  }) => {
    // Navigate with query parameter
    await page.goto("http://localhost:8002/?address=cowgirl%20santa%20fe")

    // Wait for the page to load
    await page.waitForLoadState("networkidle")

    // Wait a bit for JavaScript to execute
    await page.waitForTimeout(2000)

    // Check that the address display is updated
    const addressDisplay = await page.locator("#address-display")
    await expect(addressDisplay).toHaveText("cowgirl santa fe")

    // Check that the iframe src is updated
    const iframe = await page.locator("#map-iframe")
    const iframeSrc = await iframe.getAttribute("src")
    expect(iframeSrc).toContain("q=cowgirl%20santa%20fe")

    // Check console logs for debugging
    const logs = []
    page.on("console", msg => {
      if (msg.type() === "log") {
        logs.push(msg.text())
      }
    })

    // Reload to capture logs
    await page.reload()
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    console.log("Console logs:", logs)
  })

  test("should handle URL encoded addresses", async ({ page }) => {
    // Navigate with URL encoded address
    await page.goto("http://localhost:8002/?address=San%20Francisco%2C%20CA")

    // Wait for the page to load
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    // Check that the address display is updated
    const addressDisplay = await page.locator("#address-display")
    await expect(addressDisplay).toHaveText("San Francisco, CA")

    // Check that the iframe src is updated
    const iframe = await page.locator("#map-iframe")
    const iframeSrc = await iframe.getAttribute("src")
    expect(iframeSrc).toContain("q=San%20Francisco%2C%20CA")
  })

  test("should handle special characters in address", async ({ page }) => {
    // Navigate with special characters
    await page.goto("http://localhost:8002/?address=Tokyo%2C%20Japan")

    // Wait for the page to load
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    // Check that the address display is updated
    const addressDisplay = await page.locator("#address-display")
    await expect(addressDisplay).toHaveText("Tokyo, Japan")

    // Check that the iframe src is updated
    const iframe = await page.locator("#map-iframe")
    const iframeSrc = await iframe.getAttribute("src")
    expect(iframeSrc).toContain("q=Tokyo%2C%20Japan")
  })
})
