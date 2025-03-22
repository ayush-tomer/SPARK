import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import LogIn from "../pages/LogIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import Social from "../pages/Social.jsx";
import Projects from "../pages/Projects.jsx";
import Events from "../pages/Events.jsx";
import Communities from "../pages/Communities.jsx";
import ProblemStatements from "../pages/ProblemStatement.jsx";
import Store from "../pages/Store.jsx";
import Profile from "../pages/Profile.jsx";
import Internships from "../pages/Internships.jsx";
import AboutUs from "../pages/AboutUs.jsx";

// Admin Routes:
import AdminRoute from "./AdminRoutes.jsx";
import DashboardLayout from "../pages/Admin/Dashboard/DashboardLayout.jsx";
import AdminLogin from "../pages/Admin/Login/AdminLogin.jsx";
import Dashboard from "../pages/Admin/Dashboard/Dashboard.jsx";

//Community :
import ManageCommunities from "../pages/Admin/Communities/ManageCommunities.jsx";
import UpdateCommunity from "../pages/Admin/Communities/UpdateCommunity.jsx";
import AddCommunity from "../pages/Admin/Communities/AddCommunity.jsx";

//Internship:
import AddInternship from "../pages/Admin/Internships/AddInternship.jsx";
import ManageInternships from "../pages/Admin/Internships/ManageInternships.jsx";
import UpdateInternship from "../pages/Admin/Internships/UpdateInternship.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <LogIn /> },
        { path: "/register", element: <SignUp /> },
        { path: "/social", element: <Social /> },
        { path: "/events", element: <Events /> },
        { path: "/community", element: <Communities /> },
        { path: "/projects", element: <Projects /> },
        { path: "/problemStatement", element: <ProblemStatements /> },
        { path: "/store", element: <Store /> },
        { path: "/profile", element: <Profile /> },
        { path: "/internships", element: <Internships /> },
        { path: "/aboutus", element: <AboutUs /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/dashboard",
      element: (
        <AdminRoute>
          <DashboardLayout />
        </AdminRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          ),
        },
        {
          path: "manage-communities",
          element: (
            <AdminRoute>
              <ManageCommunities />
            </AdminRoute>
          ),
        },
        {
          path: "edit-communities/:id",
          element: (
            <AdminRoute>
              <UpdateCommunity />
            </AdminRoute>
          ),
        },
        {
          path: "add-new-community",
          element: (
            <AdminRoute>
              <AddCommunity />
            </AdminRoute>
          ),
        },
        {
          path: "add-new-internship",
          element: (
            <AdminRoute>
              <AddInternship />
            </AdminRoute>
          ),
        },
        {
          path: "manage-internships",
          element: (
            <AdminRoute>
              <ManageInternships />
            </AdminRoute>
          ),
        },
        {
          path: "update-internships/:id",
          element: (
            <AdminRoute>
              <UpdateInternship />
            </AdminRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
