import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/auth/SignIn/SignIn";
import Register from "./components/auth/Register";
import JobListings from "./components/auth/JobListings";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/create/CreateCompany";

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
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
