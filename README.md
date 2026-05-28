# ReBook

A MERN stack marketplace for second-hand books.

## Deploy On Render

This repo is configured for a 2-service Render deploy:
1. `oldbook-server` (Node web service from `Server/`)
2. `oldbook-client` (Static site from `Client/`)

### 1) Push code to GitHub
Render deploys from your Git repository, so make sure latest code is pushed.

### 2) Create Blueprint on Render
1. In Render dashboard, click `New +` -> `Blueprint`.
2. Select your repo.
3. Render will detect `render.yaml` and create both services.
### 3) Deploy order
1. Deploy `oldbook-server` first.
2. Deploy `oldbook-client`.
