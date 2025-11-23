# Deploying Vibe Pilot to Vercel

Vibe Pilot is a Vite + React application, which makes it perfect for deployment on [Vercel](https://vercel.com).

## Option 1: Deploy via Git (Recommended)

This is the easiest way and sets up automatic deployments whenever you push changes.

1.  **Push your code to GitHub/GitLab/Bitbucket.**
    *   Initialize git if you haven't: `git init`
    *   Commit your changes: `git add . && git commit -m "Initial commit"`
    *   Push to your repository.

2.  **Import Project in Vercel:**
    *   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **"Add New..."** -> **"Project"**.
    *   Select your repository.
    *   Vercel will automatically detect **Vite**.
    *   Click **"Deploy"**.

## Option 2: Deploy via CLI

If you want to deploy directly from your terminal without a Git repository:

1.  **Install Vercel CLI:**
    ```bash
    npm i -g vercel
    ```

2.  **Login:**
    ```bash
    vercel login
    ```

3.  **Deploy:**
    Run the following command in your project root:
    ```bash
    vercel
    ```
    *   Follow the prompts (mostly default "Yes").
    *   Vercel will build and deploy your site.

## Build Settings (Reference)

If you need to configure manually:
*   **Framework Preset:** Vite
*   **Build Command:** `npm run build`
*   **Output Directory:** `dist`
