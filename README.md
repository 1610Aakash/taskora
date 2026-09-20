# Taskora

Taskora is a full-stack Project & Task Management application built for teams with two roles — **Admin** and **User**. Admins create users, projects, and tasks, and assign work to team members. Users log in to see the projects they're part of and manage the status of tasks assigned to them.

## Overview

Taskora solves a simple problem: an admin needs to hand out work, and a team needs a clean place to see what's theirs and update it — without extra tools, spreadsheets, or noise.

- **Admins** create and manage users, projects, and tasks, and assign each task to a specific user.
- **Users** see only the projects and tasks assigned to them, and move their own tasks through a fixed workflow: `To Do → In Progress → Completed`.
- Users can never see or touch another user's tasks, and only see projects they've actually been assigned work on.

---

## Features

### Admin
- Secure login with role-based access
- Create, view, and edit users; activate or deactivate accounts
- Create, view, edit, and delete projects
- Create, view, edit, and delete tasks — assign any task to any user, set priority, due date, and status
- Dashboard with workspace-wide stats: total/active users, total projects, total/completed/overdue tasks
- Role-scoped notifications (e.g. new user registered, task overdue, project completed)

### User
- Secure login, restricted to user-only screens
- Dashboard with a personal welcome view, recent projects, and recent tasks
- View only the projects they've been assigned work on
- View all tasks inside a project they belong to
- "My Tasks" view scoped to tasks assigned to them
- Update their own task status through a guided, sequential flow (can't skip or reverse steps)
- Role-scoped notifications (e.g. new task assigned, task due soon)

### Shared
- Landing page, login, forgot password, reset password, email verification, account setup
- Profile view and edit, change password
- Fully responsive, dark-themed UI

---

## Tech Stack

| Layer          | Technology                                  |
|----------------|----------------------------------------------|
| Framework      | [Next.js](https://nextjs.org/) (App Router)  |
| UI             | React, [Tailwind CSS](https://tailwindcss.com/) |
| Icons          | [Lucide React](https://lucide.dev/)          |
| Animation      | [Framer Motion](https://www.framer.com/motion/) |
| Database       | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) |
| Authentication | JWT, stored in an httpOnly cookie            |
| Password hashing | bcrypt.js                                  |

---

## Architecture

The frontend follows an **MVVM (Model–View–ViewModel)** pattern per screen, kept separate from Next.js's routing layer:

```
app/                        → routing only (thin page.jsx files, route groups, layouts)
src/
├── screens/                → one folder per screen, organized by admin / user / auth / shared
│   └── <Screen>/
│       ├── <Screen>.model.js       → API calls
│       ├── <Screen>.viewmodel.js   → state, validation, business logic (custom hook)
│       ├── <Screen>.view.jsx       → UI, composed from components/
│       └── components/             → UI pieces used only by this screen
├── components/
│   ├── ui/                 → shared primitives (Input, Select, Button, etc.)
│   ├── layout/              → Navbar, AdminShell, UserShell, SectionLayout
│   └── common/               → StatusBadge, PriorityTag, NotificationIcon
├── context/                 → AuthContext (current user, session)
├── lib/
│   ├── api/                  → fetch client for the backend
│   ├── auth/                  → JWT signing/verification, auth guard for API routes
│   ├── db/                     → MongoDB connection (cached, serverless-safe)
│   ├── constants/               → status/priority enums, dropdown options
│   └── utils/                    → response helpers, data normalizers
└── models/                   → Mongoose schemas (User, Project, Task, Notification)
```

Routing (`app/`) never contains business logic — each `page.jsx` just renders the matching screen's `View`. This keeps routes, UI, state, and API calls independently testable and easy to navigate.

### Backend

The backend lives inside the same Next.js project as [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) under `app/api/`, rather than a separate server — no CORS setup, one deploy target, shared types and constants between frontend and backend.

```
app/api/
├── auth/          → signup, login, logout, me, forgot/reset password, email verification
├── users/          → list/create, get/update by id (admin only)
├── projects/         → list/create, get/update/delete by id (scoped by role)
├── tasks/              → list/create, get/update/delete by id (scoped by role)
├── notifications/        → list, mark one/all as read
├── profile/                → get/update own profile, change password
└── admin/dashboard/          → aggregated stats for the admin dashboard
```

Every protected route is guarded by `requireAuth(allowedRoles)`, which verifies the JWT from the httpOnly cookie and checks the user's role before the handler runs. Route-level middleware (`middleware.js`) additionally protects entire route groups (`/admin/*`, `/user/*`) at the edge, redirecting unauthenticated or wrong-role requests before they ever reach a page.

---

## Task Workflow

Tasks follow a fixed, one-directional status flow:

```
To Do → In Progress → Completed
```

- **Admins** can set a task's status to any value directly.
- **Users** can only advance their own assigned task one step forward at a time — enforced both in the UI and on the server, so the rule can't be bypassed by calling the API directly.
- Project membership for a user is derived from task assignment: a user only sees a project once the admin has assigned them at least one task inside it.

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
git clone https://github.com/<your-username>/taskora.git
cd taskora
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=a-long-random-secret-string
JWT_EXPIRES_IN=7d
SEED_SECRET=a-temporary-secret-only-you-know
NODE_ENV=development
```

### Run the dev server

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Create the admin account

Taskora has exactly one admin, created once via a protected seed endpoint (not through the public sign-up flow):

```bash
curl -X POST http://localhost:3000/api/auth/seed-admin \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-seed-secret","fullName":"Admin Name","email":"admin@taskora.com","password":"YourStrongPassword123"}'
```

This endpoint refuses to run again once an admin already exists.

---

## Roadmap

- [ ] Email delivery for verification links, password resets, and temp passwords (currently logged to the server console)
- [ ] Avatar upload with cloud storage (Cloudinary/S3)
- [ ] Explicit project membership (so users can be added to a project before any task exists)
- [ ] Task comments and activity history
- [ ] Deployment guide (Vercel + MongoDB Atlas)

---

## License

This project is open source and available under the [MIT License](LICENSE).
