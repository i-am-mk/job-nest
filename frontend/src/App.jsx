import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import SignIn from './components/auth/SignIn';
import Register from './components/auth/Register';
import JobListings from './components/auth/JobListings';
import Explore from './components/auth/Explore';
import Profile from './components/Profile';

function App() {
  const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/joblistings',
    element: <JobListings />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
]);

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
