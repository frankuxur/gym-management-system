import { useState } from 'react'
import Modal from '../../components/modal/Modal'
import './home.css'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Home = () => {

  const [showModal, setShowModal] = useState(false)
  const user = useSelector(state => state.user.user)

  if (user?.role === 'member') {
    return <Navigate to={'dashboard/user'} replace />
  } else if (user?.role === 'admin') {
    return <Navigate to={'dashboard/admin'} repla ce />
  }

  return (
    <>
      <section className="home">
        <div className="home__content">
          <div className="home__main">
            <h1 className="home__title">fitcon.</h1>
            <div className="home__subtitle">
              GYM & FITNESS
              <div className="line"></div>
            </div>
            <p className="home__text-1">Gym Management System</p>
            <p className="home__text-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
            <button 
              className='home__button form__button'
              onClick={() => setShowModal(!showModal)}
            >login</button>
          </div>

          <ul className="features">
            <li className="feature">
              <img src="images/feature-1.png" alt="" className="feature__image" />
              <div>
                <div className="feature__title">digital receipts</div>
                <p className="feature__text">receive digital receipts for every subscription, ensuring a hassle-free billing process for all your gym-related transactions</p>
              </div>
            </li>

            <li className="feature">
              <img src="images/feature-2.png" alt="" className="feature__image" />
              <div>
                <div className="feature__title">memberships</div>
                <p className="feature__text">subscribe to a membership plan that aligns with your fitness goals</p>
              </div>
            </li>

            <li className="feature">
              <img src="images/feature-3.png" alt="" className="feature__image" />
              <div>
                <div className="feature__title">supplement store</div>
                <p className="feature__text">enjoy access to an online supplement store, making it easier to support your fitness journey with the right nutrition</p>
              </div>
            </li>
            
            <li className="feature">
              <img src="images/feature-4.png" alt="" className="feature__image" />
              <div>
                <div className="feature__title">notifications</div>
                <p className="feature__text">get timely notifications about important announcements from your gym, ensuring you're always informed</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {showModal && <Modal type={'login'} setShowModal={setShowModal} />}
    </>
  )
}

export default Home