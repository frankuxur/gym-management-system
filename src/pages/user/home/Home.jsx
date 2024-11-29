import { useSelector } from 'react-redux'
import './home.css'
import formatDate from '../../../utils/formatDate'

const Home = () => {

  const user = useSelector(state => state.user.user)
  const { name, email, createdAt, expiryDate, currentMembership } = user
  let badge
  if (currentMembership === 'core') {
    badge = 'snow-flake'
  } else if (currentMembership === 'pro') {
    badge = 'flash'
  } else {
    badge = 'fire-flame'
  }

  return (
    <div className="user-home">
        <header className="user-home__header">
            <div>
                <h2 className='user-home__name'>{name}</h2>
                <p className='user-home__email'>{email}</p>
            </div>

            <div className="line"></div>

            <div className='user-home__date'>
                <div>Joining</div>
                <p>{formatDate(createdAt)}</p>
            </div>
        </header>

        <div className='user-home__body'>
            {currentMembership ? (
                <>
                    <div>
                        <h3>current membership</h3>
                        <button>
                            <i className={`iconoir-${badge} icon`}></i>
                            <div>{currentMembership}</div>
                        </button>
                    </div>

                    <div className="line"></div>
                    
                    <div className='user-home__date'>
                        <div>Expiry</div>
                        <p>{formatDate(expiryDate)}</p>
                    </div>
                </>    
            ) : (
                <h3 className='empty'>
                    <i className="iconoir-warning-triangle"></i>
                    <span>reach out to the owner for membership subscription</span>    
                </h3>
            )}
        </div>
    </div>
  )
}

export default Home