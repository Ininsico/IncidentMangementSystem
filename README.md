# RABTA — Incident Management System

<div align="center">

![RABTA Logo](mobileapp/assets/logo.png)

**A modern, cross-platform incident management solution built with Flutter, Node.js, and MongoDB**

[![Flutter](https://img.shields.io/badge/Flutter-3.11-blue?logo=flutter)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.11-blue?logo=dart)](https://dart.dev)
[![Node.js](https://img.shields.io/badge/Node.js-24.8-green?logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.12-green?logo=mongodb)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

**Developed for the Mobile Application Course (6th Semester)**  
COMSATS University Islamabad, Abbottabad Campus

</div>

---

## Table of Contents

1. [Project Overview & Vision](#1-project-overview--vision)
2. [Problem Statement](#2-problem-statement)
3. [Solution Architecture](#3-solution-architecture)
   - 3.1 [High-Level Architecture](#31-high-level-architecture)
   - 3.2 [System Design](#32-system-design)
   - 3.3 [Technology Choices](#33-technology-choices)
   - 3.4 [Why These Technologies](#34-why-these-technologies)
4. [Features](#4-features)
   - 4.1 [Authentication System](#41-authentication-system)
   - 4.2 [Email Verification](#42-email-verification)
   - 4.3 [Dashboard](#43-dashboard)
   - 4.4 [User Profile](#44-user-profile)
   - 4.5 [Incident Management (Planned)](#45-incident-management-planned)
5. [Tech Stack Deep Dive](#5-tech-stack-deep-dive)
   - 5.1 [Frontend: Flutter & Dart](#51-frontend-flutter--dart)
   - 5.2 [Backend: Node.js & Express](#52-backend-nodejs--express)
   - 5.3 [Database: MongoDB & Mongoose](#53-database-mongodb--mongoose)
   - 5.4 [Email Service: Nodemailer & Brevo](#54-email-service-nodemailer--brevo)
   - 5.5 [Authentication: JWT & Bcrypt](#55-authentication-jwt--bcrypt)
6. [Project Structure](#6-project-structure)
   - 6.1 [Complete File Tree](#61-complete-file-tree)
   - 6.2 [Flutter App Structure](#62-flutter-app-structure)
   - 6.3 [Server Structure](#63-server-structure)
7. [Backend API Documentation](#7-backend-api-documentation)
   - 7.1 [Base URL](#71-base-url)
   - 7.2 [Authentication Endpoints](#72-authentication-endpoints)
   - 7.3 [User Endpoints](#73-user-endpoints)
   - 7.4 [Health Check](#74-health-check)
   - 7.5 [Error Codes](#75-error-codes)
   - 7.6 [Full API Reference](#76-full-api-reference)
8. [Database Schema](#8-database-schema)
   - 8.1 [Users Collection](#81-users-collection)
   - 8.2 [Verification Codes Collection](#82-verification-codes-collection)
   - 8.3 [Incidents Collection (Planned)](#83-incidents-collection-planned)
9. [UI/UX Design System](#9-uiux-design-system)
   - 9.1 [Design Philosophy](#91-design-philosophy)
   - 9.2 [Color Palette](#92-color-palette)
   - 9.3 [Typography](#93-typography)
   - 9.4 [Component Design](#94-component-design)
   - 9.5 [Screen Specifications](#95-screen-specifications)
   - 9.6 [Animation & Motion](#96-animation--motion)
10. [Security Model](#10-security-model)
    - 10.1 [Authentication Flow](#101-authentication-flow)
    - 10.2 [Password Security](#102-password-security)
    - 10.3 [Token Management](#103-token-management)
    - 10.4 [Email Verification](#104-email-verification)
    - 10.5 [API Security](#105-api-security)
    - 10.6 [Data Protection](#106-data-protection)
11. [Installation & Setup](#11-installation--setup)
    - 11.1 [Prerequisites](#111-prerequisites)
    - 11.2 [Environment Variables](#112-environment-variables)
    - 11.3 [Running the Server](#113-running-the-server)
    - 11.4 [Running the Flutter App](#114-running-the-flutter-app)
    - 11.5 [Running on Different Platforms](#115-running-on-different-platforms)
12. [Development Guide](#12-development-guide)
    - 12.1 [Code Style & Conventions](#121-code-style--conventions)
    - 12.2 [Git Workflow](#122-git-workflow)
    - 12.3 [Testing](#123-testing)
    - 12.4 [Adding New Features](#124-adding-new-features)
13. [Deployment](#13-deployment)
    - 13.1 [Android APK Build](#131-android-apk-build)
    - 13.2 [iOS Build](#132-ios-build)
    - 13.3 [Web Deployment](#133-web-deployment)
    - 13.4 [Server Deployment](#134-server-deployment)
14. [Future Roadmap](#14-future-roadmap)
    - 14.1 [Phase 2: Incident CRUD](#141-phase-2-incident-crud)
    - 14.2 [Phase 3: Real-Time Updates](#142-phase-3-real-time-updates)
    - 14.3 [Phase 4: Advanced Features](#143-phase-4-advanced-features)
15. [Contributing](#15-contributing)
16. [License](#16-license)
17. [Acknowledgments](#17-acknowledgments)

---

## 1. Project Overview & Vision

### 1.1 What is RABTA?

RABTA (ربطہ — meaning "connection" or "link" in Urdu) is a modern, cross-platform incident management system designed to streamline the process of reporting, tracking, and resolving organizational incidents. Whether it's a network outage, a hardware failure, a security breach, or a facility issue, RABTA provides a centralized platform for teams to collaborate on incident resolution.

### 1.2 Vision

The vision behind RABTA is to create a **beautiful, intuitive, and powerful** incident management tool that doesn't sacrifice user experience for functionality. Traditional incident management systems are often:
- **Ugly and cluttered** with dense tables and overwhelming interfaces
- **Complex to set up** requiring extensive server infrastructure
- **Expensive** with per-user licensing models
- **Slow** with heavy page loads and unnecessary animations

RABTA challenges this by offering:
- **A premium, modern UI** with thoughtful typography (Sora + DM Sans), a refined color palette, and smooth animations
- **Simple architecture** with just a Node.js server + MongoDB backend
- **Free and open-source** with no licensing costs
- **Lightning-fast** native performance with Flutter

### 1.3 Target Users

RABTA is designed for:
- **IT Teams** managing infrastructure incidents
- **Facility Management** tracking maintenance issues
- **Customer Support** logging and escalating tickets
- **Small to Medium Enterprises** needing a lightweight incident tracking solution
- **Educational Institutions** for campus-wide issue reporting

### 1.4 Core Principles

1. **Clarity Over Complexity** — Every screen, every interaction should be immediately understandable
2. **Speed** — The app should feel instant. No unnecessary loading states, no bloated pages
3. **Security First** — Proper authentication, email verification, and data protection from day one
4. **Beautiful by Default** — A great UX shouldn't require customization. The defaults should be stunning
5. **Progressive Enhancement** — Start with core features done perfectly, then expand

---

## 2. Problem Statement

### 2.1 The Problem

Organizations face numerous incidents daily that need to be tracked, assigned, and resolved. Without a proper system, these incidents:
- Get lost in email threads and chat messages
- Have no accountability or ownership
- Cannot be prioritized effectively
- Lack historical data for analysis
- Result in duplicated effort and delayed resolutions

### 2.2 Existing Solutions

| Solution | Pros | Cons |
|----------|------|------|
| Jira Service Management | Powerful, widely adopted | Expensive, complex, slow UI |
| Zendesk | Good UX, mature product | Per-agent pricing, cloud-only |
| OTRS | Open-source, feature-rich | Ugly interface, complex setup |
| Freshservice | Modern, AI features | Expensive for small teams |
| Spreadsheets | Free, everyone has it | No automation, no tracking, no reports |

### 2.3 The Gap

There is no modern, beautiful, lightweight, open-source incident management system that:
- Runs on mobile (iOS + Android) natively
- Has a premium, thoughtful UI out of the box
- Is simple to deploy (just a Node.js server + MongoDB)
- Is completely free and self-hosted

RABTA fills this gap.

### 2.4 The Solution

RABTA provides:
- **A Flutter mobile app** that runs on both iOS and Android with a single codebase
- **A Node.js REST API** that handles authentication, data management, and business logic
- **MongoDB storage** for flexible, scalable data persistence
- **Email-based verification** using Brevo SMTP to ensure account authenticity
- **JWT-based authentication** for secure, stateless sessions
- **A stunning UI** with Sora headings, DM Sans body text, and a midnight navy + gold color scheme

---

## 3. Solution Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Flutter Mobile App                             │  │
│  │                                                                   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │  │
│  │  │ SplashScreen│  │  LoginPage  │  │Verification │             │  │
│  │  │  (Auth Gate)│──▶│(Auth Form) │──▶│   Screen    │             │  │
│  │  └─────────────┘  └─────────────┘  └──────┬──────┘             │  │
│  │                                            │                     │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────┴──────┐             │  │
│  │  │ Profile Tab │  │Incidents Tab│  │  Dashboard  │             │  │
│  │  │   (User)    │  │  (List)     │  │  (HomePage) │             │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘             │  │
│  │                                                                   │  │
│  │  ┌──────────────────────────────────────────────────────────┐    │  │
│  │  │                    Services Layer                        │    │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │    │  │
│  │  │  │ AuthService  │  │  ApiService  │  │SharedPrefs   │  │    │  │
│  │  │  │ (JWT, REST)  │  │  (HTTP Client)│  │(Token Store) │  │    │  │
│  │  │  └──────────────┘  └──────────────┘  └──────────────┘  │    │  │
│  │  └──────────────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │ HTTP / JSON (REST API)
                           │
┌──────────────────────────▼──────────────────────────────────────────────┐
│                          SERVER LAYER                                   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Node.js / Express                              │  │
│  │                                                                   │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │  │
│  │  │   Routes     │──▶│ Controllers  │──▶│   Models     │          │  │
│  │  │  (auth.js)   │  │(authCtrl.js) │  │ (Mongoose)   │          │  │
│  │  └──────────────┘  └──────────────┘  └──────┬───────┘          │  │
│  │                                              │                   │  │
│  │  ┌──────────────┐  ┌──────────────┐         │                   │  │
│  │  │ Middleware   │  │  Services    │         │                   │  │
│  │  │(auth,verify) │  │ (emailSvc)   │         │                   │  │
│  │  └──────────────┘  └──────────────┘         │                   │  │
│  └──────────────────────────────────────────────┼───────────────────┘  │
└──────────────────────────────────────────────────┼──────────────────────┘
                                                   │
┌──────────────────────────────────────────────────▼──────────────────────┐
│                          DATA LAYER                                    │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                          MongoDB                                  │  │
│  │                                                                   │  │
│  │  ┌──────────────────────┐  ┌──────────────────────┐             │  │
│  │  │      users           │  │  verification_codes  │             │  │
│  │  │  ┌────────────────┐  │  │  ┌────────────────┐  │             │  │
│  │  │  │ _id            │  │  │  │ _id            │  │             │  │
│  │  │  │ email (unique) │  │  │  │ email          │  │             │  │
│  │  │  │ password (hash)│  │  │  │ code (6-digit) │  │             │  │
│  │  │  │ name           │  │  │  │ expiresAt (TTL)│  │             │  │
│  │  │  │ phone          │  │  │  └────────────────┘  │             │  │
│  │  │  │ verified (bool)│  │  └──────────────────────┘             │  │
│  │  │  │ createdAt      │  │                                        │  │
│  │  │  │ updatedAt      │  │                                        │  │
│  │  │  └────────────────┘  │                                        │  │
│  │  └──────────────────────┘                                        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 System Design

#### 3.2.1 Client-Server Communication

The Flutter app communicates with the Node.js backend exclusively through HTTP REST API calls. All data is exchanged in JSON format. The communication flow is:

1. **Authentication Flow:**
   - User submits credentials from the Flutter app
   - Request is sent via `ApiService.post()` to the server
   - Server validates input, authenticates, and returns a JWT token
   - Token is stored locally in `SharedPreferences`
   - All subsequent API calls include the token in the `Authorization: Bearer` header

2. **Protected Routes:**
   - The `authenticate` middleware on the server verifies the JWT token
   - If valid, the request proceeds to the controller
   - If invalid/expired, a 401 response is returned
   - The Flutter app handles 401 by redirecting to the login screen

3. **Error Handling:**
   - Server returns consistent JSON error responses
   - Flutter `ApiException` class wraps error responses with status codes
   - UI displays errors in styled error banners

#### 3.2.2 State Management

The Flutter app uses:
- **Local state** with `StatefulWidget` for screen-level state
- **Singleton services** (`AuthService`, `ApiService`) for shared state
- **SharedPreferences** for persistent token storage
- No state management library (Provider, Riverpod, Bloc) is used yet — state is intentionally kept simple for this phase

#### 3.2.3 Routing

Navigation uses the Navigator stack:
- `SplashScreen` → decides: `HomePage` (if authenticated) or `LoginPage` (if not)
- `LoginPage` → on signup: `VerificationScreen` → on success: `HomePage`
- `LoginPage` → on login success: `HomePage`
- `HomePage` uses `IndexedStack` for bottom tab navigation (Dashboard, Incidents, Profile)

### 3.3 Technology Choices

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Mobile Framework | Flutter | 3.11+ | Cross-platform UI framework |
| Programming Language | Dart | 3.11+ | Type-safe, modern language |
| Backend Runtime | Node.js | 24.8+ | JavaScript runtime for server |
| Web Framework | Express | 4.21+ | HTTP server & routing |
| Database | MongoDB | 8.12+ (driver) | Document-oriented NoSQL DB |
| ODM | Mongoose | 8.12+ | MongoDB object modeling |
| Authentication | JWT | jsonwebtoken 9.x | Stateless token auth |
| Password Hashing | bcryptjs | 3.x | Salted password hashing |
| Email Service | Nodemailer | 6.x | SMTP email delivery |
| Email Provider | Brevo (Sendinblue) | — | Transactional email API |
| HTTP Client | http package | 1.3+ | Flutter HTTP requests |
| Local Storage | shared_preferences | 2.3+ | Flutter key-value storage |
| Fonts | Google Fonts | 6.x | Sora + DM Sans fonts |

### 3.4 Why These Technologies

#### 3.4.1 Why Flutter?

- **Single codebase** for iOS, Android, Web, and Desktop
- **Hot reload** for instant development feedback
- **Rich widget library** with Material Design 3
- **Native performance** with Dart compilation
- **Excellent Google Fonts support** for custom typography
- **Strong typing** with Dart reduces runtime errors
- **Growing ecosystem** with packages for everything

#### 3.4.2 Why Node.js?

- **JavaScript everywhere** — one language for frontend and backend
- **Event-driven, non-blocking** — perfect for I/O-heavy API servers
- **NPM ecosystem** — the largest package registry in the world
- **Express** — minimal, flexible, and well-documented
- **Excellent MongoDB support** with Mongoose
- **Easy deployment** on any platform

#### 3.4.3 Why MongoDB?

- **Flexible schema** — incidents have varying fields, documents work perfectly
- **JSON-like documents** — natural mapping to JavaScript objects
- **Scalable** — horizontal scaling with sharding
- **TTL indexes** — automatic expiration of verification codes
- **Rich query language** — filtering, aggregation, geospatial queries
- **Free tier** on MongoDB Atlas for development

#### 3.4.4 Why Sora + DM Sans?

The typography pair was chosen for specific psychological effects:

**Sora** (for headings, buttons, display numbers):
- Modern geometric sans-serif
- Tight letter-spacing conveys precision and professionalism
- Strong, confident appearance appropriate for impactful titles
- The name "Sora" (空, Japanese for "sky") suggests openness and clarity

**DM Sans** (for body text, labels, paragraphs):
- Low-contrast humanist design maximizes readability at small sizes
- Warm, approachable tone balances Sora's formality
- Excellent legibility on mobile screens
- Pairs naturally with Sora due to similar x-heights

---

## 4. Features

### 4.1 Authentication System

#### 4.1.1 User Registration

The registration process is designed to be frictionless while maintaining security:

1. **Form Input:** User enters email, password, name, and phone number
2. **Client Validation:**
   - Email format validation (regex)
   - Password minimum length (6 characters)
   - Name minimum length (2 characters)
   - Phone number format validation
   - Password confirmation matching (signup only)
3. **Server Validation:**
   - Duplicate email check (409 Conflict response)
   - Password strength requirements
   - All validations return specific error messages
4. **Account Creation:**
   - Password is hashed with bcrypt (salt rounds: 10)
   - User is created with `verified: false`
   - JWT is NOT returned yet — email must be verified first
5. **Email Verification:**
   - A 6-digit code is generated using `Math.floor(100000 + Math.random() * 900000)`
   - Code is stored in the `verification_codes` collection with a 10-minute TTL
   - Email is sent via Brevo SMTP with a branded HTML template
6. **Redirection:** User is redirected to the verification screen

#### 4.1.2 Email Verification

The verification screen provides:

- **6 individual digit input boxes** with auto-advance between fields
- **30-second resend timer** preventing spam
- **Visual feedback** on each digit entry
- **Error display** with red background banner
- **Auto-clear** of all fields on failed verification
- **Auto-focus** on first field on screen load

Verification flow:
1. User receives 6-digit code via email
2. User enters digits one by one (auto-advances)
3. On 6th digit entry, user taps "VERIFY"
4. `POST /api/auth/verify-email` is called with email + code
5. Server checks:
   - Code exists for this email
   - Code hasn't expired (10-minute window)
6. On success:
   - User is marked `verified: true`
   - All verification codes for this email are deleted
   - JWT token is generated and returned
   - Token is saved to SharedPreferences
   - User is redirected to the Dashboard
7. On failure:
   - Error message is shown
   - All digit fields are cleared
   - Focus returns to the first field

#### 4.1.3 User Login

Login flow:
1. User enters email and password
2. `POST /api/auth/login` is called
3. Server validates credentials against hashed password
4. **If email is not verified:**
   - Returns 403 with `code: 'EMAIL_NOT_VERIFIED'` and the user's email
   - Flutter automatically redirects to the verification screen
   - User can request a new code via "Resend code"
5. **If credentials are valid and email is verified:**
   - JWT token is generated (7-day expiry)
   - Token is saved to SharedPreferences
   - User is redirected to the Dashboard
6. **If credentials are invalid:**
   - Returns 401 with "Invalid email or password"
   - Error message is shown on the login form
   - No indication of which field is wrong (security best practice)

#### 4.1.4 Session Management

- **Token Storage:** JWT is stored in SharedPreferences for persistence across app restarts
- **Auto-Login:** On app launch, `SplashScreen` checks for a stored token
  - If token exists → navigate directly to Dashboard
  - If no token → navigate to Login page
- **Token Expiry:** JWT expires after 7 days
  - Expired tokens result in 401 responses
  - The `ApiException` with 401 status is caught and user is redirected to login
- **Logout:** Clears token from memory and SharedPreferences, navigates to login

### 4.2 Email Verification

The email verification system uses:

**Server-side:**
- `VerificationCode` Mongoose model with TTL index for auto-expiry
- `emailService.js` with Nodemailer + Brevo SMTP integration
- Branded HTML email template with RABTA styling (Sora headings, gold accents)
- 10-minute code expiry window
- Code deletion on successful verification
- Rate limiting via 30-second resend cooldown

**Email Template Design:**
```
┌──────────────────────────────────┐
│  ┌────────────────────────────┐  │
│  │          RABTA              │  │
│  │    Incident Management      │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  Verify your email         │  │
│  │                            │  │
│  │  Enter this code to verify │  │
│  │  your email address and    │  │
│  │  activate your account.    │  │
│  │                            │  │
│  │      ┌──────────────┐     │  │
│  │      │  482917       │     │  │
│  │      └──────────────┘     │  │
│  │                            │  │
│  │  Expires in 10 minutes.    │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

### 4.3 Dashboard

The dashboard provides a real-time overview of the incident landscape:

**Header Section:**
- Gradient background (midnight navy tones)
- RABTA branding with logo
- Logout button

**Greeting Card:**
- Dark gradient card with rounded corners
- User avatar (first letter of name in a styled container)
- Personalized greeting ("Good to see you, [Name]")
- Verified badge

**Overview Stats (2x2 Grid):**
Four stat cards with gradient backgrounds and subtle shadows:

| Card | Color | Icon | Display |
|------|-------|------|---------|
| Total Incidents | Midnight Navy | Assignment | Large count |
| Open | Coral Red | Radio Button | Large count |
| In Progress | Gold | Timelapse | Large count |
| Resolved | Emerald Green | Check Circle | Large count |

Each card features:
- Gradient background matching the stat type
- Icon + label in a row
- Large Sora font for the count number
- Subtle box shadow for depth

**Recent Incidents:**
- Section header with "View all" link
- Individual incident rows with:
  - Color-coded left border (red=open, gold=progress, green=resolved)
  - Incident title (DM Sans, semi-bold)
  - Category label
  - Status badge with matching background color

**Empty State:**
- When no incidents exist, a styled empty state is shown with:
  - Inbox icon
  - "No incidents yet" message
  - "Reported incidents will appear here" subtext

### 4.4 User Profile

The profile tab shows:

- **Avatar:** Large gradient circle with user's first letter
- **Name:** Sora bold heading
- **Email:** DM Sans secondary text
- **Info Cards:** Styled cards showing:
  - Full Name
  - Email
  - Account Status (Verified badge)
- **Sign Out Button:** Red-themed sign out with confirmation

### 4.5 Incident Management (Planned)

The Incidents tab currently shows an "under construction" state. Planned features include:
- Incident creation with title, description, category, priority, location
- Incident list with filtering and sorting
- Incident detail view with comments/timeline
- Status updates and assignment
- Image attachments

---

## 5. Tech Stack Deep Dive

### 5.1 Frontend: Flutter & Dart

#### 5.1.1 Flutter Architecture

The Flutter app follows a standard widget-based architecture:

```
MaterialApp
 └── ThemeData (Sora + DM Sans, custom ColorScheme)
      └── SplashScreen (auth gate)
           ├── LoginPage (auth form)
           │    └── VerificationScreen (OTP entry)
           └── HomePage (main app shell)
                └── IndexedStack (3 tabs)
                     ├── Dashboard (stats + incidents)
                     ├── Incidents (list view)
                     └── Profile (user info)
```

**Key packages used:**
- `google_fonts: ^6.2.1` — Sora and DM Sans font loading
- `http: ^1.3.0` — REST API client
- `shared_preferences: ^2.3.5` — Local token storage

**Theme configuration (`main.dart`):**
The theme is configured with a custom `ColorScheme` and explicit `TextTheme` that assigns Sora to all display/headline/title styles and DM Sans to all body/label styles.

#### 5.1.2 Animation System

The app uses Flutter's built-in animation system:

- **SplashScreen:** `AnimationController` with `FadeIn`, `ScaleIn`, and `SlideUp` animations for the logo and brand text, staggered with `Interval` curves
- **LandingPage:** `SlideTransition` and `FadeTransition` for the bottom card sliding up on initial load and when toggling between login/signup modes
- **VerificationScreen:** `AnimatedScale` for digit box focus state, `AnimatedCrossFade` for error display
- **HomePage:** `AnimatedContainer` for bottom nav item transitions, `AnimatedSwitcher` for content changes
- **Global:** `PageRouteBuilder` with `FadeTransition` for all screen navigations

#### 5.1.3 State Management Approach

No external state management library is used. The app relies on:

1. **Widget-local state** using `StatefulWidget.setState()`
2. **Singleton services** (`AuthService`, `ApiService`) for shared state
3. **SharedPreferences** for persistent token storage
4. **Constructor parameters** for passing data between screens (e.g., email to VerificationScreen)

This approach is intentionally minimal for the current scope. As the app grows, a migration to Riverpod or Bloc would be appropriate.

### 5.2 Backend: Node.js & Express

#### 5.2.1 Server Architecture

```
src/index.js (Entry Point)
  │
  ├── helmet()          → Security headers
  ├── cors()            → Cross-origin support
  ├── express.json()    → Body parsing
  │
  ├── GET /health       → Health check
  │
  └── /api/auth         → Auth routes (Router)
       │
       ├── POST /register      → User.create() + sendVerificationCode()
       ├── POST /verify-email  → VerificationCode.findOne() + User.update()
       ├── POST /resend-code   → VerificationCode.deleteMany() + sendVerificationCode()
       ├── POST /login         → User.findOne() + bcrypt.compare() + jwt.sign()
       ├── GET  /profile       → authenticate middleware + User.findById()
       └── PUT  /profile       → authenticate middleware + User.findByIdAndUpdate()
```

#### 5.2.2 Middleware Chain

Each request passes through:

1. **helmet()** — Sets security-related HTTP headers (CSP, XSS protection, etc.)
2. **cors()** — Enables cross-origin requests from the Flutter app
3. **express.json()** — Parses JSON request bodies
4. **Route-specific validation** (`validate.js`) — Checks required fields and formats
5. **Route-specific authentication** (`auth.js`) — Verifies JWT for protected routes
6. **Controller** — Executes business logic
7. **Global error handler** — Catches unhandled errors and returns 500

#### 5.2.3 Request Validation

The custom `validate.js` middleware provides declarative validation:

```javascript
router.post(
  '/register',
  validate({
    email: ['required', 'email'],
    password: ['required', 'password'],
    name: ['name'],
    phone: ['phone'],
  }),
  register
);
```

Rules available:
- `required` — Field must exist and not be empty
- `email` — Must match email regex pattern
- `password` — Must be at least 6 characters
- `phone` — Must match phone regex pattern (+ digits)
- `name` — Must be at least 2 characters
- Custom function — For custom validation logic

### 5.3 Database: MongoDB & Mongoose

#### 5.3.1 Why MongoDB for Incident Management

Incident data is inherently variable:
- A network outage might have different fields than a hardware failure
- Some incidents need location data, others need affected services
- The schema evolves as new types of incidents are added

MongoDB's document model handles this naturally. Each incident is a document with the fields it needs, without requiring migrations or nullable columns.

#### 5.3.2 Mongoose ODM

Mongoose provides:
- Schema validation with built-in and custom validators
- Middleware (pre/post hooks) for automatic password hashing
- Virtual properties
- Population (reference resolution)
- Query building with chainable methods

**User schema `pre('save')` hook:**
```javascript
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

**User schema `toJSON` transform:**
```javascript
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;     // Never expose password hash
  delete obj.__v;           // Remove version key
  return obj;
};
```

#### 5.3.3 TTL Index for Verification Codes

The verification codes collection uses a MongoDB TTL (Time-To-Live) index:

```javascript
verificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

This automatically deletes documents when `expiresAt` is reached, providing:
- Automatic cleanup without a cron job
- No stale codes accumulating in the database
- Self-cleaning system for expired verification attempts

### 5.4 Email Service: Nodemailer & Brevo

#### 5.4.1 Architecture

The email service uses Nodemailer with Brevo's SMTP relay:

```
Flutter App ──POST /register──▶ Node.js Server ──SMTP──▶ Brevo Relay ──▶ User's Inbox
                                    │
                                    ├── Generate 6-digit code
                                    ├── Save to MongoDB (10-min TTL)
                                    └── Send email via Nodemailer
```

#### 5.4.2 Email Template

The verification email uses an HTML template styled to match the RABTA brand:
- Background: Warm pearl (`#F6F4F0`)
- Card: White with border
- Heading: Sora font, midnight navy
- Code: 36px Sora, midnight navy, 12px letter-spacing, on warm pearl background
- Body: DM Sans font

### 5.5 Authentication: JWT & Bcrypt

#### 5.5.1 JWT Token Structure

```javascript
{
  "uid": "user_mongodb_id",
  "email": "user@example.com",
  "iat": 1680000000,    // Issued at
  "exp": 1680604800     // Expires (7 days)
}
```

**Token generation:**
```javascript
jwt.sign(
  { uid: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

#### 5.5.2 Password Hashing

Passwords are hashed using bcryptjs with:
- Salt rounds: 10 (approximately 10 hashes/second on modern hardware)
- Algorithm: Adaptive hash function based on Blowfish cipher
- Automatic salting: Each password gets a unique 16-byte salt

The hash comparison uses constant-time comparison to prevent timing attacks:
```javascript
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

#### 5.5.3 Security Flow

```
Registration:
Password ──▶ bcrypt.hash(password, 10) ──▶ $2a$10$...hash... ──▶ MongoDB

Login:
Password ──▶ bcrypt.compare(password, hash)
              ├── Match: jwt.sign({ uid, email }) ──▶ Client
              └── No match: 401 Unauthorized

Protected Request:
Authorization: Bearer <token>
  └── jwt.verify(token, JWT_SECRET)
       ├── Valid: req.user = decoded ──▶ Controller
       ├── Expired: 401 Token expired
       └── Invalid: 401 Invalid token
```

---

## 6. Project Structure

### 6.1 Complete File Tree

```
IncidentMangementSystem/
│
├── README.md                                      # This file
├── .gitattributes                                 # Git configuration
├── .gitignore                                     # Ignored files
│
├── mobileapp/                                     # Flutter Mobile Application
│   ├── pubspec.yaml                               # Dependencies & project config
│   ├── pubspec.lock                               # Locked dependency versions
│   ├── analysis_options.yaml                      # Dart linter rules
│   ├── .metadata                                  # Flutter project metadata
│   │
│   ├── lib/                                       # Source code
│   │   ├── main.dart                              # App entry point + ThemeData
│   │   │
│   │   ├── constants/
│   │   │   └── app_colors.dart                    # Design system colors
│   │   │
│   │   ├── models/
│   │   │   └── user_model.dart                    # User data model
│   │   │
│   │   ├── services/
│   │   │   ├── api_service.dart                   # HTTP client with JWT
│   │   │   └── auth_service.dart                  # Auth operations
│   │   │
│   │   ├── screens/
│   │   │   ├── splash_screen.dart                 # Animated splash + auth gate
│   │   │   ├── landing_page.dart                  # Login/Signup hero card
│   │   │   ├── verification_screen.dart           # OTP code entry
│   │   │   └── home_page.dart                     # Dashboard + tabs
│   │   │
│   │   └── widgets/
│   │       └── animated_bg.dart                   # Gradient background
│   │
│   ├── assets/
│   │   └── logo.png                               # Application logo
│   │
│   ├── android/                                   # Android platform
│   │   ├── app/
│   │   │   ├── build.gradle.kts                   # Android build config
│   │   │   └── src/main/
│   │   │       ├── AndroidManifest.xml            # App manifest
│   │   │       ├── kotlin/                        # Kotlin source
│   │   │       └── res/                           # Resources
│   │   ├── build.gradle.kts                       # Root Gradle config
│   │   ├── settings.gradle.kts                    # Gradle settings
│   │   └── gradle.properties                      # Gradle properties
│   │
│   ├── ios/                                       # iOS platform
│   │   ├── Runner/
│   │   │   ├── AppDelegate.swift
│   │   │   ├── Info.plist
│   │   │   └── Assets.xcassets/
│   │   └── Runner.xcodeproj/
│   │
│   ├── test/
│   │   └── widget_test.dart                       # Basic widget test
│   │
│   ├── web/                                       # Web platform
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── favicon.png
│   │
│   ├── linux/                                     # Linux platform
│   ├── macos/                                     # macOS platform
│   └── windows/                                   # Windows platform
│
├── server/                                        # Node.js Backend
│   ├── package.json                               # Dependencies & scripts
│   ├── package-lock.json                          # Locked dependency versions
│   ├── .env                                       # Environment variables
│   ├── .env.example                               # Environment template
│   │
│   └── src/
│       ├── index.js                               # Express app + server start
│       │
│       ├── config/
│       │   └── db.js                              # MongoDB connection
│       │
│       ├── models/
│       │   ├── User.js                            # User schema + bcrypt
│       │   └── VerificationCode.js                 # OTP schema + TTL index
│       │
│       ├── controllers/
│       │   └── authController.js                  # Auth business logic
│       │
│       ├── routes/
│       │   └── auth.js                            # Auth route definitions
│       │
│       ├── middleware/
│       │   ├── auth.js                            # JWT verification
│       │   └── validate.js                        # Request validation
│       │
│       └── services/
│           └── emailService.js                    # Nodemailer + Brevo
│
└── deployement/                                   # Deployment configs
    └── (empty)
```

### 6.2 Flutter App Structure

#### 6.2.1 Entry Point (`main.dart`)

The `main.dart` file serves as the application entry point and defines:

1. **`RabtaApp`** — The root `MaterialApp` widget with:
   - Custom `ColorScheme` using `AppColors`
   - Complete `TextTheme` with Sora for display/heading/title and DM Sans for body/label
   - `MaterialApp.builder` wrapping all pages in a 4px black border container
   - Initial route set to `SplashScreen`

2. **Theme Configuration:**
   ```dart
   colorScheme: ColorScheme(
     primary: AppColors.primary,       // #0F1B2D Midnight navy
     secondary: AppColors.accent,       // #C9A84C Premium gold
     surface: AppColors.surface,        // #FFFFFF
     error: AppColors.error,            // #D1453B
     ...
   )
   ```

3. **Typography Configuration:**
   ```dart
   textTheme: TextTheme(
     displayLarge: GoogleFonts.sora(...),   // Sora for display
     headlineLarge: GoogleFonts.sora(...),  // Sora for headings
     titleLarge: GoogleFonts.sora(...),     // Sora for titles
     bodyLarge: GoogleFonts.dmSans(...),    // DM Sans for body
     labelLarge: GoogleFonts.dmSans(...),   // DM Sans for labels
     ...
   )
   ```

#### 6.2.2 Screens

**SplashScreen (`splash_screen.dart`):**
- Animated entry with fade-in, scale-up, and slide-up animations
- Logo in a translucent container with rounded corners
- "RABTA" heading with 10px letter-spacing
- "Incident Management" subtitle
- Animated linear progress indicator
- Auth gate logic: checks `SharedPreferences` for stored JWT
- 2-second minimum display time
- Transitions to `HomePage` (if authenticated) or `LoginPage` (if not)

**LoginPage (`landing_page.dart`):**
- Split-screen design: top ~32% is hero gradient, bottom 68% is white card
- Hero section: dark navy gradient with logo, "RABTA" branding, and accent line
- Bottom card: rounded 28px top corners, shadow transition
- Animated slide-up card on toggle between login/signup modes
- "Welcome Back" (login) or "Create Account" (signup) heading
- Form fields with icons, filled background, 12px border-radius
- Login mode: Email + Password + Forgot Password link
- Signup mode: Email + Password + Name + Phone + Confirm Password (animated cross-fade)
- Error display: styled red banner with icon
- Primary button: gradient midnight navy with shadow
- Toggle: RichText with "Already have an account? Login" or "Don't have an account? Sign Up"
- Auto-redirect to VerificationScreen on signup
- Auto-redirect to VerificationScreen on login if email not verified

**VerificationScreen (`verification_screen.dart`):**
- Similar hero/card layout as login page
- Mail icon in translucent container
- "VERIFY YOUR EMAIL" heading with 4px spacing
- User email displayed in accent gold
- 6 individual digit input boxes:
  - Auto-advance to next field on digit entry
  - Auto-return to previous field on backspace
  - Auto-submit on 6th digit (when focused is lost)
  - Focus state scaling animation (1.05x)
  - Primary color border on focus
  - Sora 22px bold digits
- Resend timer: 30-second countdown with "Resend in Xs" display
- Error banner on invalid code
- Auto-clear and refocus on failed verification

**HomePage (`home_page.dart`):**
- 3-tab bottom navigation: Dashboard, Incidents, Profile
- Animated nav items with highlight on active tab

**Dashboard Tab:**
- Header: Gradient with "RABTA" branding and logout icon
- Greeting card: Dark gradient with avatar initial, name, verified badge
- Overview section with 2x2 stat card grid:
  - Total Incidents (navy gradient)
  - Open (red gradient)
  - In Progress (gold gradient)
  - Resolved (green gradient)
- Recent Incidents section with color-coded rows:
  - Left border: red (open), gold (in progress), green (resolved)
  - Status badge with matching color
- Empty state for no incidents

**Incidents Tab:**
- Placeholder with icon, title, and "coming soon" message

**Profile Tab:**
- Large gradient avatar with initial
- User name + email
- Info cards: Full Name, Email, Status
- Sign out button with red styling

### 6.3 Server Structure

#### 6.3.1 Entry Point (`src/index.js`)

The server entry point:
1. Loads environment variables via `dotenv`
2. Configures middleware (helmet, cors, express.json)
3. Defines health check endpoint
4. Mounts auth routes at `/api/auth`
5. Sets up global error handler
6. Connects to MongoDB
7. Starts Express server

**Middleware order:**
```javascript
app.use(helmet());          // Security headers
app.use(cors());            // CORS
app.use(express.json());    // Body parsing
app.get('/health', ...);    // Health check
app.use('/api/auth', ...);  // Auth routes
app.use((err, req, res) => { ... });  // Error handler
```

#### 6.3.2 Configuration (`src/config/db.js`)

The database configuration:
- Reads `MONGODB_URI` from environment
- Connects to MongoDB using Mongoose
- Logs connection success or failure
- Handles runtime connection errors
- Exits process if initial connection fails (fail-fast)

#### 6.3.3 Models

**User (`src/models/User.js`):**
- Schema: email (unique, lowercase), password (hashed), name, phone, verified (boolean)
- Pre-save hook: auto-hashes password on modification
- Method: `comparePassword()` for login verification
- Method: `toJSON()` strips password and version key from serialized output

**VerificationCode (`src/models/VerificationCode.js`):**
- Schema: email, code (6-digit string), expiresAt (Date)
- Index: `{ email: 1 }` for fast lookups
- TTL Index: `{ expiresAt: 1 }` with `expireAfterSeconds: 0` for auto-cleanup

#### 6.3.4 Controllers

**AuthController (`src/controllers/authController.js`):**

| Method | Endpoint | Function | Description |
|--------|----------|----------|-------------|
| POST | /api/auth/register | `register` | Creates user, sends verification code |
| POST | /api/auth/verify-email | `verifyEmail` | Verifies 6-digit code, activates user |
| POST | /api/auth/resend-code | `resendCode` | Generates and sends new code |
| POST | /api/auth/login | `login` | Authenticates and returns JWT |
| GET | /api/auth/profile | `getProfile` | Returns authenticated user's profile |
| PUT | /api/auth/profile | `updateProfile` | Updates name and/or phone |

#### 6.3.5 Middleware

**Auth Middleware (`src/middleware/auth.js`):**
- Extracts Bearer token from Authorization header
- Verifies JWT using `jsonwebtoken.verify()`
- Attaches decoded payload to `req.user`
- Returns 401 for missing, invalid, or expired tokens
- Specific error messages for expired vs invalid tokens

**Validation Middleware (`src/middleware/validate.js`):**
- Accepts a schema object mapping field names to rule arrays
- Iterates through each field and applies all rules
- Returns 400 with all validation errors in an array
- Supports: required, email, password, phone, name, and custom functions

#### 6.3.6 Email Service (`src/services/emailService.js`)

- Creates a Nodemailer transport to Brevo's SMTP relay
- Uses environment variables for SMTP configuration
- Generates HTML emails with RABTA branding
- Handles transport errors gracefully (logs but doesn't crash)
- Singleton transport pattern (reuses connection)

---

## 7. Backend API Documentation

### 7.1 Base URL

```
Development: http://localhost:5001
Production:  https://your-domain.com
```

The Flutter app uses `http://10.0.2.2:5001` for Android emulator (10.0.2.2 maps to host localhost).

### 7.2 Authentication Endpoints

#### 7.2.1 Register User

Registers a new user and sends a verification code to their email.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "Ahmed Khan",
  "phone": "+92 300 1234567"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| email | required, valid email format |
| password | required, minimum 6 characters |
| name | optional, minimum 2 characters if provided |
| phone | optional, valid phone format if provided |

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Verification code sent to your email",
  "email": "user@example.com"
}
```

**Error Responses:**

409 Conflict — Email already exists:
```json
{
  "error": "An account with this email already exists"
}
```

400 Bad Request — Validation failure:
```json
{
  "error": "Validation failed",
  "details": [
    "email is required",
    "password must be at least 6 characters"
  ]
}
```

#### 7.2.2 Verify Email

Verifies a user's email using the 6-digit code sent to their inbox.

**Endpoint:** `POST /api/auth/verify-email`

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "482917"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "email": "user@example.com",
    "name": "Ahmed Khan",
    "phone": "+92 300 1234567",
    "verified": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

400 Bad Request — Invalid or expired code:
```json
{
  "error": "Invalid or expired verification code"
}
```

#### 7.2.3 Resend Verification Code

Generates a new verification code and sends it to the user's email.

**Endpoint:** `POST /api/auth/resend-code`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Verification code resent"
}
```

**Error Responses:**

404 Not Found:
```json
{
  "error": "User not found"
}
```

400 Bad Request — Already verified:
```json
{
  "error": "Email is already verified"
}
```

#### 7.2.4 Login

Authenticates a user with email and password.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "email": "user@example.com",
    "name": "Ahmed Khan",
    "phone": "+92 300 1234567",
    "verified": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

401 Unauthorized — Invalid credentials:
```json
{
  "error": "Invalid email or password"
}
```

403 Forbidden — Email not verified:
```json
{
  "error": "Email not verified",
  "email": "user@example.com",
  "code": "EMAIL_NOT_VERIFIED"
}
```

### 7.3 User Endpoints

#### 7.3.1 Get Profile

Returns the authenticated user's profile.

**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "email": "user@example.com",
    "name": "Ahmed Khan",
    "phone": "+92 300 1234567",
    "verified": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

401 Unauthorized:
```json
{
  "error": "Missing or invalid authorization header"
}
```

404 Not Found:
```json
{
  "error": "User not found"
}
```

#### 7.3.2 Update Profile

Updates the authenticated user's profile information.

**Endpoint:** `PUT /api/auth/profile`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "New Name",
  "phone": "+92 311 7654321"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| name | optional, minimum 2 characters |
| phone | optional, valid phone format |

**Success Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "email": "user@example.com",
    "name": "New Name",
    "phone": "+92 311 7654321",
    "verified": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-16T15:45:00.000Z"
  }
}
```

### 7.4 Health Check

**Endpoint:** `GET /health`

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 7.5 Error Codes

| HTTP Status | Code | Meaning |
|-------------|------|---------|
| 200 | — | Success |
| 201 | — | Resource created successfully |
| 400 | — | Validation error — check request body |
| 401 | — | Authentication required or invalid credentials |
| 403 | `EMAIL_NOT_VERIFIED` | User exists but email not verified |
| 404 | — | Resource not found |
| 409 | — | Resource conflict (e.g., duplicate email) |
| 500 | — | Internal server error |

### 7.6 Full API Reference

#### Standard Response Format

**Success:**
```json
{
  "success": true,
  ...data...
}
```

**Error:**
```json
{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_CODE (optional)",
  "details": ["array of specific errors (optional)"]
}
```

#### Response Status Codes by Endpoint

| Endpoint | Method | 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500 |
|----------|--------|-----|-----|-----|-----|-----|-----|-----|-----|
| /health | GET | ✓ | — | — | — | — | — | — | ✓ |
| /api/auth/register | POST | — | ✓ | ✓ | — | — | — | ✓ | ✓ |
| /api/auth/verify-email | POST | ✓ | — | ✓ | — | — | — | — | ✓ |
| /api/auth/resend-code | POST | ✓ | — | ✓ | — | — | ✓ | — | ✓ |
| /api/auth/login | POST | ✓ | — | ✓ | ✓ | ✓ | — | — | ✓ |
| /api/auth/profile | GET | ✓ | — | — | ✓ | — | ✓ | — | ✓ |
| /api/auth/profile | PUT | ✓ | — | ✓ | ✓ | — | ✓ | — | ✓ |

---

## 8. Database Schema

### 8.1 Users Collection

**Collection Name:** `users`

**Schema:**
```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    default: '',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: Date,                  // Mongoose auto (timestamps: true)
  updatedAt: Date                   // Mongoose auto (timestamps: true)
}
```

**Indexes:**
| Field | Index Type | Purpose |
|-------|------------|---------|
| email | Unique | Fast login lookups + duplicate prevention |

**Sample Document:**
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c0d",
  "email": "ahmed@example.com",
  "password": "$2a$10$XQxBj0gYK5VGhHzY8H3eYe5G4K5L6M7N8B9V0C1D2E3F4G5H6",
  "name": "Ahmed Khan",
  "phone": "+92 300 1234567",
  "verified": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Schema Methods:**
- `comparePassword(candidate)` — Returns boolean promise comparing password against bcrypt hash
- `toJSON()` — Returns user object without password and __v fields

### 8.2 Verification Codes Collection

**Collection Name:** `verification_codes`

**Schema:**
```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  code: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: Date                   // Mongoose auto (timestamps: true)
}
```

**Indexes:**
| Field | Index Type | Purpose |
|-------|------------|---------|
| email | Normal | Fast verification lookups |
| expiresAt | TTL (expireAfterSeconds: 0) | Auto-delete expired documents |

**Sample Document:**
```json
{
  "_id": "775a2b3c4d5e6f7a8b9c0e1f",
  "email": "ahmed@example.com",
  "code": "482917",
  "expiresAt": "2024-01-15T10:40:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**TTL Behavior:**
- MongoDB automatically deletes documents when `expiresAt` time is reached
- Cleanup runs every 60 seconds (MongoDB default)
- Provides automatic garbage collection for expired codes
- No application-level cron job or scheduled task needed

### 8.3 Incidents Collection (Planned)

The incidents collection is planned for Phase 2 of development. The proposed schema:

**Collection Name:** `incidents`

**Proposed Schema:**
```javascript
{
  _id: ObjectId,
  title: String,                    // Incident title (required)
  description: String,              // Detailed description
  category: String,                 // e.g., "Network", "Hardware", "Software", "Security", "Facility"
  priority: String,                 // "Critical", "High", "Medium", "Low"
  status: String,                   // "Open", "In Progress", "Resolved", "Closed"
  reportedBy: ObjectId,             // Reference to users._id
  assignedTo: ObjectId,             // Reference to users._id (nullable)
  location: String,                 // Physical location or system name
  attachments: [String],            // URLs to uploaded images/files
  comments: [
    {
      userId: ObjectId,             // Reference to users._id
      text: String,
      createdAt: Date
    }
  ],
  resolvedAt: Date,                 // When status changed to "Resolved"
  createdAt: Date,
  updatedAt: Date
}
```

**Proposed Indexes:**
| Field | Index Type | Purpose |
|-------|------------|---------|
| status | Normal | Filter incidents by status |
| priority | Normal | Filter by priority level |
| reportedBy | Normal | Find user's reported incidents |
| assignedTo | Normal | Find assigned incidents |
| createdAt | Normal | Recent incident queries |
| { status: 1, priority: -1 } | Compound | Dashboard stats aggregation |

---

## 9. UI/UX Design System

### 9.1 Design Philosophy

The RABTA design system is built on four core principles:

1. **Modern Minimalism** — Every element serves a purpose. No decorative fluff. Clean lines, generous whitespace, and intentional hierarchy guide the user's attention.

2. **Premium Feel** — From the typography pair to the color palette, every choice is made to convey quality and professionalism. The app should feel as good as it works.

3. **Mobile-First** — All designs are optimized for mobile screens first. Touch targets are appropriately sized (minimum 44px), content is scannable, and interactions feel natural.

4. **Consistent Rhythm** — An 8px grid system governs spacing. All margins, paddings, and gaps are multiples of 4px, creating visual harmony across screens.

### 9.2 Color Palette

The RABTA color palette is designed to convey trust, professionalism, and warmth.

#### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#0F1B2D` | Headers, primary buttons, nav bars, key UI elements |
| Primary Light | `#1E2D47` | Secondary elements, hover states, field labels |
| Primary Dark | `#080F1A` | Extreme contrast backgrounds |

#### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Accent | `#C9A84C` | Secondary buttons, highlighted info, decorative elements |
| Accent Dark | `#B08E3A` | Hover/active states for accent, links |
| Accent Light | `#E0C86A` | Subtle highlights, verified badges |

#### Neutral Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Surface | `#FFFFFF` | Card backgrounds, sheets, containers |
| Background | `#F6F4F0` | Screen backgrounds, page-level surfaces |
| Card BG | `#FFFFFF` | Elevated card surfaces |
| Input Fill | `#FAF9F7` | Text field backgrounds |
| Border | `#D9D4CC` | Dividers, card borders |
| Border Light | `#EFECE6` | Subtle borders, field borders |

#### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Text Primary | `#0D1321` | Primary content, headings |
| Text Secondary | `#5B697D` | Body text, subtitles, descriptions |
| Text Tertiary | `#8E9AAB` | Placeholders, disabled text, hints |
| Text On Dark | `#F6F4F0` | Text on dark backgrounds |

#### Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Success | `#2B8C5E` | Resolved status, verified badges |
| Success Light | `#E8F5EC` | Success background tints |
| Error | `#D1453B` | Errors, critical status, open incidents |
| Error Light | `#FDECEA` | Error background tints |
| Warning | `#D4A853` | In progress status, warnings |
| Warning Light | `#FEF5E7` | Warning background tints |

#### Gradient Definitions

| Gradient | Colors | Usage |
|----------|--------|-------|
| Hero Gradient | `[#0F1B2D, #141F33, #1A2842]` | Splash, landing hero, dashboard header |
| Stat Blue | `[#0F1B2D, #1E2D47]` | Total Incidents card |
| Stat Gold | `[#C9A84C, #D4B96A]` | In Progress card |
| Stat Green | `[#2B8C5E, #3DAF7A]` | Resolved card |
| Stat Red | `[#D1453B, #E06050]` | Open card |

### 9.3 Typography

#### Font Pairing

| Role | Font | Weight | Size | Spacing |
|------|------|--------|------|---------|
| App Logo/Title | Sora | 700 (Bold) | 26-30px | 8-10px |
| Headings | Sora | 700 (Bold) | 18-22px | 3-4px |
| Display Numbers | Sora | 700 (Bold) | 28-32px | normal |
| Button Text | Sora | 700 (Bold) | 15px | 4px |
| Subheadings | Sora | 600 (SemiBold) | 14-16px | 0.5px |
| Field Labels | DM Sans | 600 (SemiBold) | 13px | normal |
| Body Text | DM Sans | 400 (Regular) | 14-15px | normal |
| Small Text | DM Sans | 500 (Medium) | 11-12px | normal |
| Placeholder | DM Sans | 400 (Regular) | 15px | normal |
| Stat Labels | DM Sans | 600 (SemiBold) | 11px | normal |

#### Text Scale

```
Sora 30 (Logo)
Sora 22 (Section Heading)
Sora 20 (Card Heading)
Sora 18 (Page Heading)
Sora 16 (Subheading)
Sora 15 (Button)

DM Sans 15 (Body, Input)
DM Sans 14 (Body Small)
DM Sans 13 (Field Label)
DM Sans 12 (Caption, Badge)
DM Sans 11 (Stat Label, Overline)
```

### 9.4 Component Design

#### Buttons

**Primary Button:**
```
┌──────────────────────────────────┐
│            LOGIN / REGISTER       │  Sora 15, w700, 4px spacing
│                                  │  Gradient: Primary → Primary Light
│                                  │  Border-radius: 12px
│                                  │  Shadow: primary.withOpacity(0.3)
│                                  │  Height: 52px
└──────────────────────────────────┘
```

**Secondary (Toggle) Link:**
```
"Already have an account? Login"   DM Sans 14, gray + accent-dark
"Don't have an account? Sign Up"   RichText with styled span
```

**Sign Out Button:**
```
┌──────────────────────────────────┐
│           Sign Out               │  DM Sans 15, w600
│                                  │  Background: Error Light
│                                  │  Color: Error
│                                  │  Border-radius: 12px
└──────────────────────────────────┘
```

#### Text Fields

**Default State:**
```
Label (DM Sans 13, w600, textPrimary)
┌──────────────────────────────────┐
│  📧 you@example.com              │  Fill: Input Fill
│                                  │  Border: Border Light, 1.5px
│                                  │  Border-radius: 12px
│                                  │  Height: 48px
│                                  │  Text: DM Sans 15, w500
│                                  │  Hint: DM Sans 15, textTertiary
└──────────────────────────────────┘
```

**Focused State:**
```
┌──────────────────────────────────┐
│  📧 you@example.com              │  Border: Primary, 2px
│                                  │  Border-radius: 12px
│                                  │  Shadow: none
└──────────────────────────────────┘
```

#### Stat Cards

```
┌──────────────────────────────────┐
│ 📋 Total Incidents               │  Icon 16px + DM Sans 11, w600
│                                  │  Gradient background
│          0                       │  Sora 32, w700, white
│                                  │  Border-radius: 14px
│                                  │  Shadow: matched to gradient
│                                  │  Padding: 18px
└──────────────────────────────────┘
```

#### Incident Row

```
┌──────────────────────────────────┐
│ │ Network outage in Block A      │  │ = Status color bar (4px, 40px)
│ │ Infrastructure                 │  Title: DM Sans 14, w600
│ │                    In Progress │  Category: DM Sans 12
│                                  │  Status badge: colored bg
│                                  │  Padding: 14px
│                                  │  Border-radius: 12px
│                                  │  Border: borderLight, 1px
└──────────────────────────────────┘
```

#### Greeting Card

```
┌──────────────────────────────────┐
│ ┌────┐                          │  Avatar: 48px, Rounded 14px
│ │ A  │ Good to see you,         │  "Good to see you," DM Sans 12
│ └────┘ Ahmed Khan                │  Name: Sora 18, w700
│                          ✓ Veri. │  Verified badge: green
│                                  │  Gradient: Primary Light → Primary
│                                  │  Border-radius: 16px
│                                  │  Shadow: primary.withOpacity(0.25)
│                                  │  Padding: 20px
└──────────────────────────────────┘
```

#### Bottom Navigation

```
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Dashboard │ │          │ │          │
        │  📊       │ │  📋     │ │  👤      │
        │ Dashboard │ │ Incidents│ │  Profile │
        └──────────┘ └──────────┘ └──────────┘
        Active: filled bg     Inactive: gray icon
        Text shown            No text (icon only)
        Padding: 16px h, 8px v
        Border-radius: 10px
```

### 9.5 Screen Specifications

#### Splash Screen

| Element | Position | Size | Details |
|---------|----------|------|---------|
| Background | Full screen | — | Hero gradient |
| Logo container | Center | 88×88 | 24px radius, 10% white bg |
| Logo | Center of container | 52×52 | — |
| "RABTA" | 20px below logo | Sora 30, w700 | 10px letter-spacing |
| "Incident Management" | 8px below title | DM Sans 12, w500 | 2.5px spacing, 50% opacity |
| Progress bar | 48px below subtitle | 120×3 | 2px radius, accent color |
| Animations | On mount | — | Fade-in 0-50%, Scale 0.8→1, Slide up 20→0 |

#### Landing Page

| Element | Position | Size | Details |
|---------|----------|------|---------|
| Hero section | Top 32% | Full width | Hero gradient |
| Logo container | Center of hero | 72×72 | 20px radius, 12% white bg |
| "RABTA" | 16px below logo | Sora 26, w700 | 10px spacing, white |
| "Incident Management" | 6px below | DM Sans 12, w500 | 2.5px spacing, 60% white |
| Accent line | Bottom of hero | 40×4 | Center, 2px radius, 50% accent |
| White card | Remaining 68% | Full width | 28px top radius, no border |
| "Welcome Back"/"Create Account" | 28px from top | Sora 20, w700 | — |
| Subtitle | 4px below heading | DM Sans 14 | textSecondary |
| Email field | 28px below subtitle | Full width | — |
| Password field | 16px below email | Full width | — |
| Forgot password | Below password | Right-aligned | DM Sans 13, accentDark |
| Login/Register button | 22px below fields | 52px height | Gradient, shadow, 12px radius |
| Toggle text | 18px below button | — | RichText, centered |
| Animations | On toggle | — | Slide up 8%, Fade in |

#### Verification Screen

| Element | Position | Size | Details |
|---------|----------|------|---------|
| Hero section | Top 30% | Full width | Hero gradient |
| Mail icon container | Center of hero | 64×64 | 18px radius, 12% white bg |
| "VERIFY YOUR EMAIL" | 16px below icon | Sora 18, w700 | 4px spacing, white |
| Instruction text | 6px below heading | DM Sans 13 | 60% white |
| User email | 2px below | DM Sans 14, w600 | accentLight color |
| "6-Digit Code" label | 32px from top of card | DM Sans 13, w600 | textSecondary |
| 6 digit boxes | 24px below label | 48×56 each | 10px gap, focus animation |
| Verify button | 28px below boxes | 52px height | Same as primary button |
| Resend text | 20px below button | DM Sans 14, w600 | accentDark or textTertiary |
| Timer | In resend text | — | "Resend in 30s" countdown |

#### Dashboard

| Element | Position | Size | Details |
|---------|----------|------|---------|
| Header | Top | Full width | Hero gradient, 48px top padding |
| "RABTA" | In header | Sora 18, w700 | 4px spacing |
| "Dashboard" | 2px below | DM Sans 12 | 50% opacity |
| Logout icon | In header, right | 20px | 10px padding, 10% white bg |
| Greeting card | Below header (-16px overlap) | Full width - 40px margin | Gradient, 16px radius |
| Avatar | In greeting | 48×48 | 14px radius, 15% white bg |
| "Good to see you," | In greeting | DM Sans 12 | 60% white |
| User name | 2px below | Sora 18, w700 | White |
| Verified badge | In greeting, right | — | Success 20% bg, green text |
| "OVERVIEW" label | 24px below greeting | DM Sans 11, w700 | 2px spacing, textSecondary |
| Stats grid (2×2) | 14px below label | Full width | 12×2 gaps |
| "RECENT INCIDENTS" | 28px below stats | DM Sans 11, w700 | 2px spacing |
| "View all" link | Same line, right | DM Sans 12, w600 | accentDark |
| Incident rows | 14px below label | Full width | 10px gap between rows |
| Bottom nav | Bottom | 48px height | With top shadow |

### 9.6 Animation & Motion

#### Animation Specifications

| Screen | Element | Animation | Duration | Curve |
|--------|---------|-----------|----------|-------|
| Splash | Logo + text | Fade in + Scale from 0.8 + Slide up 20px | 1200ms total | easeOut (fade), easeOutCubic (scale) |
| Landing | Card content | Slide up from 8% below + Fade in | 600ms | easeOutCubic |
| Landing | Login/Signup toggle | Reset + replay slide animation | 600ms | easeOutCubic |
| Landing | Signup fields | Cross-fade (AnimatedCrossFade) | 300ms | easeInOut |
| Verification | Digit box focus | Scale to 1.05 | 150ms | easeInOut |
| Home | Tab switch | Instant (IndexedStack) | 0ms | — |
| Home | Nav item active | Background + text fade | 200ms | easeInOut |
| All screens | Screen transitions | Fade transition | 400-500ms | easeInOut |

#### Animation Implementation

All animations use Flutter's built-in animation system:

```dart
// Slide animation example (landing page card)
_slideAnimation = Tween<Offset>(
  begin: const Offset(0, 0.08),
  end: Offset.zero,
).animate(CurvedAnimation(
  parent: _slideController,
  curve: Curves.easeOutCubic,
));

// Scale animation example (OTP digit box)
AnimatedScale(
  scale: isFocused ? 1.05 : 1,
  duration: const Duration(milliseconds: 150),
  child: /* digit box */
)
```

---

## 10. Security Model

### 10.1 Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Flutter  │     │  Server  │     │  MongoDB  │
│    App    │     │          │     │          │
└────┬─────┘     └────┬─────┘     └────┬─────┘
     │                 │                │
     │  POST /register │                │
     │  {email,pass,   │                │
     │   name,phone}   │                │
     │────────────────▶│                │
     │                 │  CREATE user   │
     │                 │  (verified:    │
     │                 │   false)       │
     │                 │───────────────▶│
     │                 │  SAVE OTP      │
     │                 │  (10min TTL)   │
     │                 │───────────────▶│
     │                 │  SEND EMAIL    │
     │                 │  (Nodemailer)  │
     │                 │─── Brevo ────▶ │ ──▶ User's Inbox
     │  {success,      │                │
     │   email}        │                │
     │◀────────────────│                │
     │                 │                │
     │  POST /verify   │                │
     │  {email, code}  │                │
     │────────────────▶│                │
     │                 │  FIND OTP      │
     │                 │───────────────▶│
     │                 │  UPDATE user   │
     │                 │  (verified:    │
     │                 │   true)        │
     │                 │───────────────▶│
     │                 │  DELETE OTPs   │
     │                 │───────────────▶│
     │  {token, user}  │                │
     │◀────────────────│                │
     │                 │                │
     │  STORE token    │                │
     │  in prefs       │                │
     │                 │                │
     │  POST /login    │                │
     │  {email, pass}  │                │
     │────────────────▶│                │
     │                 │  FIND user     │
     │                 │───────────────▶│
     │                 │  bcrypt.compare│
     │                 │  verified?     │
     │                 │  jwt.sign()    │
     │  {token, user}  │                │
     │◀────────────────│                │
```

### 10.2 Password Security

**Hashing Algorithm:** bcrypt
- **Salt rounds:** 10 (≈10 hashes/sec)
- **Implementation:** bcryptjs library
- **Storage format:** `$2a$10$<salt><hash>` (60 characters)

**Security Properties:**
- Adaptive: automatically increases hash time as hardware improves
- Salted: each password gets a unique 128-bit salt
- Slow: 10 rounds ≈ 100ms verification time, preventing brute force
- No plaintext storage: password is never stored in plaintext

**Password Policy:**
- Minimum length: 6 characters
- No maximum length (bcrypt supports up to 72 bytes)
- Future enhancement: complexity requirements (uppercase, number, special char)

**Constant-Time Comparison:**
```javascript
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```
`bcrypt.compare()` uses constant-time comparison to prevent timing attacks.

### 10.3 Token Management

**Token Type:** JSON Web Token (JWT)
**Algorithm:** HS256 (HMAC with SHA-256)
**Expiry:** 7 days from issuance
**Secret:** `JWT_SECRET` environment variable

**Token Payload:**
```json
{
  "uid": "user_mongodb_id",
  "email": "user@example.com",
  "iat": 1705312200,
  "exp": 1705917000
}
```

**Token Storage (Client):**
- Stored in SharedPreferences (encrypted on some platforms)
- Never stored in plaintext logs
- Cleared on logout

**Token Verification (Server):**
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Sets req.user = decoded for downstream middleware
```

**Token Revocation:**
- Currently no blacklist (stateless JWT model)
- Future: implement token blacklist for immediate revocation
- Workaround: changing `JWT_SECRET` invalidates all tokens

### 10.4 Email Verification

**Verification Code:**
- 6 numeric digits (e.g., "482917")
- Generated via: `Math.floor(100000 + Math.random() * 900000)`
- Cryptographically NOT secure (Math.random), but acceptable for email verification
- Future: use `crypto.randomInt()` for cryptographically secure codes

**Code Expiry:**
- 10 minutes from generation
- Enforced by MongoDB TTL index (automatic deletion)
- Server also checks `expiresAt > new Date()` in verification logic
- Failed verifications don't reveal whether code was wrong or expired

**Resend Protection:**
- 30-second client-side cooldown
- Old codes are deleted before generating new ones
- Only one valid code per email at any time

**Email Delivery:**
- SMTP relay via Brevo (formerly Sendinblue)
- TLS encryption for email transport
- Branded HTML template (no external images, all inline CSS)
- From address: configured via `EMAIL_USER`

### 10.5 API Security

**Transport Security:**
- API runs on HTTP for development
- Production should use HTTPS with a reverse proxy (nginx, Caddy)
- helmet.js adds security headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Strict-Transport-Security` (with HTTPS)
  - `Content-Security-Policy`

**CORS Configuration:**
```javascript
app.use(cors());
```
Currently allows all origins. In production, restrict to specific origins:
```javascript
app.use(cors({ origin: 'https://rabta.example.com' }));
```

**Input Validation:**
- All inputs validated server-side before processing
- Multiple validation rules per field
- Specific error messages for each validation failure
- No raw user input used in database queries (Mongoose parameterization)

**Error Handling:**
- Consistent error response format
- No stack traces exposed to clients
- Generic 500 errors for unexpected failures
- Logged server-side for debugging

### 10.6 Data Protection

**Password Data:**
- Never returned in API responses (`toJSON()` strips password)
- Never logged or printed
- Only stored as bcrypt hash

**User Data:**
- Email stored in lowercase (normalized)
- Phone stored as provided (no automatic formatting)
- Name stored as provided (no sanitization beyond trimming)

**MongoDB Security:**
- Connection string with credentials
- Network-level access control (IP whitelist for production)
- Principle of least privilege for database user
- Regular backups (enabled on MongoDB Atlas)

---

## 11. Installation & Setup

### 11.1 Prerequisites

**Required Software:**

| Software | Version | Purpose |
|----------|---------|---------|
| Flutter SDK | 3.11+ | Mobile app development |
| Dart SDK | 3.11+ | Comes with Flutter |
| Node.js | 18+ (24.8 tested) | Backend runtime |
| npm | 10+ | Package management |
| Git | 2.x | Version control |
| MongoDB | 5+ (Atlas or local) | Database |
| Code Editor | VS Code / Android Studio | Development |

**Optional but Recommended:**

| Software | Purpose |
|----------|---------|
| Android Studio | Android emulator and build tools |
| Xcode (macOS) | iOS simulator and build tools |
| Postman / Insomnia | API testing |
| MongoDB Compass | Database GUI |
| Flutter DevTools | Flutter debugging |

**Verify Installation:**
```bash
flutter --version
node --version
npm --version
git --version
```

### 11.2 Environment Variables

The server requires the following environment variables. Copy `.env.example` to `.env` and fill in your values:

```bash
cp server/.env.example server/.env
```

**Required Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5001` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-random-secret-at-least-32-chars` |

**Email Configuration (Required for verification):**

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server host | `smtp-relay.brevo.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `EMAIL_USER` | SMTP login username | `ininsico@gmail.com` |
| `EMAIL_PASS` | SMTP login password | `xkeysib-...` |

**Getting a Brevo (Sendinblue) API Key:**
1. Sign up at https://www.brevo.com
2. Go to SMTP & API → SMTP → SMTP keys
3. Create a new SMTP key
4. Use the generated key as `EMAIL_PASS`
5. Use your Brevo login email as `EMAIL_USER`

**Example `.env` file:**
```env
PORT=5001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/rabta?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=xkeysib-your-brevo-api-key
```

### 11.3 Running the Server

**Step 1: Navigate to server directory**
```bash
cd server
```

**Step 2: Install dependencies**
```bash
npm install
```

**Step 3: Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and email credentials
```

**Step 4: Start the server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

**Step 5: Verify the server is running**
```bash
curl http://localhost:5001/health
# Response: {"status":"ok","timestamp":"2024-01-15T10:30:00.000Z"}
```

### 11.4 Running the Flutter App

**Step 1: Navigate to mobile app directory**
```bash
cd mobileapp
```

**Step 2: Get dependencies**
```bash
flutter pub get
```

**Step 3: Run the app**
```bash
# For connected device or emulator
flutter run

# For a specific platform
flutter run -d chrome          # Web
flutter run -d android         # Android
flutter run -d ios             # iOS (macOS only)
```

**Step 4: Update API base URL (if needed)**

Edit `lib/services/api_service.dart`:
```dart
static const String _baseUrl = 'http://10.0.2.2:5001';
```

| Platform | URL |
|----------|-----|
| Android Emulator | `http://10.0.2.2:5001` |
| iOS Simulator | `http://localhost:5001` |
| Physical Device | `http://<your-lan-ip>:5001` |
| Web | `http://localhost:5001` |

### 11.5 Running on Different Platforms

#### Android

```bash
# Build APK
flutter build apk --debug

# Build release APK
flutter build apk --release

# Run on connected device
flutter run -d <device_id>
```

#### iOS (macOS only)

```bash
# Open Xcode workspace
open ios/Runner.xcworkspace

# Run from command line
flutter run -d ios

# Build for App Store
flutter build ios --release
```

#### Web

```bash
# Run in Chrome
flutter run -d chrome

# Build for deployment
flutter build web

# Serve the build
cd build/web
python3 -m http.server 8080
# Or use nginx, etc.
```

#### Desktop (Windows/Linux/macOS)

```bash
# Windows
flutter run -d windows

# Linux
flutter run -d linux

# macOS
flutter run -d macos
```

---

## 12. Development Guide

### 12.1 Code Style & Conventions

#### Dart/Flutter

**Naming Conventions:**
| Element | Convention | Example |
|---------|------------|---------|
| Classes | PascalCase | `LoginPage`, `AuthService` |
| Files | snake_case | `landing_page.dart`, `auth_service.dart` |
| Variables | camelCase | `_emailController`, `isAuthenticated` |
| Constants | camelCase (const) | `_baseUrl`, `_tokenKey` |
| Private members | `_` prefix | `_loading`, `_submit()` |
| Widgets | PascalCase | `_StatCard`, `HomePage` |

**File Organization:**
```dart
// 1. Imports (grouped: flutter, packages, project)
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';
import '../services/auth_service.dart';

// 2. Class definition
class HomePage extends StatefulWidget { ... }

// 3. State class (if StatefulWidget)
class _HomePageState extends State<HomePage> { ... }

// 4. Private widgets at bottom of file
class _StatCard extends StatelessWidget { ... }
```

**Widget Tree Structure:**
```dart
Widget build(BuildContext context) {
  return Scaffold(
    body: Column(
      children: [
        _buildHeader(),
        Expanded(
          child: _buildContent(),
        ),
      ],
    ),
  );
}
```

#### JavaScript/Node.js

**Naming Conventions:**
| Element | Convention | Example |
|---------|------------|---------|
| Variables | camelCase | `user`, `authController` |
| Functions | camelCase | `getProfile`, `verifyEmail` |
| Classes | PascalCase | `User`, `ApiException` |
| Files | kebab-case | `auth-controller.js` (but this project uses camelCase for files) |
| Constants | UPPER_SNAKE | `JWT_SECRET`, `MONGODB_URI` |

**Error Handling Pattern:**
```javascript
async function register(req, res) {
  try {
    // Business logic
  } catch (err) {
    console.error('Register error:', err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate email' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

### 12.2 Git Workflow

**Branching Strategy:**
```
main           → Production-ready code
  ├── develop  → Integration branch
  │   ├── feature/auth    → Auth system
  │   ├── feature/dashboard  → Dashboard UI
  │   └── fix/login-bug  → Bug fixes
```

**Commit Convention:**
```
type(scope): description

Types:
  feat     → New feature
  fix      → Bug fix
  refactor → Code restructuring
  style    → Formatting, UI changes
  docs     → Documentation
  chore    → Dependencies, config
  test     → Tests

Examples:
  feat(server): add email verification endpoint
  fix(flutter): handle empty phone field in signup
  style(ui): update landing page hero gradient
  docs(readme): add API documentation
```

### 12.3 Testing

**Running Tests:**
```bash
cd mobileapp
flutter test
```

**Widget Test Example:**
```dart
testWidgets('App loads splash screen', (WidgetTester tester) async {
  await tester.pumpWidget(const RabtaApp());
  expect(find.text('RABTA'), findsOneWidget);
  expect(find.text('Incident Management'), findsOneWidget);
});
```

**Testing Philosophy:**
- Widget tests verify that screens render correctly
- Integration tests (planned) will verify end-to-end flows
- Server testing (planned) will use Mocha/Jest for API tests
- Manual testing currently covers auth flows

### 12.4 Adding New Features

**To add a new screen:**
1. Create the screen file in `lib/screens/`
2. Define the widget (StatefulWidget or StatelessWidget)
3. Register navigation to/from the screen
4. Add any new services or models needed
5. Add tests

**To add a new API endpoint:**
1. Define the route in `src/routes/`
2. Add validation rules
3. Implement the controller logic
4. Add any new models or services
5. Update the Flutter service layer
6. Document in the API reference

---

## 13. Deployment

### 13.1 Android APK Build

```bash
cd mobileapp

# Debug APK (for testing)
flutter build apk --debug
# Output: build/app/outputs/flutter-apk/app-debug.apk

# Release APK (requires signing)
flutter build apk --release
# Output: build/app/outputs/flutter-apk/app-release.apk

# App Bundle (recommended for Play Store)
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
```

**Release Signing:**
1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore upload-keystore.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Create `android/key.properties`:
   ```properties
   storePassword=<password>
   keyPassword=<password>
   keyAlias=upload
   storeFile=../upload-keystore.jks
   ```
3. Configure signing in `android/app/build.gradle.kts`

### 13.2 iOS Build

```bash
cd mobileapp

# Build for iOS (requires Xcode, macOS only)
flutter build ios --release
# Then archive via Xcode: Product → Archive
```

### 13.3 Web Deployment

```bash
cd mobileapp

# Build web
flutter build web

# Deploy to any static host
# For Firebase Hosting:
firebase init hosting
firebase deploy --only hosting

# For Netlify:
# Drag build/web folder to Netlify drop

# For Vercel:
vercel --prod
```

### 13.4 Server Deployment

**Option 1: Direct Server (VPS/Cloud VM)**

```bash
# Install Node.js on server
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone https://github.com/your-repo/IncidentMangementSystem.git
cd server

# Install dependencies
npm install --production

# Set up environment
nano .env
# Fill in production values

# Install PM2 for process management
npm install -g pm2
pm2 start src/index.js --name rabta-api
pm2 save
pm2 startup

# Set up reverse proxy (nginx)
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/rabta
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name rabta.example.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Option 2: Platform-as-a-Service**

**Heroku:**
```bash
# Add Procfile
echo "web: node src/index.js" > Procfile

# Set buildpack
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set PORT=5001
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...

# Deploy
git push heroku main
```

**Railway:**
```bash
# Connected via GitHub
# Set environment variables in Railway dashboard
# Railway auto-detects Node.js
```

**Render:**
```bash
# Connected via GitHub
# Set build command: npm install
# Set start command: npm start
# Set environment variables in Render dashboard
```

---

## 14. Future Roadmap

### 14.1 Phase 2: Incident CRUD

**Features:**
- Create incident with title, description, category, priority, location
- Upload images (via Cloudinary — already configured in .env)
- Assign incidents to users
- Update incident status (Open → In Progress → Resolved → Closed)
- Delete incidents (soft delete)

**Server Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/incidents | List incidents (with filters) |
| POST | /api/incidents | Create incident |
| GET | /api/incidents/:id | Get incident detail |
| PUT | /api/incidents/:id | Update incident |
| DELETE | /api/incidents/:id | Delete incident |
| POST | /api/incidents/:id/comments | Add comment |
| GET | /api/incidents/stats | Dashboard statistics |

**Database:**
- New `incidents` collection
- New `comments` subdocument array
- Image storage via Cloudinary uploads

### 14.2 Phase 3: Real-Time Updates

**Features:**
- Real-time incident updates via Server-Sent Events (SSE) or WebSocket
- Push notifications for assigned/reassigned incidents
- Live dashboard with auto-refreshing stats
- Activity feed showing real-time changes

**Technologies:**
- Socket.IO for WebSocket communication
- Firebase Cloud Messaging for push notifications (optional)
- Server-Sent Events for simple live updates

### 14.3 Phase 4: Advanced Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Role-based access (Admin, Manager, Reporter) | Different permission levels | High |
| Incident categories management | CRUD for categories | High |
| SLA tracking | Time-to-resolution monitoring | Medium |
| Email notifications | Status change emails | Medium |
| PDF reports | Export incident reports | Medium |
| Dark mode | Theme toggle | Low |
| Offline support | Local caching with sync | Low |
| Internationalization | Urdu + English support | Low |
| Push notifications | Firebase Cloud Messaging | Medium |
| Analytics dashboard | Charts and trends | Medium |

---

## 15. Troubleshooting Guide

### 15.1 Server Won't Start

**Problem:** `npm run dev` fails with EADDRINUSE

**Solution:**
```bash
# Find the process using the port
netstat -ano | findstr :5001

# Kill the process (replace PID with actual value)
taskkill /PID <PID> /F
```

**Alternative:** Change the port in `.env`:
```env
PORT=5002
```

### 15.2 MongoDB Connection Failed

**Problem:** Server logs "MongoDB connection error"

**Solutions:**

1. **Check MongoDB URI** — Ensure `MONGODB_URI` is correct in `.env`
2. **Network access** — If using MongoDB Atlas, whitelist your IP in Network Access settings
3. **Credentials** — Verify username and password are correct (URL-encode special characters)
4. **Connection string format**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

### 15.3 Emails Not Sending

**Problem:** Verification emails are not delivered

**Checklist:**
1. **SMTP credentials** — Verify `EMAIL_USER` and `EMAIL_PASS` are correct
2. **Brevo quota** — Free Brevo accounts have a daily limit (typically 300 emails/day)
3. **Spam folder** — Check spam/junk folder
4. **SMTP settings**:
   ```
   SMTP_HOST=smtp-relay.brevo.com
   SMTP_PORT=587
   ```
5. **Test the connection**:
   ```javascript
   // Run this in server directory: node -e "
   const nodemailer = require('nodemailer');
   const transport = nodemailer.createTransport({
     host: 'smtp-relay.brevo.com',
     port: 587,
     auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
   });
   transport.verify().then(console.log).catch(console.error);
   "
   ```

### 15.4 Flutter Build Errors

**Problem:** `flutter pub get` or `flutter build` fails

**Solutions:**

1. **Clean and retry:**
   ```bash
   flutter clean
   flutter pub get
   ```

2. **Check Flutter version:**
   ```bash
   flutter --version
   # Should be 3.11+
   ```
3. **Update Flutter:**
   ```bash
   flutter upgrade
   ```
4. **Check for conflicts:**
   ```bash
   flutter pub outdated
   ```

### 15.5 API Connection Refused

**Problem:** Flutter app can't connect to the server

**Checklist:**

| Platform | URL | Notes |
|----------|-----|-------|
| Android Emulator | `http://10.0.2.2:5001` | 10.0.2.2 = host machine |
| iOS Simulator | `http://localhost:5001` | Direct access |
| Physical Device | `http://<LAN_IP>:5001` | Use computer's IP on same network |
| Web | `http://localhost:5001` | Same origin |

**Verify server is running:**
```bash
curl http://localhost:5001/health
# Should return: {"status":"ok","timestamp":"..."}
```

**Firewall:** Ensure port 5001 is not blocked by Windows Defender Firewall

### 15.6 JWT Token Expired

**Problem:** Getting 401 errors after being logged in for a while

**Cause:** JWT tokens expire after 7 days

**Solution:** Log out and log back in. The app will automatically redirect to the login screen when receiving a 401 response.

### 15.7 Common Flutter Issues

| Issue | Solution |
|-------|----------|
| White screen on launch | Run `flutter clean` then `flutter pub get` |
| Gradle build failed | Update Gradle version in `android/gradle/wrapper/gradle-wrapper.properties` |
| iOS build failed | Run `cd ios && pod install && cd ..` |
| Web build failed | `flutter build web` requires specific setup; try `flutter run -d chrome` first |
| Hot reload not working | Restart the app with `flutter run` (not hot restart) |
| Google Fonts not loading | Ensure internet connection on first load (fonts are cached after first download) |

### 15.8 Android Specific Issues

**Problem:** `minSdkVersion` errors

**Solution:** The Flutter app sets `minSdk = flutter.minSdkVersion` in `android/app/build.gradle.kts`. If a plugin requires a higher version, update it there.

**Problem:** Emulator not detecting

**Solution:**
```bash
flutter devices
# If emulator not listed:
# 1. Open Android Studio
# 2. Tools → AVD Manager
# 3. Start an emulator
# 4. Run flutter again
```

### 15.9 MongoDB Connection Pool Issues

**Problem:** Server gets slow or times out under load

**Solution:** Increase the MongoDB connection pool size in `src/config/db.js`:
```javascript
await mongoose.connect(uri, {
  maxPoolSize: 50,  // Default is 100
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

### 15.10 Email Rate Limiting

**Problem:** Brevo returns "too many requests" or emails are queued

**Solution:**
1. Free Brevo accounts have a limit of 300 emails/day
2. Upgrade to a paid plan for higher limits
3. Implement server-side rate limiting:
```javascript
const rateLimit = require('express-rate-limit');
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // 5 emails per window
  message: { error: 'Too many email requests. Please try again later.' }
});
router.post('/resend-code', emailLimiter, resendCode);
```

### 15.11 CORS Errors in Web

**Problem:** Web app gets CORS errors when calling the API

**Solution:** The server has `cors()` enabled by default. For production, restrict to specific origins:
```javascript
app.use(cors({
  origin: ['https://rabta.example.com', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### 15.12 Flutter Web Additional Setup

**Problem:** Web version doesn't connect to server

**Additional steps for web:**
1. The web app runs on a different port than the server
2. CORS must be enabled on the server (already done)
3. For development, use `flutter run -d chrome` and ensure server is running
4. The base URL in `api_service.dart` should point to the server's address

### 15.13 Node.js --watch Flag Not Available

**Problem:** `npm run dev` fails because `node --watch` is not supported

**Solution:** Use nodemon instead:
```bash
npm install --save-dev nodemon
```
Update `package.json`:
```json
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}
```

### 15.14 Flutter Build Failed with Gradle Error

**Problem:** `flutter build apk` fails with Gradle errors

**Solutions:**
1. Update Gradle wrapper:
   ```bash
   cd android
   ./gradlew wrapper --gradle-version 8.7
   ```
2. Clean and rebuild:
   ```bash
   flutter clean
   flutter pub get
   cd android && ./gradlew clean && cd ..
   flutter build apk
   ```
3. Check Java version:
   ```bash
   java --version
   # Should be Java 17+
   ```

### 15.15 Windows Specific Issues

**Problem:** `flutter run -d windows` fails

**Solution:**
```bash
# Ensure Windows build tools are installed
flutter config --enable-windows-desktop
flutter create --platforms=windows .
```

---

## 16. FAQ

### 16.1 General

**Q: What does "RABTA" mean?**
A: RABTA (ربطہ) means "connection" or "link" in Urdu, reflecting the app's purpose of connecting incident reporters with resolution teams.

**Q: Is this app free?**
A: Yes, RABTA is completely free and open-source under the MIT license.

**Q: Do I need internet to use RABTA?**
A: Yes, the app requires an internet connection to communicate with the backend server. Offline support is planned for a future phase.

**Q: Can I use RABTA for non-IT incidents?**
A: Absolutely. RABTA is designed for any type of incident — IT, facility, security, customer support, etc.

### 16.2 Technical

**Q: What platforms does RABTA support?**
A: Android, iOS, Web, Windows, macOS, and Linux — all from a single Flutter codebase.

**Q: Can I self-host RABTA?**
A: Yes. The Node.js server can be deployed on any VPS, cloud VM, or PaaS provider. You just need Node.js and MongoDB.

**Q: Does RABTA use any third-party services?**
A: For the core app, only a MongoDB database and an SMTP email provider (Brevo) are needed. Cloudinary can be optionally configured for image uploads.

**Q: How is data stored?**
A: User data is stored in MongoDB. Passwords are hashed with bcrypt (never stored in plaintext). JWT tokens are stored locally on the device in SharedPreferences.

### 16.3 Security

**Q: Is my data secure?**
A: Yes. Passwords are bcrypt-hashed with 10 salt rounds. All API traffic can be encrypted with HTTPS. JWT tokens expire after 7 days.

**Q: What if I forget my password?**
A: Password reset is not yet implemented (planned for Phase 2). For now, contact your system administrator.

**Q: Can someone else access my account?**
A: Only if they have your password AND your email inbox (to verify). Email verification ensures account ownership.

### 16.4 Features

**Q: Can I add my own categories?**
A: Not yet. Categories are pre-defined but will be customizable in Phase 2.

**Q: Can I upload photos of incidents?**
A: Not yet. Image upload is planned for Phase 2 using Cloudinary integration (already configured in the .env).

**Q: Can I export incident reports?**
A: Not yet. PDF export is planned for Phase 4.

**Q: Can I collaborate with my team?**
A: Basic collaboration (viewing incidents) works. User assignment and commenting are planned for Phase 2.

### 16.5 Development

**Q: How do I contribute to RABTA?**
A: Fork the repository, make your changes, and submit a pull request. See the Contributing section for details.

**Q: What programming languages does RABTA use?**
A: Dart (Flutter) for the mobile app and JavaScript (Node.js) for the server.

**Q: Do I need to know Flutter to contribute?**
A: For the mobile app, yes. For the server, you need Node.js/JavaScript knowledge. You can contribute to whichever part interests you.

**Q: Is there a testing framework?**
A: Flutter's built-in test framework is used for widget tests. Server-side testing with Mocha/Jest is planned.

---

## 17. Changelog

### Version 1.0.0 (Current)

**Initial Release Features:**

**Authentication:**
- User registration with email and password
- 6-digit email verification via Brevo SMTP
- Login with verified email check
- JWT-based session management (7-day expiry)
- Token persistence across app restarts
- Auto-redirect on login/signup completion
- Auto-redirect to verification screen on unverified login attempt

**UI/UX:**
- Premium split-screen design (hero gradient + white card)
- Sora font for headings and buttons (geometric sans-serif)
- DM Sans font for body text and labels (humanist sans-serif)
- Midnight navy + gold accent color palette
- Animated screen transitions
- 4px black border around entire app
- Splash screen with fade-in and scale animations
- Login/Signup toggle with slide animation
- Individual OTP digit input boxes with auto-advance
- 30-second resend cooldown timer
- Dashboard with 2×2 stat card grid (gradient backgrounds)
- Bottom navigation bar (Dashboard, Incidents, Profile)
- Profile tab with user info and sign-out
- Pull-to-refresh on dashboard
- Error banners with styled backgrounds

**Server:**
- Express.js REST API on port 5001
- MongoDB with Mongoose ODM
- User model with bcrypt password hashing
- VerificationCode model with TTL index (auto-expiry)
- Request validation middleware
- JWT authentication middleware
- Nodemailer integration with Brevo SMTP
- Branded HTML email template
- Health check endpoint
- CORS and Helmet security middleware

**Development:**
- Cross-platform support (Android, iOS, Web, Windows, macOS, Linux)
- Comprehensive README documentation
- Widget test for splash screen

### Version 0.2.0 (Previous)

- Initial Flutter project setup
- Basic brutalist UI design (Coffee Brown palette)
- Plus Jakarta Sans typography
- Basic login/signup form (no backend)

### Version 0.1.0 (Previous)

- Project scaffolding
- Flutter + Node.js boilerplate
- Platform configuration files

---

## 18. Performance Considerations

### 18.1 Flutter Performance

**Rendering:**
- The app uses `IndexedStack` for bottom navigation, keeping all three tabs alive in memory. This provides instant tab switching at the cost of slightly higher memory usage.
- `AnimatedBuilder` in the splash screen efficiently rebuilds only the animated portion.
- `SingleChildScrollView` with `Column` is used instead of `ListView` for scrollable content with a small number of children.

**Network:**
- API calls are made directly without a caching layer.
- No image caching is implemented yet (for the logo asset, Flutter's built-in asset caching is sufficient).
- Future: Implement API response caching for dashboard stats.

**Memory:**
- TextEditingControllers are properly disposed in `dispose()`.
- AnimationControllers are properly disposed.
- No heavy in-memory data structures are used.

### 18.2 Server Performance

**Database:**
- Indexes on frequently queried fields (email, expiresAt).
- TTL index provides automatic cleanup without cron jobs.
- Mongoose connection pooling handles concurrent requests.

**Concurrency:**
- Node.js event loop handles concurrent requests efficiently.
- Database operations are asynchronous and non-blocking.
- No synchronous database operations.

**Scaling:**
- Horizontal scaling: Add more Node.js instances behind a load balancer.
- Vertical scaling: Upgrade MongoDB Atlas tier.
- Caching: Future implementation with Redis recommended.

### 18.3 MongoDB Performance Tips

1. **Connection Pooling:** Mongoose uses a default pool size of 100. For high-traffic servers, adjust:
   ```javascript
   mongoose.connect(uri, { poolSize: 50 });
   ```
2. **Query Optimization:** Use `.select()` to fetch only needed fields.
3. **Indexing:** Add indexes for fields used in `find()` queries.
4. **TTL Index:** The `expiresAt` index auto-deletes expired verification codes, keeping the collection small.

---

## 19. API Client Integration Guide

### 19.1 Using the API from Other Clients

The RABTA API can be used from any HTTP client. Here are examples for different languages:

#### cURL

**Register:**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"Ahmed","phone":"+923001234567"}'
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Get Profile (with token):**
```bash
curl http://localhost:5001/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

#### Python (requests)

```python
import requests

BASE_URL = "http://localhost:5001"

# Register
response = requests.post(f"{BASE_URL}/api/auth/register", json={
    "email": "user@example.com",
    "password": "securepass123",
    "name": "Ahmed Khan",
    "phone": "+923001234567"
})
print(response.json())

# Login
response = requests.post(f"{BASE_URL}/api/auth/login", json={
    "email": "user@example.com",
    "password": "securepass123"
})
data = response.json()
token = data["token"]

# Get Profile
response = requests.get(
    f"{BASE_URL}/api/auth/profile",
    headers={"Authorization": f"Bearer {token}"}
)
print(response.json())
```

#### JavaScript (fetch)

```javascript
const BASE_URL = 'http://localhost:5001';

// Register
const registerRes = await fetch(`${BASE_URL}/api/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securepass123',
    name: 'Ahmed Khan',
    phone: '+923001234567'
  })
});
const registerData = await registerRes.json();
console.log(registerData);

// Login
const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securepass123'
  })
});
const loginData = await loginRes.json();
const token = loginData.token;

// Get Profile
const profileRes = await fetch(`${BASE_URL}/api/auth/profile`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
const profileData = await profileRes.json();
console.log(profileData);
```

#### Postman Collection

Import the following cURL commands into Postman to quickly set up requests:

1. **Register:** POST `http://localhost:5001/api/auth/register`
2. **Login:** POST `http://localhost:5001/api/auth/login`
3. **Get Profile:** GET `http://localhost:5001/api/auth/profile` (set Authorization header to Bearer token from login response)

### 19.2 Error Handling in Client Code

When integrating with the API, handle these common scenarios:

```javascript
async function apiCall(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(`Validation error: ${data.error}`);
      case 401:
        throw new Error(`Authentication failed: ${data.error}`);
        // Redirect to login
      case 403:
        if (data.code === 'EMAIL_NOT_VERIFIED') {
          // Redirect to verification page
          throw new Error('Email not verified');
        }
        throw new Error(`Forbidden: ${data.error}`);
      case 404:
        throw new Error(`Not found: ${data.error}`);
      case 409:
        throw new Error(`Conflict: ${data.error}`);
      default:
        throw new Error(`Server error: ${data.error}`);
    }
  }

  return data;
}
```

---

## 20. Environmental Variables Reference

### Full Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5001` | HTTP server port |
| `MONGODB_URI` | **Yes** | — | MongoDB connection string |
| `JWT_SECRET` | **Yes** | — | Secret key for JWT signing (minimum 32 characters recommended) |
| `SMTP_HOST` | Yes* | `smtp-relay.brevo.com` | SMTP server hostname |
| `SMTP_PORT` | No | `587` | SMTP server port (587 for STARTTLS, 465 for SSL) |
| `EMAIL_USER` | Yes* | — | SMTP authentication username |
| `EMAIL_PASS` | Yes* | — | SMTP authentication password |

*\* Required only if email verification is needed. The app will work without email, but registration endpoints will fail when trying to send verification codes.*

### Environment File Template

```env
# ============================================
# RABTA Server Configuration
# ============================================

# Server
# ---------------------------------------------
# The port the Express server listens on.
# Default: 5001
PORT=5001

# MongoDB
# ---------------------------------------------
# Your MongoDB connection string.
# Supports both Atlas (cloud) and local instances.
# Format: mongodb+srv://user:pass@host.mongodb.net/database
MONGODB_URI=mongodb+srv://ininsico_db_user:password@cluster.mongodb.net/disastermanagementmobileapp

# JWT
# ---------------------------------------------
# Secret key used to sign and verify JWT tokens.
# Must be kept secret. Change immediately in production.
# Minimum recommended length: 32 characters
JWT_SECRET=rabta_jwt_secret_change_this_in_production_2024

# SMTP / Email
# ---------------------------------------------
# Configured for Brevo (Sendinblue) by default.
# Can be any SMTP provider (Gmail, SendGrid, Mailgun, etc.)
#
# SMTP_HOST: smtp-relay.brevo.com (Brevo)
#            smtp.gmail.com (Gmail - requires App Password)
#            smtp.sendgrid.net (SendGrid)
#
# SMTP_PORT: 587 (STARTTLS - recommended)
#            465 (SSL)
#            25  (unencrypted - not recommended)
#
# EMAIL_USER: Your SMTP login email
# EMAIL_PASS: Your SMTP password or API key
#             For Brevo: Use the SMTP key (xkeysib-...)
#             For Gmail: Use an App Password
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
EMAIL_USER=ininsico@gmail.com
EMAIL_PASS=xkeysib-your-api-key-here
```

---

## 21. Complete Code Examples

### 21.1 Full Auth Flow Example (Dart)

```dart
// Example of a complete authentication flow in Flutter

import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../services/api_service.dart';

class AuthExample {
  final _auth = AuthService();

  Future<void> fullSignUpFlow() async {
    try {
      // Step 1: Register
      final result = await _auth.signUp(
        email: 'user@example.com',
        password: 'securePassword123',
        name: 'Ahmed Khan',
        phone: '+92 300 1234567',
      );
      final email = result['email'] as String;
      print('User registered: $email');
      // Navigate to VerificationScreen(email: email)

      // Step 2: Verify (after user enters code)
      // This would be in VerificationScreen
      final user = await _auth.verifyEmail(
        email: email,
        code: '482917', // From email
      );
      print('User verified: ${user.name}');
      // Navigate to HomePage()

    } on ApiException catch (e) {
      if (e.data?['code'] == 'EMAIL_NOT_VERIFIED') {
        // Redirect to verification
        print('Please verify your email first');
      } else {
        print('Error: ${e.message}');
      }
    } catch (e) {
      print('Unexpected error: $e');
    }
  }

  Future<void> fullLoginFlow() async {
    try {
      // Step 1: Login
      final user = await _auth.signIn(
        email: 'user@example.com',
        password: 'securePassword123',
      );
      print('Logged in as: ${user.name}');
      // Navigate to HomePage()

    } on ApiException catch (e) {
      if (e.statusCode == 401) {
        print('Invalid email or password');
      } else if (e.data?['code'] == 'EMAIL_NOT_VERIFIED') {
        final email = e.data!['email'] as String;
        print('Email not verified: $email');
        // Navigate to VerificationScreen(email: email)
      } else {
        print('Error: ${e.message}');
      }
    }
  }

  Future<void> logoutFlow() async {
    await _auth.signOut();
    // Navigate to LoginPage()
  }
}
```

### 21.2 Full API Route File (JavaScript)

```javascript
// Example of a complete route file with all auth endpoints

const { Router } = require('express');
const { register, login, verifyEmail, resendCode, getProfile, updateProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    { email, password, name?, phone? }
 * @returns { success, message, email }
 */
router.post(
  '/register',
  validate({
    email: ['required', 'email'],
    password: ['required', 'password'],
    name: ['name'],
    phone: ['phone'],
  }),
  register
);

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify email with 6-digit code
 * @access  Public
 * @body    { email, code }
 * @returns { success, token, user }
 */
router.post(
  '/verify-email',
  validate({
    email: ['required', 'email'],
    code: ['required'],
  }),
  verifyEmail
);

/**
 * @route   POST /api/auth/resend-code
 * @desc    Resend verification code
 * @access  Public
 * @body    { email }
 * @returns { success, message }
 */
router.post(
  '/resend-code',
  validate({
    email: ['required', 'email'],
  }),
  resendCode
);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT
 * @access  Public
 * @body    { email, password }
 * @returns { success, token, user }
 */
router.post(
  '/login',
  validate({
    email: ['required', 'email'],
    password: ['required'],
  }),
  login
);

/**
 * @route   GET /api/auth/profile
 * @desc    Get authenticated user's profile
 * @access  Private
 * @headers Authorization: Bearer <token>
 * @returns { success, user }
 */
router.get('/profile', authenticate, getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 * @headers Authorization: Bearer <token>
 * @body    { name?, phone? }
 * @returns { success, user }
 */
router.put(
  '/profile',
  authenticate,
  validate({
    name: ['name'],
    phone: ['phone'],
  }),
  updateProfile
);

module.exports = router;
```

### 21.3 Complete User Model with Mongoose

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    name: {
      type: String,
      default: '',
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

---

## 22. Complete Widget Reference

### 22.1 SplashScreen Widget

```dart
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeIn;
  late Animation<double> _scaleIn;
  late Animation<double> _slideUp;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _fadeIn = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0, 0.5, curve: Curves.easeOut),
      ),
    );
    _scaleIn = Tween<double>(begin: 0.8, end: 1).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0, 0.5, curve: Curves.easeOutCubic),
      ),
    );
    _slideUp = Tween<double>(begin: 20, end: 0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.3, 0.7, curve: Curves.easeOutCubic),
      ),
    );
    _controller.forward();
    _init();
  }

  Future<void> _init() async {
    final auth = AuthService();
    await auth.loadToken();
    if (!mounted) return;
    await Future.delayed(const Duration(seconds: 2));
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      PageRouteBuilder(
        pageBuilder: (context, animation, secondary) =>
            auth.isAuthenticated ? const HomePage() : const LoginPage(),
        transitionsBuilder: (context, animation, secondary, child) =>
            FadeTransition(opacity: animation, child: child),
        transitionDuration: const Duration(milliseconds: 500),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: AppColors.heroGradient,
          ),
        ),
        child: Center(
          child: AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return Opacity(
                opacity: _fadeIn.value,
                child: Transform.scale(
                  scale: _scaleIn.value,
                  child: Transform.translate(
                    offset: Offset(0, _slideUp.value),
                    child: child,
                  ),
                ),
              );
            },
            child: _buildContent(),
          ),
        ),
      ),
    );
  }

  Widget _buildContent() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Logo container with rounded corners and translucent background
        Container(
          width: 88,
          height: 88,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.1),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Image.asset('assets/logo.png', width: 52, height: 52),
        ),
        const SizedBox(height: 20),
        // App name in Sora with wide letter-spacing
        Text(
          'RABTA',
          style: GoogleFonts.sora(
            fontSize: 30,
            fontWeight: FontWeight.w700,
            color: AppColors.textOnDark,
            letterSpacing: 10,
          ),
        ),
        const SizedBox(height: 8),
        // Tagline in DM Sans
        Text(
          'Incident Management',
          style: GoogleFonts.dmSans(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            color: AppColors.textOnDark.withOpacity(0.5),
            letterSpacing: 2.5,
          ),
        ),
        const SizedBox(height: 48),
        // Animated loading progress indicator
        SizedBox(
          width: 120,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(2),
            child: LinearProgressIndicator(
              backgroundColor: Colors.white.withOpacity(0.1),
              valueColor: AlwaysStoppedAnimation<Color>(
                AppColors.accent.withOpacity(0.7),
              ),
              minHeight: 3,
            ),
          ),
        ),
      ],
    );
  }
}
```

**Properties:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| onAuthenticated | callback | → HomePage | Navigation destination when authenticated |
| onUnauthenticated | callback | → LoginPage | Navigation destination when not authenticated |
| splashDuration | Duration | 2 seconds | Minimum display duration |

**States:**
| State | Visual |
|-------|--------|
| Loading (auth check) | Logo + brand text + progress indicator |
| Authenticated | Auto-navigate to HomePage after delay |
| Unauthenticated | Auto-navigate to LoginPage after delay |

### 22.2 LoginPage Widget

```dart
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage>
    with SingleTickerProviderStateMixin {
  final _auth = AuthService();
  bool _isSignUp = false;
  bool _loading = false;
  String? _error;
  late AnimationController _slideController;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;

  // Controllers
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _confirmController = TextEditingController();
```

**Layout Structure (Login Mode):**
```
Column
├── Container (hero: 32% height)
│   ├── Logo (72×72, rounded 20, translucent bg)
│   ├── "RABTA" (Sora 26, w700, letter-spacing 10)
│   ├── "Incident Management" (DM Sans 12)
│   └── Accent line (40×4, center, rounded)
└── Expanded (white card, rounded 28px top)
    └── SingleChildScrollView
        └── Column (padding 24)
            ├── "Welcome Back" (Sora 20, w700)
            ├── "Sign in to your account" (DM Sans 14)
            ├── Email field (with icon, filled, rounded 12)
            ├── Password field (with icon, filled, rounded 12)
            ├── "Forgot password?" link (right-aligned)
            ├── Error banner (conditional)
            ├── Primary button (gradient, shadow, 52px)
            └── Toggle "Don't have an account? Sign Up"
```

**Layout Structure (Signup Mode):**
```
Column (same layout)
├── Hero section (same)
└── White card (same)
    └── Column
        ├── "Create Account" (Sora 20, w700)
        ├── "Enter your details" (DM Sans 14)
        ├── Email field
        ├── Password field
        ├── Full Name field (animated appear)
        ├── Phone field (animated appear)
        ├── Confirm Password field (animated appear)
        ├── Error banner (conditional)
        ├── Primary button "REGISTER"
        └── Toggle "Already have an account? Login"
```

### 22.3 VerificationScreen Widget

**Layout Structure:**
```
Column
├── Container (hero: 30% height)
│   ├── Mail icon (64×64, rounded 18, translucent bg)
│   ├── "VERIFY YOUR EMAIL" (Sora 18, w700, spacing 4)
│   ├── "Enter the code sent to" (DM Sans 13, 60% opacity)
│   └── user@example.com (DM Sans 14, w600, accent color)
└── Expanded (white card, rounded 28px top)
    └── Column (padding 32)
        ├── "6-Digit Code" (DM Sans 13, w600, secondary)
        ├── Row of 6 digit boxes
        │   └── For each box:
        │       ├── Container (48×56, rounded 12, filled)
        │       ├── TextField (Sora 22, w700, max 1 char)
        │       └── Focus animation (AnimatedScale 1.05x)
        ├── Error banner (conditional)
        ├── "VERIFY" button (same style as primary)
        └── "Resend in 30s" / "Resend code" link
```

**Digit Box Properties:**
| Property | Value |
|----------|-------|
| Width | 48px |
| Height | 56px |
| Border radius | 12px |
| Default border | borderLight, 1.5px |
| Focused border | primary, 2px |
| Focus shadow | primary 10% opacity, 8px blur |
| Default bg | inputFill (#FAF9F7) |
| Focused bg | surface (#FFFFFF) |
| Text style | Sora 22px, w700 |
| Focus animation | Scale 1.05x, 150ms |

### 22.4 HomePage Widget

**Layout Structure:**
```
Scaffold
├── BottomNavigationBar
│   ├── Dashboard tab (active: icon + label)
│   ├── Incidents tab (active: icon + label)
│   └── Profile tab (active: icon + label)
└── IndexedStack
    ├── Dashboard
    │   ├── Header (hero gradient, 48px top padding)
    │   │   ├── "RABTA" (Sora 18, w700, spacing 4)
    │   │   ├── "Dashboard" (DM Sans 12, 50% opacity)
    │   │   └── Logout button (rounded 10, translucent bg)
    │   └── Padding (horizontal 20)
    │       ├── Greeting Card (-16px overlap)
    │       │   ├── Avatar (48×48, rounded 14, 15% white)
    │       │   ├── "Good to see you," (DM Sans 12)
    │       │   ├── User name (Sora 18, w700)
    │       │   └── Verified badge (green, translucent bg)
    │       ├── "OVERVIEW" section label
    │       ├── 2×2 Stat Card Grid
    │       │   ├── Total Incidents (navy gradient)
    │       │   ├── Open (red gradient)
    │       │   ├── In Progress (gold gradient)
    │       │   └── Resolved (green gradient)
    │       ├── "RECENT INCIDENTS" + "View all"
    │       └── Incident rows (color-coded)
    ├── Incidents tab
    │   └── Empty state with placeholder
    └── Profile tab
        ├── Avatar (80×80, rounded 24, gradient)
        ├── User name (Sora 22, w700)
        ├── User email (DM Sans 14, secondary)
        ├── Profile info cards
        │   ├── Full Name
        │   ├── Email
        │   └── Status (Verified)
        └── Sign Out button (red, light bg)
```

**Stat Card Properties:**
| Property | Value |
|----------|-------|
| Padding | 18px all sides |
| Border radius | 14px |
| Gradient | Depends on stat type (navy/red/gold/green) |
| Shadow | gradient color at 25% opacity, 12px blur |
| Icon | 16px, white at 80% opacity |
| Label | DM Sans 11px, w600, white at 70% opacity |
| Value | Sora 32px, w700, white |

### 22.5 StatCard Widget

```dart
class _StatCard extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;
  final List<Color> colors;

  const _StatCard({
    required this.label,
    required this.value,
    required this.icon,
    required this.colors,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: colors,
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: colors[0].withOpacity(0.25),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 16, color: Colors.white.withOpacity(0.8)),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  label,
                  style: GoogleFonts.dmSans(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: Colors.white.withOpacity(0.7),
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            value,
            style: GoogleFonts.sora(
              fontSize: 32,
              fontWeight: FontWeight.w700,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}
```

### 22.6 Incident Row Widget

```dart
Widget _buildIncidentRow(_IncidentItem item) {
  return Container(
    margin: const EdgeInsets.only(bottom: 10),
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(12),
      border: Border.all(color: AppColors.borderLight, width: 1),
    ),
    child: Row(
      children: [
        // Status color bar (left accent)
        Container(
          width: 4,
          height: 40,
          decoration: BoxDecoration(
            color: item.statusColor,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        const SizedBox(width: 12),
        // Title and category
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                item.title,
                style: GoogleFonts.dmSans(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                item.category,
                style: GoogleFonts.dmSans(
                  fontSize: 12,
                  color: AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
        // Status badge
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: item.badgeColor,
            borderRadius: BorderRadius.circular(6),
          ),
          child: Text(
            item.status,
            style: GoogleFonts.dmSans(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: item.statusColor,
            ),
          ),
        ),
      ],
    ),
  );
}
```

### 22.7 Bottom Navigation Widget

```dart
Widget _buildBottomNav() {
  return Container(
    decoration: BoxDecoration(
      color: AppColors.surface,
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(0.06),
          blurRadius: 16,
          offset: const Offset(0, -4),
        ),
      ],
    ),
    child: SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _navItem(0, Icons.dashboard_rounded, 'Dashboard'),
            _navItem(1, Icons.assignment_rounded, 'Incidents'),
            _navItem(2, Icons.person_outline_rounded, 'Profile'),
          ],
        ),
      ),
    ),
  );
}

Widget _navItem(int index, IconData icon, String label) {
  final active = _currentTab == index;
  return GestureDetector(
    onTap: () => setState(() => _currentTab = index),
    child: AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: active
            ? AppColors.primary.withOpacity(0.08)
            : Colors.transparent,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 20,
            color: active ? AppColors.primary : AppColors.textTertiary,
          ),
          if (active) ...[
            const SizedBox(width: 6),
            Text(
              label,
              style: GoogleFonts.dmSans(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: AppColors.primary,
              ),
            ),
          ],
        ],
      ),
    ),
  );
}
```

---

## 23. Server Code Reference

### 23.1 Complete Server File Index

| # | File | Lines | Purpose |
|---|------|-------|---------|
| 1 | `src/index.js` | 30 | Express app setup, middleware, server start |
| 2 | `src/config/db.js` | 22 | MongoDB connection with Mongoose |
| 3 | `src/models/User.js` | 49 | User schema, bcrypt hashing, JSON transform |
| 4 | `src/models/VerificationCode.js` | 24 | OTP schema with TTL index |
| 5 | `src/controllers/authController.js` | 150 | All auth business logic |
| 6 | `src/routes/auth.js` | 62 | Route definitions with validation |
| 7 | `src/middleware/auth.js` | 24 | JWT verification middleware |
| 8 | `src/middleware/validate.js` | 38 | Request body validation |
| 9 | `src/services/emailService.js` | 58 | Nodemailer + Brevo SMTP integration |
| 10 | `.env` | 11 | Environment configuration |
| 11 | `.env.example` | 5 | Environment template |
| 12 | `package.json` | 23 | Dependencies and scripts |

**Total:** 496 lines of JavaScript

### 23.2 index.js — Entry Point

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// ============================================
// Middleware Stack
// ============================================
app.use(helmet());           // Security headers
app.use(cors());             // Cross-origin requests
app.use(express.json());     // JSON body parsing

// ============================================
// Routes
// ============================================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);

// ============================================
// Global Error Handler
// ============================================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// Server Start
// ============================================
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`RABTA API running on port ${PORT}`);
  });
});
```

**Middleware Order Rationale:**
1. `helmet()` first — sets security headers before any content is served
2. `cors()` second — allows cross-origin requests from the Flutter app
3. `express.json()` third — parses request bodies for downstream handlers
4. Health check — unauthenticated, no processing needed
5. Auth routes — handle authentication and user management
6. Error handler — catches any unhandled errors from all above layers

### 23.3 authController.js — Complete Controller

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const VerificationCode = require('../models/VerificationCode');
const { sendVerificationCode } = require('../services/emailService');

// ============================================
// Helper Functions
// ============================================

function generateToken(user) {
  return jwt.sign(
    { uid: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ============================================
// Controller Functions
// ============================================

/**
 * POST /api/auth/register
 * 1. Check for existing user
 * 2. Create user (verified: false)
 * 3. Generate + save 6-digit code (10-min TTL)
 * 4. Send verification email
 * 5. Return success + email (no token)
 */
async function register(req, res) { ... }

/**
 * POST /api/auth/verify-email
 * 1. Find valid (non-expired) code
 * 2. Mark user as verified
 * 3. Delete all codes for this email
 * 4. Generate + return JWT + user profile
 */
async function verifyEmail(req, res) { ... }

/**
 * POST /api/auth/resend-code
 * 1. Check user exists and NOT verified
 * 2. Delete old codes
 * 3. Generate new code + save
 * 4. Send email
 * 5. Return success
 */
async function resendCode(req, res) { ... }

/**
 * POST /api/auth/login
 * 1. Find user by email
 * 2. Compare password with bcrypt
 * 3. Check if verified
 * 4. Generate + return JWT + user profile
 */
async function login(req, res) { ... }

/**
 * GET /api/auth/profile
 * 1. Extract uid from JWT (via auth middleware)
 * 2. Find user by ID
 * 3. Return user profile (password excluded by toJSON)
 */
async function getProfile(req, res) { ... }

/**
 * PUT /api/auth/profile
 * 1. Extract uid from JWT
 * 2. Update allowed fields (name, phone)
 * 3. Return updated profile
 */
async function updateProfile(req, res) { ... }
```

### 23.4 emailService.js — Complete Email Service

```javascript
const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,  // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

async function sendVerificationCode(email, code) {
  const transport = getTransporter();

  const mailOptions = {
    from: `"RABTA" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your RABTA verification code',
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 480px;
            margin: 0 auto; padding: 32px 24px; background: #F6F4F0;">
        <!-- Brand header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-family: 'Sora', Arial, sans-serif; font-size: 28px;
              font-weight: 700; letter-spacing: 8px; color: #0F1B2D; margin: 0;">
            RABTA
          </h1>
          <p style="font-size: 12px; color: #5B697D; letter-spacing: 2px;
              margin: 4px 0 0;">Incident Management</p>
        </div>
        <!-- Content card -->
        <div style="background: #FFFFFF; border-radius: 6px; padding: 32px 24px;
            border: 1px solid #D9D4CC;">
          <h2 style="font-family: 'Sora', Arial, sans-serif; font-size: 18px;
              font-weight: 700; color: #0F1B2D; margin: 0 0 8px;">
            Verify your email
          </h2>
          <p style="font-size: 14px; color: #5B697D; line-height: 1.6;
              margin: 0 0 24px;">
            Enter this code to verify your email address and activate your account.
          </p>
          <!-- Code display -->
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-family: 'Sora', Arial, sans-serif; font-size: 36px;
                font-weight: 700; letter-spacing: 12px; color: #0F1B2D;
                background: #F6F4F0; padding: 12px 24px; border-radius: 6px;">
              ${code}
            </span>
          </div>
          <p style="font-size: 12px; color: #5B697D; margin: 0;">
            This code expires in 10 minutes. If you didn't request this,
            ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  await transport.sendMail(mailOptions);
}
```

### 23.5 auth.js — JWT Middleware

```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const header = req.headers.authorization;

  // Check if Authorization header exists and has Bearer prefix
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Missing or invalid authorization header',
    });
  }

  // Extract the token
  const token = header.split(' ')[1];

  try {
    // Verify token with secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user info to request
    next();              // Proceed to controller
  } catch (err) {
    // Differentiate between expired and invalid tokens
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

### 23.6 validate.js — Request Validation

```javascript
function validate(schema) {
  return (req, res, next) => {
    const errors = [];

    // Iterate through schema fields
    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];

      // Apply each rule to the field value
      for (const rule of rules) {
        if (rule === 'required' && (!value || !value.toString().trim())) {
          errors.push(`${field} is required`);
          break;
        }
        if (rule === 'email' && value &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push(`${field} must be a valid email`);
          break;
        }
        if (rule === 'password' && value && value.length < 6) {
          errors.push(`${field} must be at least 6 characters`);
          break;
        }
        if (rule === 'phone' && value &&
            !/^\+?\d{7,15}$/.test(value.replace(/[\s-]/g, ''))) {
          errors.push(`${field} must be a valid phone number`);
          break;
        }
        if (rule === 'name' && value && value.trim().length < 2) {
          errors.push(`${field} must be at least 2 characters`);
          break;
        }
        if (typeof rule === 'function') {
          const err = rule(value);
          if (err) errors.push(err);
        }
      }
    }

    // If validation errors exist, return 400
    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors,
      });
    }

    // No errors, proceed
    next();
  };
}
```

---

## 24. Testing Guide

### 24.1 Flutter Widget Tests

**Running tests:**
```bash
cd mobileapp
flutter test
```

**Current test file** (`test/widget_test.dart`):
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mobileapp/main.dart';

void main() {
  testWidgets('App loads splash screen', (WidgetTester tester) async {
    await tester.pumpWidget(const RabtaApp());
    expect(find.text('RABTA'), findsOneWidget);
    expect(find.text('Incident Management'), findsOneWidget);
  });
}
```

**Writing new tests:**

```dart
// Test that login page renders correctly
testWidgets('Login page shows form elements', (WidgetTester tester) async {
  await tester.pumpWidget(const MaterialApp(home: LoginPage()));
  await tester.pumpAndSettle();

  expect(find.text('Welcome Back'), findsOneWidget);
  expect(find.text('LOGIN'), findsOneWidget);
  expect(find.text('SIGN UP'), findsOneWidget);
  expect(find.byType(TextField), findsNWidgets(2)); // Email + Password
});

// Test that signup mode shows additional fields
testWidgets('Signup mode shows all fields', (WidgetTester tester) async {
  await tester.pumpWidget(const MaterialApp(home: LoginPage()));
  await tester.pumpAndSettle();

  // Tap "Sign Up" to toggle
  await tester.tap(find.text('Sign Up'));
  await tester.pumpAndSettle();

  expect(find.text('Create Account'), findsOneWidget);
  expect(find.text('REGISTER'), findsOneWidget);
  expect(find.text('BACK TO LOGIN'), findsOneWidget);
  expect(find.byType(TextField), findsNWidgets(5)); // All signup fields
});
```

### 24.2 Manual Test Cases

**Authentication Flow:**

| Test Case | Steps | Expected Result |
|-----------|-------|-----------------|
| Empty fields validation | Tap LOGIN with empty fields | Error displayed |
| Invalid email format | Enter "abc" in email, tap LOGIN | Error: invalid email |
| Password too short | Enter 3-char password, tap REGISTER | Error: min 6 characters |
| Passwords don't match | Enter different passwords in signup | Error: passwords mismatch |
| Successful registration | Fill all fields correctly, tap REGISTER | Navigate to verification screen |
| OTP auto-advance | Enter digits in verification boxes | Focus auto-advances |
| Wrong verification code | Enter wrong 6 digits, tap VERIFY | Error: invalid code |
| Successful verification | Enter correct code, tap VERIFY | Navigate to dashboard |
| Resend code | Tap "Resend code" after 30s | New code sent |
| Login - wrong password | Enter wrong password | Error: invalid credentials |
| Login - unverified | Enter correct creds for unverified account | Redirect to verification |
| Login - success | Enter correct creds for verified account | Navigate to dashboard |
| Logout | Tap logout icon | Navigate back to login |
| Auto-login | Kill app and reopen | Navigate directly to dashboard (if token valid) |

**Dashboard Tests:**

| Test Case | Steps | Expected Result |
|-----------|-------|-----------------|
| Greeting displays | Login successfully | Greeting card shows user's name |
| Stats load | Navigate to dashboard | 4 stat cards show "0" (no incidents yet) |
| Pull to refresh | Swipe down on dashboard | Refresh indicator appears |
| Tab switching | Tap Incidents tab | Shows placeholder |
| Profile loads | Tap Profile tab | Shows user name and email |
| Sign out from profile | Tap "Sign Out" in profile | Navigate to login |

### 24.3 Server Testing (Manual)

**Test the server with curl:**

```bash
# Health check
curl http://localhost:5001/health
# Expected: {"status":"ok","timestamp":"..."}

# Register
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456","name":"Test User","phone":"+923001234567"}'
# Expected: {"success":true,"message":"Verification code sent","email":"test@example.com"}

# Check MongoDB for OTP
mongosh --eval 'db.verification_codes.find({email:"test@example.com"})'

# Verify email (replace CODE with actual code from DB)
curl -X POST http://localhost:5001/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","code":"CODE"}'
# Expected: {"success":true,"token":"...","user":{...}}

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'
# Expected: {"success":true,"token":"...","user":{...}}

# Get Profile (replace TOKEN)
curl http://localhost:5001/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
# Expected: {"success":true,"user":{...}}
```

### 24.4 Postman Collection

Import this collection into Postman for API testing:

```json
{
  "info": {
    "name": "RABTA API",
    "description": "API collection for RABTA Incident Management System"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5001/health"
      }
    },
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:5001/api/auth/register",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"user@example.com\",\"password\":\"password123\",\"name\":\"Ahmed Khan\",\"phone\":\"+923001234567\"}"
        }
      }
    },
    {
      "name": "Verify Email",
      "request": {
        "method": "POST",
        "url": "http://localhost:5001/api/auth/verify-email",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"user@example.com\",\"code\":\"482917\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:5001/api/auth/login",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"user@example.com\",\"password\":\"password123\"}"
        }
      }
    },
    {
      "name": "Get Profile",
      "request": {
        "method": "GET",
        "url": "http://localhost:5001/api/auth/profile",
        "header": [{"key": "Authorization", "value": "Bearer {{token}}"}]
      }
    }
  ]
}
```

### 24.5 Planned Test Coverage

| Suite | Type | Files | Priority |
|-------|------|-------|----------|
| Auth flow | Widget test | `test/auth_test.dart` | High |
| Dashboard | Widget test | `test/dashboard_test.dart` | High |
| Verification | Widget test | `test/verification_test.dart` | High |
| Profile | Widget test | `test/profile_test.dart` | Medium |
| API endpoints | Integration test | `test/api_test.dart` | Medium |
| Server routes | Jest/Supertest | `__tests__/auth.test.js` | Medium |
| Server models | Unit test | `__tests__/user.test.js` | Low |

---

## 25. Database Migration Guide

### 22.1 Local to Atlas Migration

**Step 1:** Export local MongoDB data
```bash
mongodump --db disastermanagementmobileapp --out ./backup
```

**Step 2:** Import to MongoDB Atlas
```bash
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net" --db disastermanagementmobileapp ./backup/disastermanagementmobileapp
```

**Step 3:** Update `.env` with Atlas URI
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/disastermanagementmobileapp
```

### 22.2 Adding New Fields to User Schema

```javascript
// Example: Adding "role" field to User model
const userSchema = new mongoose.Schema({
  // ... existing fields
  role: {
    type: String,
    enum: ['admin', 'manager', 'reporter'],
    default: 'reporter',
  },
});

// For existing documents, set default value
await User.updateMany(
  { role: { $exists: false } },
  { $set: { role: 'reporter' } }
);
```

### 22.3 Creating Backups

```bash
# Automated backup script (save as backup.sh)
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups/$TIMESTAMP"
mkdir -p $BACKUP_DIR
mongodump --uri="$MONGODB_URI" --out $BACKUP_DIR
echo "Backup created: $BACKUP_DIR"

# Compress backup
tar -czf "$BACKUP_DIR.tar.gz" $BACKUP_DIR
rm -rf $BACKUP_DIR
echo "Backup compressed: $BACKUP_DIR.tar.gz"
```

---

## 23. Accessibility (a11y)

### 23.1 Current Accessibility Features

- **Text scaling:** Flutter automatically respects system font size settings
- **High contrast:** The midnight navy (#0F1B2D) on white (#FFFFFF) provides excellent contrast ratios
- **Touch targets:** All interactive elements are minimum 44×44px (Flutter's default minimum)
- **Semantic labels:** Icons have semantic meaning through their context
- **Error states:** Errors are displayed both visually (colored banners) and as text

### 23.2 Planned Accessibility Improvements

- **Screen reader support:** Add `Semantics` widgets with proper labels
- **Focus indicators:** Ensure keyboard navigation works
- **Reduced motion:** Respect `MediaQuery.disableAnimations`
- **Color-blind friendly:** Ensure status indicators use icons AND colors (not just colors)
- **Font scaling test:** Verify all screens at 200% font size

---

## 24. Analytics & Monitoring

### 24.1 Current Monitoring

- **Server logs:** Console-based logging with timestamps
- **Error tracking:** `console.error` for server-side errors
- **Health check:** `GET /health` endpoint for uptime monitoring

### 24.2 Recommended Production Monitoring

| Tool | Purpose | Setup |
|------|---------|-------|
| PM2 | Process management + logs | `pm2 install pm2-logrotate` |
| MongoDB Atlas Monitoring | Database performance | Built into Atlas dashboard |
| Uptime Robot | Uptime monitoring | Monitor /health endpoint |
| Sentry | Error tracking | Add Raven.js to server |
| Logtail | Log management | Pipe PM2 logs to Logtail |
| Prometheus + Grafana | Metrics + dashboards | Add prometheus client to Express |

### 24.3 Health Check Integration

The `/health` endpoint can be used by monitoring tools:

```bash
# Uptime Robot configuration
Monitor Type: HTTP
URL: https://rabta-api.example.com/health
Response contains: "ok"
Check interval: 5 minutes
Alert when: Down for 1 minute
```

---

## 25. Architecture Decision Records (ADRs)

### ADR-001: MongoDB over PostgreSQL

**Date:** 2024-01-15  
**Status:** Accepted  

**Context:** Need for a database that can handle variable incident schemas without migrations.

**Decision:** Use MongoDB as the primary database.

**Consequences:**
- (+) Flexible schema for incidents with varying fields
- (+) TTL indexes for automatic code expiry
- (+) Familiar JSON-like documents
- (-) No built-in joins (need application-level aggregation)
- (-) Less mature tooling for complex queries

### ADR-002: JWT over Session-based Auth

**Date:** 2024-01-15  
**Status:** Accepted  

**Context:** Need for stateless authentication that works across mobile and web clients.

**Decision:** Use JWT (JSON Web Tokens) with HS256 algorithm.

**Consequences:**
- (+) Stateless: no server-side session storage needed
- (+) Cross-platform: works with any HTTP client
- (+) Simple implementation with jsonwebtoken library
- (-) Token revocation requires a blacklist (not implemented yet)
- (-) Token size adds ~200 bytes to each request

### ADR-003: Nodemailer over Transactional Email API

**Date:** 2024-01-15  
**Status:** Accepted  

**Context:** Need for email delivery for verification codes.

**Decision:** Use Nodemailer with SMTP instead of a specific transactional email API.

**Consequences:**
- (+) Provider-agnostic: can switch between Brevo, SendGrid, Mailgun, etc.
- (+) Simple configuration with environment variables
- (+) No vendor lock-in
- (-) Requires SMTP credentials management
- (-) No built-in templates (custom HTML required)

### ADR-004: Flutter over React Native

**Date:** 2024-01-10  
**Status:** Accepted  

**Context:** Need for a cross-platform mobile app with a premium UI.

**Decision:** Use Flutter (Dart) as the mobile framework.

**Consequences:**
- (+) Single codebase for 6 platforms
- (+) Native performance via Dart compilation
- (+) Excellent Google Fonts integration
- (+) Material Design 3 support
- (-) Larger app size than native
- (-) Smaller ecosystem than React Native (but growing)

---

## 26. Project Metrics

### Codebase Statistics

| Metric | Value |
|--------|-------|
| Total Files | 65+ |
| Lines of Dart Code | ~2,500 |
| Lines of JavaScript Code | ~400 |
| Lines of Documentation | ~4,000 |
| Total Flutter Screens | 4 |
| Total API Endpoints | 7 |
| MongoDB Collections | 2 |
| Platform Targets | 6 |

### Dependency Count

| Platform | Direct Dependencies |
|----------|-------------------|
| Flutter | 4 (google_fonts, http, shared_preferences, cupertino_icons) |
| Server | 7 (express, mongoose, bcryptjs, jsonwebtoken, nodemailer, cors, helmet, dotenv) |

### Test Coverage

| Type | Coverage | Status |
|------|----------|--------|
| Widget tests | 1 test | ✅ Passing |
| Integration tests | 0 | 📋 Planned |
| Server tests | 0 | 📋 Planned |
| E2E tests | 0 | 📋 Future |

---

## 27. Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface — the set of endpoints the server exposes |
| **bcrypt** | A password hashing function that includes salt to protect against rainbow table attacks |
| **Brevo** | (formerly Sendinblue) An email marketing and transactional email platform |
| **CRUD** | Create, Read, Update, Delete — the four basic operations for data management |
| **Dart** | The programming language used by Flutter |
| **Flutter** | Google's UI toolkit for building natively compiled applications from a single codebase |
| **JWT** | JSON Web Token — a compact, URL-safe token format for authentication |
| **MongoDB** | A NoSQL document database that stores data in flexible, JSON-like documents |
| **Mongoose** | An ODM (Object Document Mapper) for MongoDB and Node.js |
| **Nodemailer** | A Node.js module for sending emails via SMTP |
| **ODM** | Object Document Mapper — maps between application objects and database documents |
| **OTP** | One-Time Password — a code sent to the user's email for verification |
| **REST** | Representational State Transfer — an architectural style for API design |
| **SMTP** | Simple Mail Transfer Protocol — the standard protocol for email transmission |
| **TTL** | Time-To-Live — an index that automatically deletes documents after a specified time |
| **VPS** | Virtual Private Server — a virtual machine used for hosting applications |

---

## 28. System Requirements

### Development Machine

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | Dual-core 2.0 GHz | Quad-core 2.5 GHz+ |
| RAM | 8 GB | 16 GB+ |
| Storage | 10 GB free | 20 GB+ free (SSD) |
| OS | Windows 10 / macOS 12 / Ubuntu 20.04 | Windows 11 / macOS 14 / Ubuntu 24.04 |
| Internet | Broadband | Broadband |

### Production Server

| Component | Minimum (Low Traffic) | Recommended (Production) |
|-----------|----------------------|-------------------------|
| CPU | 1 vCPU | 2+ vCPU |
| RAM | 512 MB | 2 GB+ |
| Storage | 1 GB | 10 GB+ |
| Node.js | 18.x | 22.x LTS |
| MongoDB | 5.x | 7.x |

### Mobile Device

| Platform | Minimum OS | Recommended |
|----------|-----------|-------------|
| Android | Android 5.0 (API 21) | Android 12+ (API 31) |
| iOS | iOS 12 | iOS 16+ |
| Web | Chrome 90+ / Safari 15+ | Latest browsers |

---

## 29. Quick Reference Cards

### API Endpoints Cheat Sheet

```
POST   /api/auth/register     → Register user
POST   /api/auth/verify-email → Verify email with code
POST   /api/auth/resend-code  → Resend verification code
POST   /api/auth/login        → Login and get JWT
GET    /api/auth/profile      → Get user profile (Auth)
PUT    /api/auth/profile      → Update user profile (Auth)
GET    /health                 → Health check
```

### Flutter Commands Cheat Sheet

```bash
# Development
flutter pub get              # Get dependencies
flutter run                  # Run on connected device
flutter run -d chrome        # Run on web
flutter run -d android       # Run on Android
flutter run -d ios           # Run on iOS

# Building
flutter build apk --release  # Build Android APK
flutter build ios --release  # Build iOS
flutter build web            # Build web
flutter build appbundle      # Build Android App Bundle

# Testing & Analysis
flutter test                 # Run tests
dart analyze lib/            # Analyze Dart code
flutter clean                # Clean build cache
```

### Server Commands Cheat Sheet

```bash
# Running
npm run dev      # Development with auto-reload
npm start        # Production

# Dependencies
npm install      # Install dependencies
npm update       # Update dependencies
npm audit fix    # Fix vulnerabilities

# Database
mongosh          # MongoDB shell
mongodump        # Backup database
mongorestore     # Restore database
```

---

## Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the code style guide
4. **Test your changes:**
   ```bash
   cd mobileapp && flutter test
   cd server && npm test (when available)
   ```
5. **Commit your changes:**
   ```bash
   git commit -m "feat(scope): description of changes"
   ```
6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** describing your changes

### Development Setup

```bash
# Clone the repo
git clone https://github.com/your-repo/IncidentMangementSystem.git
cd IncidentMangementSystem

# Set up server
cd server
npm install
cp .env.example .env
# Edit .env with your values

# Set up Flutter app
cd ../mobileapp
flutter pub get

# Run both:
# Terminal 1: cd server && npm run dev
# Terminal 2: cd mobileapp && flutter run
```

---

## 16. License

This project is developed for academic purposes at COMSATS University Islamabad, Abbottabad Campus.

```
MIT License

Copyright (c) 2024 COMSATS University Islamabad, Abbottabad Campus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 17. Acknowledgments

**Course:** Mobile Application Course (6th Semester)  
**University:** COMSATS University Islamabad, Abbottabad Campus  
**Instructor:** [Instructor Name]  

**Technologies Used:**
- [Flutter](https://flutter.dev) — UI framework
- [Google Fonts](https://fonts.google.com) — Sora & DM Sans typefaces
- [Node.js](https://nodejs.org) — Backend runtime
- [Express](https://expressjs.com) — Web framework
- [MongoDB](https://mongodb.com) — Database
- [Mongoose](https://mongoosejs.com) — ODM
- [Nodemailer](https://nodemailer.com) — Email delivery
- [Brevo](https://brevo.com) — SMTP relay
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — Password hashing
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — JWT

**Design Inspiration:**
- Modern mobile app design patterns from leading fintech and productivity apps
- Material Design 3 guidelines
- Brutalist web design principles (adapted for mobile)

---

<div align="center">

**RABTA — Incident Management System**  
*Built with ❤️ at COMSATS University Islamabad, Abbottabad Campus*

</div>
