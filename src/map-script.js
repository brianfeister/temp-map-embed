// Map script to handle query parameters
;(function () {
  function updateMap() {
    try {
      console.log("Map script executing...")

      // Get address from URL query parameter
      const urlParams = new URLSearchParams(window.location.search)
      const address = urlParams.get("address") || "New York, NY"

      console.log("Address from URL:", address)

      // Update the display
      const addressDisplay = document.getElementById("address-display")
      if (addressDisplay) {
        addressDisplay.textContent = address
        console.log("Updated address display to:", address)
      } else {
        console.log("Address display element not found")
        return // Exit early if elements aren't ready
      }

      // Update the iframe src with the API key from the existing iframe
      const iframe = document.getElementById("map-iframe")
      if (iframe) {
        const currentSrc = iframe.src
        const apiKey = currentSrc.match(/key=([^&]+)/)?.[1] || ""
        console.log("API Key found:", apiKey ? "Yes" : "No")

        if (
          apiKey &&
          apiKey !== "undefined" &&
          apiKey !== "YOUR_API_KEY_HERE"
        ) {
          const newSrc =
            "https://www.google.com/maps/embed/v1/place?key=" +
            apiKey +
            "&q=" +
            encodeURIComponent(address)
          iframe.src = newSrc
          console.log("Updated iframe src to:", newSrc)
        } else {
          console.log("API key not available or invalid")
        }
      } else {
        console.log("Iframe not found")
        return // Exit early if elements aren't ready
      }
    } catch (error) {
      console.error("Error updating map:", error)
    }
  }

  // Run immediately
  console.log("Map script loaded, running updateMap...")
  updateMap()

  // Also run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateMap)
  }

  // Run after a delay to handle HMR scenarios
  setTimeout(updateMap, 1000)
  setTimeout(updateMap, 2000)

  // Listen for HMR updates
  if (module && module.hot) {
    module.hot.accept(() => {
      console.log("HMR update detected, re-running updateMap...")
      setTimeout(updateMap, 100)
    })
  }
})()
