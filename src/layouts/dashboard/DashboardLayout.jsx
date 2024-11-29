import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const DashboardLayout = () => {

  const user = useSelector(state => state.user.user)

  return !!user ? <Outlet /> : <Navigate to={'/'} />
}

export default DashboardLayout