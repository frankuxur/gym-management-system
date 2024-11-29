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

        <>
        {/* <li className="notification-item">
          <i className="iconoir-bell icon"></i>

          <div>
            <header>
              <div>
                <h3>Reminder</h3>
                <p>26/11/24</p>
              </div>
            </header>

            <p className="notification-message">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, perspiciatis.</p>
          </div>
        </li>

        <li className="notification-item">
          <i className="iconoir-bell icon"></i>

          <div>
            <header>
              <div>
                <h3>Reminder</h3>
                <p>26/11/24</p>
              </div>
            </header>

            <p className="notification-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore velit aspernatur obcaecati quidem corrupti ut ipsum voluptates voluptas ex delectus fugiat cumque suscipit tenetur sed animi, culpa rerum quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam maxime laborum provident quia consectetur neque recusandae quasi commodi deserunt asperiores eius tempore laboriosam vitae, et accusamus debitis sunt cum esse mollitia necessitatibus repellendus quas. Soluta odit optio aspernatur quae dignissimos ipsa dolores doloremque tempora consequatur tempore natus nostrum vitae, corporis explicabo amet quidem sed nobis quo sint itaque esse aliquam accusantium non nulla! Doloremque quam minima ipsa enim, debitis laudantium.</p>
          </div>
        </li>

        <li className="notification-item">
          <i className="iconoir-bell icon"></i>

          <div>
            <header>
              <div>
                <h3>Reminder</h3>
                <p>26/11/24</p>
              </div>
            </header>

            <p className="notification-message">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </li>

        <li className="notification-item">
          <i className="iconoir-bell icon"></i>

          <div>
            <header>
              <div>
                <h3>Reminder</h3>
                <p>26/11/24</p>
              </div>
            </header>

            <p className="notification-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore velit aspernatur obcaecati quidem corrupti ut ipsum voluptates voluptas ex delectus fugiat cumque suscipit tenetur sed animi, culpa rerum quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vero et aut animi nemo saepe. Dolores modi repellat, id itaque ea magnam beatae officiis sapiente possimus iure sequi sunt corporis! Nulla dolore excepturi sed maxime repellendus ratione rem similique libero!</p>
          </div>
        </li>

        <li className="notification-item">
          <i className="iconoir-bell icon"></i>

          <div>
            <header>
              <div>
                <h3>Reminder</h3>
                <p>26/11/24</p>
              </div>
            </header>

            <p className="notification-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore velit aspernatur obcaecati quidem corrupti ut ipsum voluptates voluptas ex delectus fugiat cumque suscipit tenetur sed animi, culpa rerum quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et similique libero, nisi nam eligendi adipisci magni eius est quasi beatae alias maiores debitis sapiente quisquam illum dolores. Saepe, consectetur dolor.</p>
          </div>
        </li> */}
        </>
      </ul>
    </div>
  )
}

export default Notifications