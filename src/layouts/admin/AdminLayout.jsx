import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './admin-layout.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const AdminLayout = () => {

  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)

  // if a 'member' tries to access an 'admin' only url, they will be redirected to user home page
  useEffect(() => {
    if (user?.role === 'member') {
      navigate('/')
    }
  }, [user.role, navigate])

  // Guard rendering
  if (user?.role !== 'admin') {
    return null; // do not render anything until the redirection is complete
  }

  return (
    <section className="admin">
      <h1 className="admin__title">welcome to admin dashboard</h1>

      <ul className="admin__tabs">
        <li className="admin__tab">
          <NavLink to='members'><i className="iconoir-group icon"></i> members</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='register'><i className="iconoir-user-plus icon"></i> register</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='holidays'><i className="iconoir-coffee-cup icon"></i> holidays</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='store'><i className="iconoir-shop-window icon"></i> store</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='diets'><i className="iconoir-leaf icon"></i> diets</NavLink>
        </li>
      </ul>

      <div className="admin__action">
        <Outlet />
      </div>
    </section>
  )
}

export default AdminLayout