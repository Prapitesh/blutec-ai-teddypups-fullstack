# TeddyPups — Blutec AI Full Stack Assignment

**Assignment deliverables (submitted 22 November 2026):**

- [Live deployed website](https://blutec-teddypups.onrender.com/)
- [Complete GitHub repository](https://github.com/Prapitesh/blutec-ai-teddypups-fullstack)
- [Public Loom technical walkthrough](https://www.loom.com/share/cc5085dbe7f244efb967059ae16940e7)

The walkthrough includes AI-use disclosure and an AI-generated voice narration. The original reference design and media belong to their respective owners, as explained in [NOTICE.md](NOTICE.md).

A responsive recreation of the public TeddyPups UAE website using **React 19 / Vite**, **Java 21 / Spring Boot 3.4**, and **PostgreSQL 18**.

**Reference:** https://puppy.instabizweb.com/

## Features

- Responsive home, available puppies, puppy detail, gone-home, happy families, how-it-works, FAQ, and contact pages
- 42 puppy profiles (15 available, 27 gone home), 64 family photos, FAQ accordion/search
- Breed, gender, text filtering and detailed profile navigation
- Full-screen, keyboard-accessible family image gallery
- Working contact/enquiry form backed by Spring REST API and database storage
- Java validation, simple spam honeypot, environment-based CORS config, API fallback for catalogue display
- Local public images: no reliance on the original site to serve puppy photographs
- Database seed at first startup; JPA persistence

## Open locally on Windows

Use **IntelliJ IDEA → Open → backend** for the Maven Java project.

Run once from PowerShell:

```powershell
cd C:\Users\user\projects\blutec-puppy-clone
.\setup-postgresql.ps1
```

Then run in **separate terminals**:

```powershell
.\start-backend.ps1
.\start-frontend.ps1
```

- Frontend: http://localhost:5173
- API: http://localhost:8080/api/puppies
- Example detail: http://localhost:5173/puppies/maltipoo-max-male

PostgreSQL uses an isolated local cluster on **127.0.0.1:55432**. Its randomly generated password is stored only in your Windows user profile under AppData/Local/BlutecPuppy/db-password.txt, not in source control. This avoids modifying either installed PostgreSQL service.

## Docker Compose (portable, 3 services)

When Docker Desktop is running, copy the repository-root `.env.example` to `.env`, replace its sample `POSTGRES_PASSWORD` with a strong random password, and run:

```powershell
docker compose up --build
```

Open http://localhost:5173. Nginx serves React and proxies `/api/` to Spring Boot, which uses the private PostgreSQL container. Docker Compose configuration was validated, but Docker Desktop's daemon was not active on the development computer, so image-build/execution testing remains to be done.

## Full-stack Render deployment (one public URL)

The repository-root `render.yaml` defines a **free Render web service** and a **free PostgreSQL database**. Render builds the React SPA and Spring Boot into one Docker image using `Dockerfile.render`, so the frontend and REST API share the same HTTPS domain without cross-origin configuration.

1. Go to Render Dashboard > New > Blueprint.
2. Select this GitHub repository and its `main` branch.
3. Review the two free resources (`blutec-teddypups` and `blutec-teddypups-db`) and deploy.
4. Use the public `https://blutec-teddypups.onrender.com/` address assigned by Render after a successful deployment.
5. Check the home page, puppy filters and POST /api/enquiries before submitting the assignment.

Render's free PostgreSQL has expiration/usage limitations; this is a technical-evaluation deployment, not a production datastore. No payment is required for the free plans unless you explicitly upgrade.

## Other environments / production

Frontend: `cd frontend && npm ci && npm run build`, deploy `frontend/dist` to a static host with SPA fallback to `/index.html`. Set `VITE_API_URL` to your HTTPS backend origin when building (not a secret).

Backend: `cd backend && mvn clean package`, deploy the generated executable jar to a Java host. Set `SPRING_PROFILES_ACTIVE=postgres`, `DATABASE_URL=jdbc:postgresql://HOST:5432/DATABASE`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `APP_ALLOWED_ORIGINS=https://your-frontend-domain`.

Use a managed PostgreSQL database for production. Never publish the local password file or internal database port.

## API

| Method | Route | Purpose |
|---|---|---|
| GET | /api/puppies | All puppies; optional status, breed, search query parameters |
| GET | /api/puppies/{slug} | Details for one puppy |
| POST | /api/enquiries | Validate and store enquiries |

Example POST:

```json
{"name":"Demo Visitor","phone":"+971501234567","email":"demo@example.com","area":"Downtown Dubai","puppySlug":"maltipoo-max-male","message":"I'd like to learn more.","website":""}
```

## Testing

```powershell
cd backend; mvn test
cd ../frontend; npm run build
```

## Limitations and transparency

This is an independent reconstruction for a technical evaluation, not the original private codebase. Page illustrations, precise motion animations and content updates may differ from the live reference. Static images and catalogue data are snapshots of publicly visible reference content. No access to the reference website's private backend, payments, CRM, or communications is claimed. The enquiry form stores a message in your application database; it does not email the real company.

### AI tools used

ChatGPT (GPT-6) helped analyze the public reference, create the project scaffold, implement React components, Spring Boot endpoints, PostgreSQL setup, styling and tests. See `LOOM_GUIDE.md` for the explanation and a log of major prompts. Be accurate about anything changed manually before submitting.

**Submission requirements:** Deploy URL + GitHub repo URL + Loom video URL. See the Blutec AI email for the exact subject line, recipients and deadline. Do not claim these links exist until you have created and verified them.
