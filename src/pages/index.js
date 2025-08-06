import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
  const googleApiKey = process.env.GATSBY_GOOGLE_API_KEY
  const defaultAddress = "New York, NY"
  
  // Get address from URL parameters
  const [address, setAddress] = React.useState(defaultAddress)
  const [iframeSrc, setIframeSrc] = React.useState("")
  
  React.useEffect(() => {
    // Get address from URL query parameter
    const urlParams = new URLSearchParams(window.location.search)
    const addressFromUrl = urlParams.get("address") || defaultAddress
    
    console.log("Address from URL:", addressFromUrl)
    setAddress(addressFromUrl)
    
    // Update iframe src
    if (googleApiKey && googleApiKey !== "YOUR_API_KEY_HERE") {
      const newSrc = `https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${encodeURIComponent(addressFromUrl)}`
      setIframeSrc(newSrc)
      console.log("Updated iframe src to:", newSrc)
    } else {
      console.log("API key not available or invalid")
    }
  }, [googleApiKey])

  return (
    <Layout>
      <section style={{ width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Map Page - <span id="address-display">{address}</span>
        </h1>
        <div
          id="embed-map"
          style={{
            width: "100%",
            height: "80vh",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <iframe
            id="map-iframe"
            src={iframeSrc || `https://www.google.com/maps/embed/v1/place?key=${
              googleApiKey || "YOUR_API_KEY_HERE"
            }&q=${encodeURIComponent(defaultAddress)}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Embed"
          />
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Google Maps Embed" />

export default IndexPage
