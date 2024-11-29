import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './admin-layout.css'
import useGetMembers from '../../hooks/useGetMembers'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const AdminLayout = () => {

  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    if (user?.role === 'member') {
      navigate('dashboard')
    }
  }, [user.role, navigate])

  // Guard rendering
  if (user?.role !== 'admin') {
    return null; // Do not render anything until the redirection is complete
  }
  
  const { loading } = useGetMembers()

  return (
    <section className="admin">
      <h1 className="admin__title">welcome to admin dashboard</h1>

      <ul className="admin__tabs">
        <li className="admin__tab">
          <NavLink to='members'>members</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='register'>register</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='holidays'>holidays</NavLink>
        </li>
        {/* <li className="admin__tab">
          <NavLink to='suppplement'>supplement store</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='diet'>diet details</NavLink>
        </li> */}
      </ul>

      <div className="admin__action">
        <Outlet />
      </div>
    </section>
  )
}

export default AdminLayout