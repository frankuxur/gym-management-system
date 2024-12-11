import { useState } from 'react'
import Modal from '../../components/modal/Modal'
import './home.css'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Features from './Features'

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
            <p className="home__text-2">Your Fitness Journey, Simplified – Where goals meet convenience!</p>
            <button 
              className='home__button form__button'
              onClick={() => setShowModal(!showModal)}
            >login</button>
          </div>

          <Features />
        </div>
      </section>

      {showModal && <Modal type={'login'} setShowModal={setShowModal} />}
    </>
  )
}

export default Home