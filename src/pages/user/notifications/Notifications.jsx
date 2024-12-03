import { useSelector } from 'react-redux'
import './notifications.css'
import formatDate from '../../../utils/formatDate'

const Notifications = () => {

  const notifications = useSelector(state => state.user.notifications)
  const user = useSelector(state => state.user.user)

  return (
    <div className="user-notification">
      <h3 className="user-notification__title">
          <i className="iconoir-bell icon"></i>
          <span>notifications</span>
          <div className="line"></div>
          <span>{user?.name}</span>
      </h3>

      <ul className="notification-list">
        {notifications.length ? (
          notifications.map(({ id, text, title, createdAt }) => (
            <li key={id} className="notification-item">
              <i className="iconoir-bell icon"></i>
  
              <div>
                <header>
                  <div>
                    <h3>{title}</h3>
                    <p>{formatDate(createdAt)}</p>
                  </div>
                </header>
  
                <p className="notification-message">{text}</p>
              </div>
            </li>
          ))
        ) : (
          <h2 className='empty'>
            <span>no notifications found</span>
            <i className="iconoir-coffee-cup icon"></i>
          </h2>
        )}
      </ul>
    </div>
  )
}

export default Notifications