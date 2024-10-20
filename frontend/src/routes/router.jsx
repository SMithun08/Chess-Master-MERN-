import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
//import CourseDetails from "../pages/Dashboard/Student/Enroll/CourseDetails";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/users/ManageUsers"; 
import UpdateUser from "../pages/Dashboard/Admin/users/UpdateUser";
import UpdateClass from "../pages/Dashboard/Instructor/UpdateClass";
import StudentRoute from "./Privet/StudentRoute";
import InstructorRoute from "./Privet/InstructorRoute";
import AdminRoute from "./Privet/AdminRoute";
import PrivetRoute from "./Privet/PrivetRoute";
import PendingClasses from "../pages/Dashboard/Instructor/PendingClasses";
import ApprovedClasses from "../pages/Dashboard/Instructor/ApprovedClasses";
import ManageApplication from "../pages/Dashboard/Admin/Applications/ManageApplication";
import { PaymentSuccess } from "../pages/Dashboard/Student/Payment/PaymentSuccess";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "instructors",
            element: <Instructors/>
        },
        {
            path: "classes",
            element: <Classes/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
      },
      {
        path: "/class/:id",
        element: <SingleClass/>,
        loader: ({params}) => fetch(`http://localhost:5000/class/${params.id}`)
      }
            
      ]
    },

    {
      path: "/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
            index: true,
            element: <Dashboard/>
        },
        
        // Student Routes 
        {
            path: "student-cp",
            element: <StudentRoute><StudentCP /></StudentRoute>
        },
        {
            path: "enrolled-class",
            element: <StudentRoute><EnrolledClasses /></StudentRoute>
        },
        {
            path: "my-selected",
            element: <StudentRoute><SelectedClasses /></StudentRoute> 
        },
        {
            path: "my-payments",
            element:  <StudentRoute><MyPaymentHistory /></StudentRoute>
        },
        {
            path: "apply-instructor",
            element: <StudentRoute><AsInstructor /></StudentRoute>
        },
        {
            path: "user/payment",
            element: <StudentRoute><Payment /></StudentRoute>
        },
        {
            path:"payment-success",
            element:<StudentRoute><PaymentSuccess /></StudentRoute>
        },
        

        // Instructor Routes
        {
            path: "instructor-cp",
            element: <InstructorRoute><InstructorCP /></InstructorRoute>
        },
        {
            path: "add-class",
            element:<InstructorRoute><AddClass /></InstructorRoute>
        },
        {
            path: "my-classes",
            element: <InstructorRoute><MyClasses /></InstructorRoute>
        },
        {
            path:"my-pending",
            element: <InstructorRoute><PendingClasses /></InstructorRoute>
        },
        {
            path:"my-approved",
            element: <InstructorRoute><ApprovedClasses /></InstructorRoute>
        },
        {
            path: 'update/:id',
            element: <InstructorRoute><UpdateClass /></InstructorRoute>,
            loader: ({ params }) => fetch(`http://localhost:5000/class/${params.id}`),
        },

        // Admin Routes 
        {
            path: "admin-home",
            element: <AdminRoute><AdminHome /></AdminRoute>
        },
        {
            path: "manage-class",
            element: <AdminRoute><ManageClasses /></AdminRoute>
        },
        {
            path: "manage-users",
            element: <AdminRoute><ManageUsers /></AdminRoute>
        },
        {
            path: "update-user/:id",
            element: <AdminRoute><UpdateUser /></AdminRoute>,
            loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)
        },{
            path: "manage-applications",
            element:<AdminRoute><ManageApplication /></AdminRoute>
        }
      ]
   }
  
]);
  