const { test, expect } = require("@playwright/test")

test("should update address and map when query parameter is provided", async ({
  page,
}) => {
  // Set a timeout for the entire test
  page.setDefaultTimeout(5000)

  // Navigate with query parameter
  await page.goto("http://localhost:8002/?address=cowgirl%20santa%20fe")

  // Wait for the page to load
  await page.waitForLoadState("domcontentloaded")

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
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(2000)

  console.log("Console logs:", logs)
})

test("should work on deployed site", async ({ page }) => {
  // Set a timeout for the entire test
  page.setDefaultTimeout(5000)

  // Navigate to the deployed site with query parameter
  await page.goto(
    "https://brianfeister.github.io/temp-map-embed/?address=cowgirl%20santa%20fe"
  )

  // Wait for the page to load
  await page.waitForLoadState("domcontentloaded")

  // Wait a bit for JavaScript to execute
  await page.waitForTimeout(2000)

  // Check console logs for debugging
  const logs = []
  page.on("console", msg => {
    console.log(`[${msg.type()}] ${msg.text()}`)
    if (msg.type() === "log") {
      logs.push(msg.text())
    }
  })

  // Get the current URL to verify the parameter is there
  const currentUrl = page.url()
  console.log("Current URL:", currentUrl)

  // Check what the address display shows
  const addressDisplay = await page.locator("#address-display")
  const displayText = await addressDisplay.textContent()
  console.log("Address display text:", displayText)

  // Check the iframe src
  const iframe = await page.locator("#map-iframe")
  const iframeSrc = await iframe.getAttribute("src")
  console.log("Iframe src:", iframeSrc)

  // Wait a bit more and check again
  await page.waitForTimeout(1000)
  const displayText2 = await addressDisplay.textContent()
  console.log("Address display text after wait:", displayText2)

  // Check if the map script is actually running by looking for console logs
  console.log("All console logs:", logs)

  // If the script isn't running, the test should fail with a clear message
  if (!logs.some(log => log.includes("Map script"))) {
    throw new Error(
      "Map script is not executing - console logs: " + JSON.stringify(logs)
    )
  }

  // Check that the address display is updated
  await expect(addressDisplay).toHaveText("cowgirl santa fe")

  // Check that the iframe src is updated
  expect(iframeSrc).toContain("q=cowgirl%20santa%20fe")
})
