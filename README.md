# Prakash Joshi — 3D Portfolio

A responsive personal portfolio with a Three.js interactive 3D hero, animated section reveals, project cards, and a mobile navigation menu.

## Run locally
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Start a local server (recommended): install the VS Code **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.
4. Or run `python -m http.server 8000` in the project folder and visit http://localhost:8000.

The Three.js and GSAP libraries/fonts are loaded from CDNs, so an internet connection is required for the 3D scene and web fonts. The site has a graceful visual fallback if WebGL is unavailable.

## Personalize before publishing
- In `index.html`, replace `your.email@example.com` with your real email address (both the `mailto:` link and `data-email` attribute).
- Add your real GitHub, LinkedIn, and other profile links.
- Verify the project descriptions, technologies, and status. Add repository/demo links only for projects that are actually published.
- Update the About and Journey sections with your exact education and experience details.
- Your supplied photograph is stored at `assets/profile.jpg`.

## Deploy on Vercel
1. Create a GitHub repository and upload the contents of this folder (keep `index.html` at the repository root).
2. Sign in to Vercel using GitHub and choose **Add New → Project**.
3. Import the portfolio repository.
4. Framework preset: **Other**. Build command: leave blank. Output directory: `.` (or leave default if detected as static).
5. Click **Deploy**. Vercel will provide a public URL.
6. For later changes, commit and push to GitHub; Vercel automatically redeploys.

## Deploy with Netlify (alternative)
Drag the extracted project folder into Netlify's manual deploy area, or connect the GitHub repository. No build command is needed.

## Notes
This is a static frontend portfolio. It does not include a backend, database, real contact-form delivery, analytics, or a CV file. The email button opens the visitor's email app. The copy-email button works after you replace the placeholder address. Do not publish private contact details unless you want them public.
