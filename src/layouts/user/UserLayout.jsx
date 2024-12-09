import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './user-layout.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import useGetNotifications from '../../hooks/useGetNotifications'
// import useGetMemberReceipts from '../../hooks/useGetMemberReceipts'

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

  const { loading } = useGetNotifications()

  return (
    <section className="user">
      <h1 className="user__title">welcome to user dashboard</h1>

      <ul className="user__tabs">
        <li className="user__tab">
          <NavLink to='home'>home</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to='notifications'>notifications</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to={`receipts/${user?.uid}`}>receipts</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to='memberships'>memberships</NavLink>
        </li>
        <li className="user__tab">
          <NavLink to='holidays'>holidays</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='store'>store</NavLink>
        </li>
        <li className="admin__tab">
          <NavLink to='diets'>diets</NavLink>
        </li>
      </ul>

      <div className="user__action">
        <Outlet />
      </div>
    </section>
  )
}

export default UserLayout