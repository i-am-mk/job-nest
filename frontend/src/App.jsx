import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy loading components
const SignIn = lazy(() => import("./components/auth/SignIn"));
const Register = lazy(() => import("./components/auth/Register"));
const Navbar = lazy(() => import("./components/common/Navbar"));
const Footer = lazy(() => import("./components/common/Footer"));
const NotFound = lazy(() => import("./components/common/NotFound"));

const JobListings = lazy(() => import("./components/JobListings"));
const Profile = lazy(() => import("./components/user/profile/Profile"));
const JobDetails = lazy(() => import("./components/JobDetails"));

const JobAdminDetails = lazy(
  () => import("./components/admin/jobs/JobDetails")
);
const Companies = lazy(() => import("./components/admin/companies/Companies"));
const CreateCompany = lazy(
  () => import("./components/admin/companies/CreateCompany")
);
const Jobs = lazy(() => import("./components/admin/jobs/Jobs"));
const CreateJob = lazy(() => import("./components/admin/jobs/CreateJob"));
const CompanyDetails = lazy(
  () => import("./components/admin/companies/CompanyDetails")
);
const JobApplicantList = lazy(
  () => import("./components/admin/jobs/JobApplicantList")
);
const OtpVerification = lazy(() => import("./components/auth/OtpVerification"));
const User = lazy(() => import("./components/user/User"));

// Layout component for Navbar and Footer
const Layout = ({ children }) => (
  <div>
    <Suspense fallback={<div>Loading Navbar...</div>}>
      <Navbar />
    </Suspense>
    <main>{children}</main>
    <Suspense fallback={<div>Loading Footer...</div>}>
      <Footer />
    </Suspense>
  </div>
);

// Route definition
const routes = [
  { path: "/", element: <User /> },
  { path: "/signin", element: <SignIn />, isAuthPage: true },
  { path: "/register", element: <Register />, isAuthPage: true },
  { path: "/otpverification", element: <OtpVerification />, isAuthPage: true },
  { path: "/profile", element: <Profile /> },
  { path: "/joblistings", element: <JobListings /> },
  { path: "/details/:id", element: <JobDetails /> },
  // Admin routes
  { path: "/admin/companies", element: <Companies /> },
  { path: "/admin/createcompany", element: <CreateCompany /> },
  { path: "/admin/createjob", element: <CreateJob /> },
  { path: "/admin/jobs", element: <Jobs /> },
  { path: "/admin/companies/:id", element: <CompanyDetails /> },
  { path: "/admin/jobs/:id", element: <JobAdminDetails /> },
  { path: "/admin/jobs/:id/applicants", element: <JobApplicantList /> },
  { path: "*", element: <NotFound /> },
];

// Main App component
function App() {
  const appRouter = createBrowserRouter(
    routes.map((route) => ({
      ...route,
      element: route.isAuthPage ? (
        route.element
      ) : (
        <Layout>{route.element}</Layout>
      ),
    }))
  );

  return (
    <Suspense fallback={<div>Loading App...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
