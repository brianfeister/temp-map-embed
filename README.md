# Google Maps Embed

A simple Google Maps embed page built with Gatsby and deployed to GitHub Pages.

## Features

- Simple Google Maps embed using the Google Maps Embed API
- Environment variable support for API key
- GitHub Pages deployment via GitHub Actions
- No external CSS frameworks - pure HTML/CSS

## Setup

1. Clone this repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your Google Maps API key:

   - Get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the "Maps Embed API"
   - Add the API key as a GitHub secret named `GOOGLE_API_KEY`

4. Update the site URL in `gatsby-config.js` to match your GitHub Pages URL

## Development

```bash
npm run develop
```

## Testing

The project includes Playwright tests to verify the query parameter functionality:

```bash
# Run tests with local environment variables
npm run test:e2e:local

# Run tests with UI (for debugging)
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug
```

**Note**: The `test:e2e:local` command uses your `.env.local` file to load the Google Maps API key securely.

## Deployment

The app automatically deploys to GitHub Pages when you push to the main branch. The deployment workflow:

1. Builds the Gatsby site
2. Uses the `GATSBY_GOOGLE_API_KEY` environment variable from GitHub secrets
3. Deploys to GitHub Pages

## Configuration

- Change the default address in `src/pages/index.js`
- Update the site metadata in `gatsby-config.js`
- Modify the map styling in the component

## Environment Variables

- `GATSBY_GOOGLE_API_KEY`: Your Google Maps API key (required)
