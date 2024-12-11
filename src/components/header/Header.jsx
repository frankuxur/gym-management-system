import { useDispatch, useSelector } from 'react-redux'
import './header.css'
import { logout } from '../../redux/userSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { resetMembers } from '../../redux/membersSlice'

const Header = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // logout, remove user from redux store & local storage
  const handleLogout = async () => {
    await signOut(auth)
    localStorage.removeItem('user-info')
    dispatch(logout())
    dispatch(resetMembers())
    navigate('/')
    toast.success('You are logged out')
  }

  const user = useSelector(state => state.user.user)

  return (
    <header className="header">
        <div className="header__content">
            <div className="header__logo">
              <Link to={'/'}>
                <h2>fitcon.</h2>
              </Link>
            </div>

            <nav className="nav">
              <ul className="nav__items">
                <li className='nav__item'>
                  <a href="" className='nav__link'>contact</a>
                </li>

                <li className='nav__item'>
                  <a href="" className='nav__link'>about</a>
                </li>

                <li className='nav__item'>
                  <a href="" className='nav__link'>logout</a>
                </li>
              </ul>
            </nav>

            {!!user && (
              <>
                {user?.role === 'member' && (
                  <div className="header__notifications">
                    <Link to={'dashboard/user/notifications'} className='header__button'>
                      <i className="iconoir-bell icon"></i>
                    </Link>
                  </div>
                )}

                <div className="header__user">                
                  <div className="header__user-image">
                    <h3>{user?.name.split('')[0]}</h3>
                  </div>

                  <div className="header__user-wrapper">
                    <ul className="header__user-info">
                      <li className='header__user-name'>{user?.name}</li>
                      <li className='header__user-email'>{user?.email}</li>
                      <li className='header__user-logout'>
                        <button 
                          onClick={handleLogout}
                          className='header__user-logout-button form__button'
                        >
                          <span>logout</span>
                          <i className="iconoir-log-out icon"></i>
                        </button>
                        </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
        </div>
    </header>
  )
}

export default Header