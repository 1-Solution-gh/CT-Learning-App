import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./RootLayout"
import { CollectionManagement } from "@/components/dashboard-content/CollectionManagement"
import CourseManagement from "@/components/dashboard-content/ManageCourses"
import { InstructorManagement } from "@/components/dashboard-content/InstructorManagement"
import { DashboardOverview } from "@/components/dashboard-content/DashboardOverview"
import { StudentManagement } from "@/components/dashboard-content/StudentManagement"
import Login from "@/components/admin-auth/Login"
import ProtectedRoute from "./ProtectedRoute"
import Animated404 from "./ErrorPage"
import { Settings } from "@/components/dashboard-content/Settings"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Animated404 />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute />,
      children: [
        {
          element: <RootLayout />, 
          errorElement : <Animated404 />,
          children: [
            {
              index: true,
              element: <DashboardOverview />
            },
            {
              path: "students",
              element: <StudentManagement />
            },
            {
              path: "instructors",
              element: <InstructorManagement />
            },
            {
              path: "courses",
              element: <CourseManagement />
            },
            {
              path: "categories",
              element: <h1>Category Management</h1>
            },
            {
              path: "modules",
              element: <CollectionManagement />
            },
            {
              path: "sub-admins",
              element: <h1>Sub Admin Management</h1>
            },
            {
              path: "settings",
              element: <Settings />
            }
          ]
        }
      ]
    }
  ])

export default router