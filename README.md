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

### 3) Set environment variables
Set these on Render:

Server (`oldbook-server`):
- `CLIENT_URL` = `https://<your-client-domain>`
- `MONGODB_URI` = your MongoDB Atlas URI
- `JWT_SECRET` = strong secret string
- `CLOUDINARY_CLOUD_NAME` = your cloudinary cloud name
- `CLOUDINARY_API_KEY` = your cloudinary api key
- `CLOUDINARY_API_SECRET` = your cloudinary api secret

Client (`oldbook-client`):
- `VITE_API_BASE_URL` = `https://<your-server-domain>`

### 4) Redeploy order
1. Deploy `oldbook-server` first.
2. Copy its live URL.
3. Put that URL in `oldbook-client` as `VITE_API_BASE_URL`.
4. Deploy `oldbook-client`.
5. Copy client URL and set it in server as `CLIENT_URL`, then redeploy server once.
