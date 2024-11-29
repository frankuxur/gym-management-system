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
        <h1 className="home__title">fitcon.</h1>
        <h2 className="home__subtitle">gym management system</h2>
        <p className="home__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
        <button 
          className='home__button form__button'
          onClick={() => setShowModal(!showModal)}
        >login</button>
      </section>

      {showModal && <Modal type={'login'} setShowModal={setShowModal} />}
    </>
  )
}

export default Home