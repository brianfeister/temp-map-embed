# Map Embed

A simple GitHub Pages project that embeds Google Maps with address support.

## Features

- Google Maps embed with address parameter support
- Clean, responsive design
- GitHub Actions build process that injects API keys

## Setup

1. **Fork or clone this repository**

2. **Add your Google Maps API key to GitHub Secrets:**
   - Go to your repository settings
   - Navigate to "Secrets and variables" → "Actions"
   - Add a new repository secret named `GOOGLE_API_KEY`
   - Set the value to your Google Maps API key

3. **Enable GitHub Pages:**
   - Go to repository settings
   - Navigate to "Pages"
   - Set source to "Deploy from a branch"
   - Select the `gh-pages` branch
   - Save

## Usage

The page accepts an `address` parameter in the URL:

```
https://your-username.github.io/your-repo/?address=123 Main St, New York, NY
```

If no address is provided, it defaults to "New York, NY".

## How it works

1. The GitHub Actions workflow runs on every push to main
2. It creates a `.env.local` file with your API key from GitHub Secrets
3. The build step replaces `GOOGLE_API_KEY_PLACEHOLDER` in `index.html` with your actual API key
4. The processed `index.html` is deployed to the `gh-pages` branch

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your API key:**
   - Edit `.env.local` and replace `your_google_maps_api_key_here` with your actual Google Maps API key

3. **Start the local server:**
   ```bash
   npm run dev
   ```

4. **Visit `http://localhost:8002`** in your browser

The local server will automatically load your API key from `.env.local` and inject it into the HTML before serving.

## Files

- `index.html` - The main page with embedded map
- `server.js` - Local development server
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `package.json` - Project configuration
- `.env.local` - Local environment variables (create this file with your API key)
