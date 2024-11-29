import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'

// layouts
import RootLayout from './layouts/root/RootLayout'
import AdminLayout from './layouts/admin/AdminLayout'
import DashboardLayout from './layouts/dashboard/DashboardLayout'

// pages
import Home from './pages/home/Home'
import Memberships from './pages/user/memberships/Memberships'
import Members from './pages/admin/members/Members'
import Register from './pages/admin/register/Register'
import Notifications from './pages/admin/notifications/Notifications'
import Update from './pages/admin/update/Update'
import Receipts from './pages/receipts/Receipts'
import UserLayout from './layouts/user/UserLayout'
import UserNotifications from './pages/user/notifications/Notifications'
import UserHome from './pages/user/home/Home'
import Holidays from './pages/holidays/Holidays'
import RoleBasedRedirect from './helper/RoleBasedRedirect'

const router =  createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='dashboard' element={<DashboardLayout />}>
        {/* Role-based redirection */}
        <Route index element={<RoleBasedRedirect />} />
        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<Navigate to="members" replace />} />
          <Route path='members' element={<Members />} />
          <Route path='register' element={<Register />} />
          <Route path='notifications/:id' element={<Notifications />} />
          <Route path='update/:id' element={<Update />} />
          <Route path='receipts/:id' element={<Receipts />} />
          <Route path='holidays' element={<Holidays />} />
        </Route>
        <Route path='user' element={<UserLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path='home' element={<UserHome />} />
          <Route path='notifications' element={<UserNotifications />} />
          <Route path='receipts/:id' element={<Receipts />} />
          <Route path='memberships' element={<Memberships />} />
          <Route path='holidays' element={<Holidays />} />
        </Route>
      </Route>
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
