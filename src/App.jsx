import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Lazy Load Pages
const UsersList = lazy(() => import("./pages/users/UsersList"));
const UserDetails = lazy(() => import("./pages/users/UserDetails"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { UsersListSkeleton, UserDetailsSkeleton } from "./components/loaders/PageSkeletons";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header />

          <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full">
            <Routes>
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/users" replace />} />

              {/* Users - Specific Skeleton */}
              <Route
                path="/users"
                element={
                  <Suspense fallback={<UsersListSkeleton />}>
                    <UsersList />
                  </Suspense>
                }
              />

              <Route
                path="/users/:id"
                element={
                  <Suspense fallback={<UserDetailsSkeleton />}>
                    <UserDetails />
                  </Suspense>
                }
              />

              {/* Analytics - Generic Spinner for now */}
              <Route
                path="/analytics"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Analytics />
                  </Suspense>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/users" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
