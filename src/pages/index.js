import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
  const googleApiKey = process.env.GATSBY_GOOGLE_API_KEY
  const address = "New York, NY" // Default address, can be made configurable

  return (
    <Layout>
      <section style={{ width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Map Page - {address}
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
            src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${encodeURIComponent(
              address
            )}`}
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
