import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/auth/SignIn/SignIn";
import Register from "./components/auth/Register/Register";
import JobListings from "./components/auth/JobListings";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";
import JobAdminDetails from "./components/admin/jobs/job/JobDetails";
import Companies from "./components/admin/Companies/Companies";
import CreateCompany from "./components/admin/Companies/create/CreateCompany";
import Jobs from "./components/admin/jobs/Jobs";
import CreateJob from "./components/admin/jobs/create/CreateJob";
import CompanyDetails from "./components/admin/companies/company/CompanyDetails";
import JobApplicantList from "./components/admin/jobs/job/JobApplicantList";
import OtpVerification from "./components/auth/Register/OTPVerification";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/otpverification",
      element: <OtpVerification />,
    },
    {
      path: "/joblistings",
      element: <JobListings />,
    },
    {
      path: "/details/:id",
      element: <JobDetails />,
    },
    {
      path: "/admin/companies",
      element: <Companies />,
    },
    {
      path: "/admin/createcompany",
      element: <CreateCompany />,
    },
    {
      path: "/admin/createjob",
      element: <CreateJob />,
    },
    {
      path: "/admin/jobs",
      element: <Jobs />,
    },
    {
      path: "/admin/companies/:id",
      element: <CompanyDetails />,
    },
    {
      path: "/admin/jobs/:id",
      element: <JobAdminDetails />,
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: <JobApplicantList />,
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
