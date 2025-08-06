import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
  const googleApiKey = process.env.GATSBY_GOOGLE_API_KEY
  const defaultAddress = "New York, NY"

  return (
    <Layout>
      <section style={{ width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Map Page - <span id="address-display">{defaultAddress}</span>
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
            src={`https://www.google.com/maps/embed/v1/place?key=${
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

      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            // Get address from URL query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const address = urlParams.get('address') || '${defaultAddress}';

            // Update the display
            const addressDisplay = document.getElementById('address-display');
            if (addressDisplay) {
              addressDisplay.textContent = address;
            }

            // Update the iframe src with the API key from the existing iframe
            const iframe = document.getElementById('map-iframe');
            if (iframe) {
              const currentSrc = iframe.src;
              const apiKey = currentSrc.match(/key=([^&]+)/)?.[1] || '';
              if (apiKey && apiKey !== 'undefined' && apiKey !== 'YOUR_API_KEY_HERE') {
                iframe.src = 'https://www.google.com/maps/embed/v1/place?key=' + apiKey + '&q=' + encodeURIComponent(address);
              }
            }
          })();
        `,
        }}
      />
    </Layout>
  )
}

export const Head = () => <Seo title="Google Maps Embed" />

export default IndexPage
