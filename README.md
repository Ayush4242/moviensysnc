# DriveHub - Enterprise Workplace & Transport Management MVP

DriveHub is a clean, modern, beginner-friendly workplace and transport management dashboard designed for college/company placement assignments. It delivers a simple, functional MVP covering three core operational modules: **Visitor Management**, **Vendor / Driver / Vehicle Management**, and **Shuttle Management**.

---

## 🚀 Tech Stack

- **Frontend**: React.js (v19), Vite, Tailwind CSS, React Router DOM, Axios, Lucide React icons
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT authentication, bcryptjs, REST APIs

*No overly complex design patterns, microservices, Redux, Docker, WebSockets, or third-party cloud services are used—making the entire project straightforward to explain during interviews or code reviews.*

---

## 📁 Folder Structure

```
drivehub/
│
├── client/                      # Frontend Vite + React + Tailwind App
│   ├── src/
│   │   ├── components/          # Reusable UI components (Modal, StatusBadge, StatCard)
│   │   ├── context/             # AuthContext (JWT state management & user profile)
│   │   ├── layouts/             # DashboardLayout (Top Navbar + Sidebar)
│   │   ├── pages/
│   │   │   ├── auth/            # LoginPage
│   │   │   ├── dashboard/       # DashboardPage
│   │   │   ├── visitors/        # VisitorsPage
│   │   │   ├── vendors/         # VendorsPage, DriversPage, VehiclesPage
│   │   │   └── shuttle/         # RoutesPage, BookingsPage, DriverSchedulePage
│   │   ├── services/            # Axios API instance (api.js)
│   │   ├── App.jsx              # Main routes and protected route guards
│   │   ├── main.jsx             # React DOM root entry
│   │   └── index.css            # Tailwind directives
│   ├── package.json
│   └── .env
│
├── server/                      # Backend Express + Node + Mongoose API
│   ├── config/                  # db.js (MongoDB connection)
│   ├── controllers/             # Endpoint controllers for all models
│   ├── middleware/              # authMiddleware.js (JWT verify & role authorization)
│   ├── models/                  # Mongoose Schemas (User, Visitor, Vendor, Driver, Vehicle, Route, Booking, Schedule)
│   ├── routes/                  # Express route handlers
│   ├── seed/                    # seed.js script for sample evaluation data
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

---

## 🔑 Login Credentials (Seed Data)

Running the seed script pre-populates all role accounts with password `password123`:

| Role | Email | Password | Allowed Capabilities |
| --- | --- | --- | --- |
| **ADMIN** | `admin@drivehub.com` | `password123` | Full access to all modules, management, approvals, check-ins & deletes |
| **EMPLOYEE** | `employee@drivehub.com` | `password123` | Register/view visitors, create shuttle bookings, view routes |
| **SECURITY** | `security@drivehub.com` | `password123` | View visitors list, perform Check-In and Check-Out actions |
| **SUPER VENDOR** | `vendor@drivehub.com` | `password123` | Manage vendor hierarchy, move vendors, toggle delegation, assign drivers & vehicles |
| **SUB VENDOR** | `subvendor@drivehub.com` | `password123` | Manage assigned drivers and vehicles |
| **DRIVER** | `driver@drivehub.com` | `password123` | View assigned shuttle details and driver schedules |

---

## ⚙️ Installation & Setup Instructions

### 1. Prerequisites
- **Node.js**: (v18 or higher installed)
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` (or MongoDB Compass/Community Server).

### 2. Backend Setup
```bash
cd server
npm install
npm run seed     # Seeds database with initial sample users, vendors, visitors, routes, and schedules
npm run dev      # Starts server on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal tab:
```bash
cd client
npm install
npm run dev      # Starts client on http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/drivehub
JWT_SECRET=drivehub_jwt_secret_key_12345
```

### Frontend (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📌 Modules & Core Features

### 1. Visitor Management
- **Visitor Registration**: Name, contact details, company, host employee, purpose, visit date & time window.
- **Approval Workflow**: Host employees/Admins approve or reject `PENDING` visitor requests.
- **Security Check-In/Check-Out**: Security staff check in approved visitors (`CHECKED_IN`) and record automated timestamps (`checkInTime`, `checkOutTime`).
- **Pre-Approval Badge**: Visitors approved for today's date automatically display a "Pre-approved" status.

### 2. Vendor / Driver / Vehicle Management
- **Multi-Level Vendor Hierarchy**: Supports Super, Regional, and City vendors using `parentVendor` references.
- **Move Vendor Action**: Re-assign parent vendors dynamically.
- **Fleet Delegation**: Toggle fleet management permission (`canManageFleet`).
- **Driver Compliance**: Track driver licenses and documents (`RC`, `Permit`, `Pollution Certificate`) with automated `Expired` status flagging for past dates.
- **Vehicle Fleet**: Track registration number, model, seating capacity, fuel type, vendor, and driver assignment.

### 3. Shuttle Management
- **Fixed Routes**: Define pickup & drop locations with standard operating times.
- **Employee Seat Bookings**: Book shuttle seats, assign drivers, and manage booking statuses (`PENDING`, `CONFIRMED`, `CANCELLED`).
- **Driver Schedule Matrix**: Hourly duty & break schedule timeline matrix for quick visual inspection.

---

## 🛠️ API Overview

- **Auth**: `POST /api/auth/login`, `GET /api/auth/me`, `GET /api/auth/users`
- **Visitors**: `GET /api/visitors`, `POST /api/visitors`, `PUT /api/visitors/:id/approve`, `PUT /api/visitors/:id/check-in`
- **Vendors**: `GET /api/vendors`, `POST /api/vendors`, `PUT /api/vendors/:id/move`, `PUT /api/vendors/:id/delegation`
- **Drivers**: `GET /api/drivers`, `POST /api/drivers`, `DELETE /api/drivers/:id`
- **Vehicles**: `GET /api/vehicles`, `POST /api/vehicles`, `DELETE /api/vehicles/:id`
- **Routes**: `GET /api/routes`, `POST /api/routes`, `DELETE /api/routes/:id`
- **Bookings**: `GET /api/bookings`, `POST /api/bookings`, `PUT /api/bookings/:id/cancel`
- **Schedules**: `GET /api/schedules`, `POST /api/schedules`, `DELETE /api/schedules/:id`

---

## 📊 Basic Algorithmic Complexity

- **Visitor List Retrieval**: $O(n)$ where $n$ is the number of visitor documents returned by Mongoose `.find()`.
- **Vendor Hierarchy Tree Traversal**: $O(n)$ recursive filtering over the in-memory array of vendors to build parent-child nodes.
- **Driver Document Expiry Check**: $O(d)$ where $d$ is the number of documents per driver (constant $d \le 4$).
- **Hourly Schedule Matrix Lookups**: $O(s \times h)$ where $s$ is the number of active schedules on a target date and $h$ is the fixed number of operating hours ($h = 10$).
