import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './user-layout.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const UserLayout = () => {

  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)

  // if an 'admin' tries to access a 'member' only url, they will be redirected to admin home page
  useEffect(() => {
    if (user.role === 'admin') {
      navigate('/')
    }
  }, [user.role, navigate])

  // Guard rendering
  if (user?.role !== 'member') {
    return null; // do not render anything until the redirection is complete
  }

  return (
    <section className="user">
      <h1 className="user__title">welcome to user dashboard</h1>

      <ul className="user__tabs">
        <li className="user__tab">
          <NavLink to='home'><i className="iconoir-home icon"></i> home</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to='notifications'><i className="iconoir-bell icon"></i> notifications</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to={`receipts/${user?.uid}`}><span>₹</span> receipts</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to='memberships'><i className="iconoir-star icon"></i> memberships</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to='holidays'><i className="iconoir-coffee-cup icon"></i> holidays</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to='store'><i className="iconoir-shop-window icon"></i> store</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to='diets'><i className="iconoir-leaf icon"></i> diets</NavLink>
        </li>
      </ul>

      <div className="user__action">
        <Outlet />
      </div>
    </section>
  )
}

export default UserLayout