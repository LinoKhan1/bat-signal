# BatSignal PMS

## Project Description
BatSignal PMS is a modern web application for Panic Management Systems. The system allows authenticated users to raise panic alerts, view panic history, and cancel ongoing panics. The app is built with **Next.js**, **React**, **NextAuth.js**, and **Tailwind CSS** for a responsive and user-friendly interface.

The application features a secure authentication flow, a panic dashboard with forms and history, and a modular architecture to easily extend functionality.

---

## Table of Contents
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Setup Instructions](#setup-instructions)
- [Deploy on Vercel](#deploy-on-vercel)
- [Technology Choices](#technology-choices)
- [Security] (#security considerations)
- [License](#license)

---

## Features
- **User Authentication**
  - Login and logout functionality
  - JWT-based authentication using NextAuth.js
- **Panic Management**
  - Raise a panic with location, type, and details
  - Cancel an active panic
  - View panic history with status filters
- **Responsive Dashboard**
  - Panic form and panic history components
  - Mobile-first design
  - Dynamic layout adjustments based on screen size
- **Error Handling**
  - Client-side form validation
  - API request error handling with user feedback

---
## Technology Choices

- **Next.js 15** – Framework for React apps with Server Components and API routes
- **React.js** – Frontend library for building UI components
- **NextAuth.js** – Authentication and session management
- **Tailwind CSS** – Utility-first CSS for styling
- **Axios** – HTTP client for API requests
- **TypeScript** – Type safety and improved developer experience
- **Vercel** - Deployment ease with Next.js

## Project Architecture

The project follows a modular and feature-driven architecture using Next.js 13 with the App Router. The src folder organizes the code into logical layers: app contains the main pages, layouts, and API routes (/api/auth for authentication and /api/panic for panic-related endpoints). The features directory isolates domain-specific logic, with subfolders like auth and panic containing components, services, hooks, and types. Common utilities such as apiClient and authOptions reside under features/common/utils. The providers folder includes the NextAuth session provider for authentication context. This structure promotes separation of concerns, reusability, and scalability, making it easy to maintain and extend features while keeping the UI, API logic, and services clearly organized.

```sh
src/
├─ app/
│ ├─ api/
│ │ ├─ auth/
│ │ │ └─ [...nextauth]/route.ts
│ │ ├─ panic/
│ │ │ ├─ send/route.ts
│ │ │ ├─ cancel/route.ts
│ │ │ └─ history/route.ts
│ ├─ page.tsx
│ ├─ layout.tsx
│ ├─ global.css
│ └─ components/
│ ├─ Header.tsx
│ └─ PanicDashboard.tsx
├─ features/
│ ├─ auth/
│ │ ├─ components/LoginForm.tsx
│ │ ├─ services/authService.ts
│ │ ├─ hooks/useAuth.ts
│ │ └─ types.ts
│ ├─ common/utils/apiClient.ts
│ ├─ common/utils/authOptions.ts
│ └─ panic/
│ ├─ components/PanicCard.tsx, PanicForm.tsx, PanicHistoryList.tsx
│ ├─ services/panicService.ts
│ └─ types.ts
├─ providers/Providers.tsx
```


---

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bat-signal.git
cd bat-signal
```
2. **Install Dependencies**
```sh
npm install
```
3. **Environment Variables**
```sh
NEXT_PUBLIC_API_BASE_URL="https://batman-assessment.fusebox-prod.co.za/api/v1"
NEXT_AUTH_SECRET=ADD SECRET KEY

```

4. **Run Development Server**
```sh
npm run dev
```

## Deploy on Vercel
The project is already deployed on Vercel and is publicly accessible at:

[https://bat-signal-one.vercel.app]

Vercel automatically handles builds and deployments for each push to the main branch, ensuring the live version is always up-to-date.

## Security
This project implements token-based authentication using NextAuth with JWT, meeting the assessment's requirement for enterprise-grade security. The current setup uses a Bearer token retrieved from the /login endpoint, stored securely in the session, and validated via middleware for all protected routes. While the base implementation is sufficient for the proof-of-concept scope, the following enhancements could be considered based on future security requirements:

- **Shorten JWT Expiration with Refresh:** Configure a shorter JWT lifespan (e.g., 15 minutes) with a manual refresh mechanism to reduce token exposure, prompting re-authentication when nearing expiry.
- **Client-Side Token Blacklist:** Add a local blacklist to revoke compromised tokens on the client side, forcing re-login if a token is flagged.
- **Enhanced Input Validation:** Implement sanitization and stricter validation for login credentials and panic details to prevent injection attacks.
- **Secure Cookie Configuration:** Enforce HTTPS and use HttpOnly, Secure, and SameSite=Strict cookies to protect against XSS and CSRF.
- **Authentication Event Logging:** Introduce client-side logging of login attempts and actions for basic auditability, enhancing traceability.

These enhancements are optional and can be prioritized based on specific security needs or deployment context beyond the current assessment.
## License

This project is licensed under the MIT License. See the LICENSE file for details.


