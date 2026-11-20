# Student Management REST API
 
A RESTful backend API built with Node.js, Express, TypeScript, and Supabase PostgreSQL for **ITE 303 — Web Systems and Technologies 2**.
 
## Endpoints
 
| Method | Endpoint | Description | Expected Success Status |
| --- | --- | --- | --- |
| `GET` | `/students` | Retrieve all student records | `200 OK` |
| `GET` | `/students/:id` | Retrieve one student by ID | `200 OK` |
| `POST` | `/students` | Create a new student record | `201 Created` |
| `PUT` | `/students/:id` | Replace all editable fields of a student | `200 OK` |
| `DELETE` | `/students/:id` | Delete a student record by ID | `200 OK` |
 
## Local Setup
 
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy `.env.example` to `.env` and fill in your private Supabase Session pooler `DATABASE_URL`.
3. Run in development mode:
   ```bash
   pnpm dev
   ```
4. Build and run for production:
   ```bash
   pnpm build
   pnpm start
   ```