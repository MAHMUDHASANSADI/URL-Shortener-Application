# URL Shortener Application

A full-stack URL shortening application built with Laravel, React, Inertia.js, Tailwind CSS, and Ant Design.

---

# Features

## Authentication

* User registration
* User login/logout
* Protected dashboard routes

## URL Management

* Create shortened URLs
* Generate unique short codes
* Custom short code support
* Edit existing URLs
* Delete URLs

## URL Redirection

* Redirect shortened URLs to original URLs
* Expiration date support for links

## Dashboard

* View all shortened URLs
* Display:

  * Original URL
  * Short URL
  * Created date
  * Expiration date
  * Click count / analytics

## Analytics & Tracking

* Click tracking
* URL analytics support
* Track total visits per shortened URL

## Extra Features

* Copy-to-clipboard functionality
* Pagination support

---

# Tech Stack

## Backend

* Laravel 12
* MySQL
* Repository Pattern

## Frontend

* React.js
* Inertia.js
* Tailwind CSS
* Ant Design

## Development Tools

* Vite
* Composer
* NPM

---

# Architecture Overview

The application follows a monolithic full-stack architecture using Laravel and Inertia.js.

## Backend Structure

* MVC Architecture
* Repository Pattern for data access abstraction
* Form validation using Laravel validation system

## Frontend Structure

* React components with Inertia.js
* Ant Design components for UI
* Tailwind CSS for layout and styling

---

# Database Design

## users Table

Stores authenticated users.

## urls Table

Stores shortened URLs and analytics-related information.

### Main Fields

* original_url
* short_code
* click_count
* expires_at

### Relationship

* One user can have many URLs
* Each URL belongs to one user

---

# Assumptions Made

* Authentication is required to manage URLs
* Short URLs use the `/s/{code}` format to avoid route conflicts
* Expired links should no longer redirect
* Custom short codes must remain unique
* Analytics are based on total click count tracking

---

# Project Setup Instructions

## 1. Clone Repository

```bash id="rnp9g4"
git clone <repository-url>
cd url-shortener
```

---

## 2. Install PHP Dependencies

```bash id="zv5f2n"
composer install
```

---

## 3. Install Node Dependencies

```bash id="t4hjlwm"
npm install
```

---

## 4. Configure Environment

Copy `.env.example`:

```bash id="y0nt4q"
cp .env.example .env
```

Update database credentials in `.env`:

```env id="xg6s8x"
DB_DATABASE=url_shortener
DB_USERNAME=root
DB_PASSWORD=
```

---

## 5. Generate Application Key

```bash id="l6qb0m"
php artisan key:generate
```

---

## 6. Run Database Migration

```bash id="j0lq9x"
php artisan migrate
```

---

# How to Run the Project

## Terminal 1 — Start Laravel Server

```bash id="9h6x8j"
php artisan serve
```

---

## Terminal 2 — Start Vite Server

```bash id="epr6b8"
npm run dev
```

---

# Access Application

Open in browser:

```plaintext id="u9e3wj"
http://127.0.0.1:8000
```

---

# Default Application Flow

1. Register/Login
2. Access dashboard
3. Create shortened URL
4. Manage URLs
5. Copy and share short URL
6. Track analytics and clicks

---

# Security Considerations

* Authentication middleware protection
* User-specific URL ownership validation
* Input validation for URLs
* Unique short code validation
* Expiration validation for links

---
