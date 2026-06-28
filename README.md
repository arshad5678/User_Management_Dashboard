# User Management Dashboard

## Project Overview
This project is a single-page administration dashboard built with **React**, **Axios**, and the **JSONPlaceholder API**. It is designed to give administrators a clean, responsive interface to manage mock user data. It simulates full CRUD (Create, Read, Update, Delete) workflows in real-time, matching standard SaaS admin layout patterns.

---

## Features
- **View Users**: Displays a clear user table with customized loading skeletons and row hovers.
- **Search**: Full-width search bar to filter users by first name, last name, or email in real-time.
- **Filter**: Advanced filter modal to perform logical AND matching across name, email, and department. Includes indicator counts on the filter button.
- **Sorting**: Toggle table headers (ID, Name, Email, Department) ascending or descending.
- **Pagination**: Navigate pages with numerical button highlights, custom page sizing dropdowns (10, 25, 50, 100), and auto-resets when parameters modify.
- **Add User**: Modal form with focused fields and input layouts.
- **Edit User**: Reuses the modal form component in edit mode, pre-populating fields and preserving data bindings.
- **Delete User**: Deletion overlay warnings containing user initials avatars, loading button labels, and 300ms row fade-out slide transitions.
- **Form Validation**: Centralized validation utils that trim leading/trailing white space and focus the first invalid input automatically.
- **Error Handling**: Standardized, user-friendly error banners (e.g. "Unable to fetch users") instead of exposing raw network reports.
- **Responsive Design**: Adapts layout wrappers, buttons, and scrolls table overflow horizontally on tablets and mobile screens.

---

## Tech Stack
- **React 18**: Dynamic UI rendering, state hooks, side-effects, and form refs.
- **JavaScript (ES6+)**: Advanced array mutations and search pipelines.
- **Axios**: Promised-based HTTP requests.
- **Vanilla CSS**: CSS Custom Properties (variables), scale pop keyframe transitions, and responsive grid layouts.
- **Vite**: Ultra-fast frontend build tool and dev server.

---

## Folder Structure
```
user-management-dashboard/
├── public/                 # Static assets (favicons, SVG icons)
├── src/
│   ├── api/                # Axios API call service layer (userService.js)
│   ├── components/         # Modular React UI components (Header, Table, Row, Form, Modals)
│   ├── hooks/              # Custom hooks (useUsers.js for state fetching)
│   ├── styles/             # Global stylesheet (global.css)
│   ├── utils/              # Validator helpers, constants (validators.js)
│   ├── main.jsx            # Application entry mount point
│   └── App.jsx             # Main container state manager and search/filter pipelines
├── package.json            # Node project configuration and dependencies
└── README.md               # Documentation
```

---

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then run the following commands:

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser:
   Navigate to `http://localhost:5173/` to view the dashboard.

---

## API
This project integrates with the public **JSONPlaceholder API** (`https://jsonplaceholder.typicode.com/users`):
- Fetching users is performed via a real network request on load.
- Creating (`POST`), editing (`PUT`), and deleting (`DELETE`) users are sent to the API to simulate network delays and verify payload structure. The local state array is updated immediately to reflect changes on screen.

---

## Assumptions
- **First and Last Name Splitting**: The JSONPlaceholder API returns user names as a single `"name"` string. During the initial load, this field is split by white space into `"firstName"` and `"lastName"` to populate the multi-column table layout.
- **Department Association**: The API does not provide a department field. Users are initially assigned a default value of `"IT"` on load. Administrators can customize or change the department (IT, HR, Engineering, Finance, Sales, Marketing, Operations, Support) when editing or creating records.

---

## Challenges
- **Fake API Constraints**: Because JSONPlaceholder is a mock read-only API, database changes do not persist. Managing state locally (accruing mock IDs by finding the max ID, tracking inline edits, and handling simulated deletions) was required to keep the screen reflecting actions correctly.
- **UI State Synchronization**: Designing animations required precise state timing. For example, during deletion, the modal is closed immediately to reveal the table, but the targeted user state filtration is delayed by `300ms` via a `setTimeout` to let the row slide and fade out completely.
- **Pipeline Order**: Managing a multi-stage data pipeline (`Original ➔ Search ➔ Filter ➔ Sort ➔ Pagination`) required care to ensure search queries reset the current page to 1, range summary labels calculated correctly, and deletions on the boundary navigated users back one page.

---

## Future Improvements
- **Authentication**: Secure login page with route guards and session tokens.
- **Real Backend Integration**: Link with a real database (Node.js/Express/MongoDB) to persist user list edits permanently.
- **Role Management**: Add role scopes (e.g. Admin, Manager, Read-Only) to restrict edit/delete capabilities.
- **Export Users**: Add buttons to download current filtered tables as CSV or Excel sheets.
- **Bulk Delete**: Checklist columns to select and batch-delete multiple records at once.

---

## Author
**SK Arshad Basha**
