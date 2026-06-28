# User Management Dashboard

A responsive, high-fidelity User Management Dashboard built with **React**, **Vite**, and **Vanilla CSS**. The application fetches user data from the JSONPlaceholder API, enables full CRUD (Create, Read, Update, Delete) capability locally, and features custom search, filters, and paginations with a sleek, SaaS-style visual layout.

## Tech Stack
- **Frontend Framework**: React 18+ (hooks, refs, side-effects)
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS variables, custom keyframes, responsive media queries)
- **HTTP Client**: Axios (for API fetching and mock submissions)

---

## Key Features

### 1. CRUD Operations
- **Add User**: Centered modal form with full inputs for First Name, Last Name, Email, and Department.
- **Edit User**: Prefills selected row info in the reusable form modal, saving updates back to state.
- **Delete User**: Triggers a delete confirmation dialog showcasing the user's details and colored initials avatar.

### 2. Search, Filter, & Sorting Pipeline
- **Global Search**: Filters list by First/Last Name and Email dynamically as you type (includes inline clear `×` button).
- **Advanced Filtering**: Modal filter popup allowing multi-field matches (First Name, Last Name, Email, Department). Shows active badge counts on the Filter button.
- **Column Sorting**: Toggle columns (ID, First Name, Last Name, Email, Department) ascending or descending with active indicators.

### 3. Custom Pagination
- Slips pagination rules to the end of the pipeline.
- Custom dropdown selects (10, 25, 50, 100 per page).
- Dynamically highlights active numerical page buttons.
- Pagination summary displays details (e.g. `Showing 11–20 of 42 users`).
- **Auto-Reset**: Returns pagination automatically to page 1 on any search, filter, or page size modifications.

### 4. SaaS Visual Polish & Transitions
- **Theme Switcher**: Global Light/Dark mode switcher in the header.
- **Metrics Summary Cards**: High-level visual statistics cards showing Total Users, active Departments count, and the Latest Addition.
- **Table Skeletons**: Displays shimmering placeholder rows during initial data fetch.
- **Pure CSS Empty State**: Revolving dashed circle illustration and magnifying glass details if query matches return zero entries.
- **Row Transitions**: Added `row-fade-out` animation keyframes sliding elements horizontally on deletion before table updates.

---

## Local Setup

Follow these steps to run the application on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arshad5678/User_Management_Dashboard.git
   cd User_Management_Dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:5173/](http://localhost:5173/) to test the dashboard.
