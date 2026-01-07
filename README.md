# User Management + Analytics Dashboard

**🔗 [Live Demo](https://user-dashboard-psi-three.vercel.app/users)**

A modern, responsive Admin Dashboard built with React and Tailwind CSS. It features user management (CRUD-like operations), real-time filtering/sorting, and visual analytics.

## 🚀 How to Run

1.  **Clone the repository** (if applicable) or navigate to the project folder.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
4.  **Open in Browser**:
    The app usually runs at `http://localhost:5173`.

## 🛠 Libraries & Tech Stack

*   **Frontend Framework**: [React](https://react.dev/) (Vite)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4) - Utility-first CSS framework.
*   **Routing**: [React Router DOM](https://reactrouter.com/) - For client-side navigation.
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight global state management for users and filters.
*   **Charts**: [Recharts](https://recharts.org/) - Composable charting library for the Analytics page.
*   **Icons**: Heroicons (SVG)

## 🏗 Architecture & Design Choices

### 1. **Global State Management (Zustand)**
We chose **Zustand** over Redux or Context API because:
*   **Simplicity**: It requires minimal boilerplate code.
*   **Performance**: It allows components to subscribe only to specific slices of state, reducing unnecessary re-renders (e.g., searching/filtering users).
*   **Scalability**: Easy to extend for future features like persistent auth state.

### 2. **Component-Based Architecture**
The project is structured to maximize reusability:
*   **`src/components/common`**: Reusable primitives like `Modal`, `LoadingSpinner`, and `Skeleton`.
*   **`src/components/layout`**: Layout-specific components (`Sidebar`, `Header`).
*   **`src/pages`**: View-logic separated by domain (`Users`, `Analytics`).

### 3. **Performance Optimizations**
*   **Debounced Search**: The user list search input uses a custom debounce logic (300ms) to prevent excessive state updates and lag while typing.
*   **Lazy Loading**: Pages (`UsersList`, `UserDetails`, `Analytics`) are lazy-loaded using `React.lazy` and `Suspense` to reduce the initial bundle size.

### 4. **Design System**
*   **Dark Sidebar / Light Content**: Implemented a "Blackish" premium sidebar to distinguish navigation from the main workspace.
*   **Responsive**: The layout adapts to mobile devices, hiding the sidebar or making it collapsible (logic ready for expansion).

## 📂 Project Structure

```bash
src/
├── components/
│   ├── common/        # Generic UI components (Modal, Spinner)
│   ├── layout/        # Sidebar, Header
│   └── loaders/       # Skeleton Loaders
├── data/              # Mock Data (users.js)
├── pages/             # Route Components
│   ├── Analytics/
│   └── users/
├── store/             # Global State (Zustand)
├── App.jsx            # Main Router & Layout
└── main.jsx           # Entry Point
```
