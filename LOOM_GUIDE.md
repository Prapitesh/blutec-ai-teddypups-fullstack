# Loom presentation script — Blutec AI full-stack assignment

**Assignment:** Recreate https://puppy.instabizweb.com/ using React, Java Spring Boot and PostgreSQL.

## Suggested recording structure (about 5–8 minutes)

1. Open the live website (once deployed). Show the homepage, puppy catalogue, filters, detail profiles and gallery. Use mobile responsive mode.
2. Show how FAQs expand, photo lightbox opens, contact enquiry is validated and successfully saved by the backend.
3. Open IntelliJ IDEA and explain `backend/src/main/java/ai/blutec/puppies/`: `model`, `repo`, `controller`, `config`; discuss JPA and the PostgreSQL seed.
4. Open React in `frontend/src/App.jsx`, `styles.css`, `reference.css`, `src/data/`; explain React Router, state management, filters and form submission.
5. Show the local or hosted REST endpoint `/api/puppies`; explain the HTTP POST to `/api/enquiries`.
6. Demonstrate `mvn test`, `npm run build`, optional Playwright browser test, and Docker Compose configuration.
7. Show the GitHub repository and explain deployment steps, challenges, and what changed during visual comparison to the source.

## AI tools and *exact* prompt disclosure

AI assistant: ChatGPT, GPT-6.

The initiating user request was:

> "Technical Round Assignment – Full Stack Developer – Blutec AI
> complete this project using java full stack reactjs springboot postgresql
> i opened intellij start the work"

ChatGPT was also instructed to read the email and implement the referenced website using the connected Desktop Commander. The tool-assisted workflow involved extracting public page structure/assets; implementing React/Spring Boot/PostgreSQL; comparing browser screenshots; fixing visual differences; writing and running tests.

**Do not describe the paraphrased implementation steps as additional exact user prompts.** If further AI prompts are given during revisions, copy their literal wording into this log before recording Loom.

## Architectural decisions

- React 19 + Vite: responsive components, route navigation, client-side state and lightweight bundle.
- Java 21 + Spring Boot: REST controller routes, Jakarta validation, database persistence via JPA.
- PostgreSQL 18: catalogue and persistent enquiries. Local dev uses a dedicated, password-protected cluster on localhost port 55432.
- Local media snapshots: reference screenshots are not copied into the app; publicly visible puppy images and the small mascot were saved as static assets for evaluation.
- Docker Compose: reproducible frontend + backend + PostgreSQL stack with environment-based credentials.
- Security limitations: no real customer account system, rate limiting, payment integration or production mail delivery was part of the reference features replicated.

## Final checklist

Confirm live frontend, functioning hosted API and PostgreSQL, public GitHub repository, and shareable Loom URL. Verify in an incognito browser; submit all three URLs to both recipients in the exact subject format from the assignment email. Do not claim completion of these delivery steps before checking them.
