# Washing Machine & Water Filter Store - Implementation Plan

## Project Overview

A premium e-commerce platform for "Almarkaz Alhandasy" selling washing machine parts and water filters.
Features include appointment booking for repairs, a store locator map, and a comprehensive admin dashboard.

## Stack Decisions

- **Framework**: Next.js 16 (App Router)
- **Language**: **Arabic Only** (RTL Layout, no `next-intl`).
- **Runtime**: Bun (`/home/alotfy/.bun/bin/bun`)
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS + Shadcn UI (RTL Configured)
- **Fonts**: Cairo or Tajawal (Google Fonts)
- **Maps**: Leaflet (Google Maps Style)
- **Deployment**: Vercel (recommended) or user's VPS.

## Core Features Breakdown

### 1. Product Catalog

- **Top Categories**:
  - Washing Machines
  - Water Filters
- **Sub-Categories**:
  - Parts (Belts, Motors, Filters, Cartridges, etc.)
  - Machines/Units (if selling full units)
- **Product Details**:
  - Images, Price, Stock Status, Compatibility List (e.g., "Fits LG Model X").

### 2. Appointments & Services

- **Service Types**:
  - Repair (Washing Machine)
  - Installation (Water Filter)
  - Maintenance
- **Flow**:
  - User selects Service -> Selects Date/Time -> Enters Address/Location -> Confirms.

### 3. Location & Map

- Use **Leaflet** with a "Google Maps" styled tile provider (e.g., CartoDB Voyager or similar).
- Show store location.
- (Optional) Allow user to pin their location for appointments.

### 4. Admin Dashboard

- **Overview**: Sales stats, upcoming appointments.
- **Products**: CRUD for Parts and Filters.
- **Appointments**: Calendar view, Status updates (Pending -> Confirmed -> Completed).
- **Settings**: Store hours, Service areas.

## Architecture

### Directory Structure (Feature-Driven)

```
src/
  features/
    store/          # Product listing, cart
    appointments/   # Booking logic, calendar
    admin/          # Dashboard components
    map/            # Map integration
  components/       # Shared UI (Button, Input)
  db/               # Drizzle schema & connection
  lib/              # Utilities
```

## Next Steps

1. Initialize Project (Next.js 16).
2. Setup Database Schema (Drizzle).
3. Build Layout & Landing Page.
