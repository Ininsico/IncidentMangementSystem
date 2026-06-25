# Incident Management System

Semester project for Mobile Application Course (6th Semester) @ COMSATS University Islamabad, Abbottabad Campus.

## Overview

A mobile-based incident management system that enables users to report, track, and resolve incidents efficiently. The system consists of a Flutter mobile application with a Node.js backend server.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Mobile Application | Flutter / Dart |
| Backend Server | Node.js |
| UI Design Language | Brutalism |
| Color Scheme | Coffee Brown (#4A3728) & Warm White (#FFF8F0) |

## Project Structure

```
IncidentMangementSystem/
├── mobileapp/                  # Flutter mobile application
│   ├── lib/
│   │   ├── main.dart           # Application entry point
│   │   └── screens/
│   │       ├── splash_screen.dart    # Loading screen with branding
│   │       └── landing_page.dart     # Authentication (Login/Sign Up)
│   ├── assests/
│   │   └── logo.png            # Application logo
│   ├── android/                # Android platform files
│   ├── ios/                    # iOS platform files
│   ├── web/                    # Web platform files
│   └── test/                   # Unit tests
├── server/                     # Node.js backend
│   └── package.json
└── deployement/                # Deployment configuration
```

## Getting Started

### Prerequisites

- Flutter SDK (v3.11.5 or later)
- Node.js
- Android Studio / Xcode (for platform builds)

### Installation & Running

**Mobile Application**

```bash
cd mobileapp
flutter clean
flutter pub get
flutter run
```

**Backend Server**

```bash
cd server
npm install
npm start
```

### Building for Production

```bash
flutter build apk          # Android APK
flutter build ios          # iOS build (macOS only)
flutter build web          # Web deployment
```

## Application Screens

1. **Splash Screen** — Displays the application logo with a segmented loading bar. Automatically transitions to the login screen after loading completes.

2. **Login Page** — Provides email and password authentication with options to log in or sign up.

## License

This project is developed for academic purposes at COMSATS University Islamabad, Abbottabad Campus.
