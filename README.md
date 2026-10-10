# Rachel's Birthday Experience

A small static website with an interactive birthday adventure for Rachel and a separate, platonic thank-you page for Luna.

## Files
- `index.html` — Rachel's interactive birthday experience
- `luna.html` — Luna's separate thank-you note
- `style.css` — responsive styling and animations
- `script.js` — interactions, confetti, gift reveal, wish cards

## Preview locally
Open `index.html` in a browser. No build step is required. Google Fonts are loaded online; the page still works if fonts cannot load.

## Publish with GitHub Pages
1. Create a GitHub repository.
2. Upload these four files to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. When GitHub Pages publishes it, share the website URL. The Luna page will be at `https://YOUR-USERNAME.github.io/YOUR-REPO/luna.html`.

## Termux quick start
Unzip the package, then:
```sh
cd rachel_birthday_site
git init
git add .
git commit -m "Create interactive birthday experience"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```
Replace the GitHub username and repository name. Create the repository on GitHub first. If Git prompts for authentication, use GitHub's supported authentication flow or a personal access token rather than your account password.

## Personalize before publishing
Review the messages in `index.html` and `luna.html` and adjust them to match your voice. No personal photos or names beyond Rachel and Luna are embedded.
