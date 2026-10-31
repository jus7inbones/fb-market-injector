# Facebook Marketplace Sandboxed Admin Portal

A lightweight, isolated admin interface for staging and dispatching Facebook Marketplace listing payloads.

## Features
- Strict Security Headers via `helmet` and Content Security Policy (CSP).
- Minimalist, distraction-free input-only administrative dashboard.
- RESTful middleware API for receiving, validating, and formatting marketplace listings.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env` and configure your credentials:
   ```bash
   cp .env.example .env
   ```

3. **Run Application**
   ```bash
   # Production
   npm start

   # Development
   npm run dev
   ```

4. **Access Portal**
   Open your browser to `http://localhost:3000`
