const { test, expect } = require("@playwright/test")

test("should update address and map when query parameter is provided", async ({
  page,
}) => {
  // Navigate with query parameter
  await page.goto("http://localhost:8002/?address=cowgirl%20santa%20fe")

  // Wait for the page to load
  await page.waitForLoadState("domcontentloaded")

  // Wait a bit for JavaScript to execute
  await page.waitForTimeout(3000)

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
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(3000)

  console.log("Console logs:", logs)
})
