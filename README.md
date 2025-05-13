# Stia - Multi-Tenant Vacation Property Management Web App

## Overview

Stia is a modern, responsive web application designed for managing shared vacation properties among family members and friends. It provides a seamless experience for coordinating reservations, maintenance tasks, house manuals, inventory, and recommendations for multiple property groups.

## Features

- **Multi-Tenant Architecture**: Supports multiple property groups with tenant isolation.
- **User Authentication**: Multi-provider authentication (email/password and Google OAuth).
- **Property Management**: Manage multiple properties with detailed information.
- **Reservation System**: Interactive calendar for managing reservations and conflicts.
- **House Manual**: Rich-text content with media support and version tracking.
- **Maintenance Tracking**: Create and manage maintenance tasks with notifications.
- **Inventory Management**: Track inventory and maintenance schedules.
- **Notes & Recommendations**: User-generated notes and recommendations with ratings.
- **Custom Checklists**: Templates for arrival/departure and maintenance tasks.
- **Contact Directory**: Comprehensive list of contacts for emergencies and services.

## Technology Stack

- **Frontend**: Next.js 14+, React 19+, Tailwind CSS
- **Backend/API**: Next.js API Routes, NextAuth.js (JWT)
- **Database**: PostgreSQL via Supabase, Prisma ORM
- **File Storage**: Supabase Storage
- **Notifications**: OneSignal or Firebase Cloud Messaging
- **Email Services**: Resend or SendGrid
- **Analytics**: Vercel Analytics or Google Analytics
- **Hosting**: Vercel, with CI/CD using GitHub Actions
- **Monitoring**: Vercel monitoring, Sentry for error tracking

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL database (hosted on Supabase)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd stia
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Initialize the database:
   ```
   npx prisma migrate dev
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## Development Roadmap

- **Phase 1**: Foundation - Project setup, authentication, and tenant management.
- **Phase 2**: Core Features - Property management and reservation system.
- **Phase 3**: Enhanced Features - Inventory, checklists, and recommendations.
- **Phase 4**: Polish & Optimization - UI/UX improvements and performance tuning.
- **Phase 5**: Launch - Security audits and deployment.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.