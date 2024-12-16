import { useState } from 'react'
import './holidays.css'
import Modal from '../../components/modal/Modal'
import { useDeleteHoliday, useGetHolidays } from '../../hooks/useHolidays'
import { useSelector } from 'react-redux'
import sortAndGroupHolidaysByYear from '../../helper/sortAndGroupHolidaysByYear'
import Loader from '../../components/loader/Loader'

// gsap
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Holidays = () => {

  // useStates  
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [holidayInfo, setHolidayInfo] = useState({})

  const  holidays = useSelector(state => state.user.holidays)
  const newHolidays = sortAndGroupHolidaysByYear(holidays)
  const { loading } = useGetHolidays()
  const { loading: deletingHoliday, deleteHoliday } = useDeleteHoliday()
  const [clickedButton, setClickedButton] = useState('')
  const role = useSelector(state => state.user.user.role)

  // deletes a holiday
  const handleDelete = (id) => {
    deleteHoliday(id)
    setClickedButton(id)
  }

  // opens modal to update a holiday
  const handleUpdate = (holiday) => {
    setHolidayInfo(holiday)
    setShowUpdateModal(true)
  }
  
  // gsap stagger
  useGSAP(() => {
    if (newHolidays.length && !loading) {
        gsap.from('.holiday', {
            opacity: 0,
            x: 4,
            duration: 0.8,
            stagger: {
              amount: 2,
              from: 'beginning',
            },
            ease: 'power2.inOut',
        })
    }
  }, [loading])

  return (
    <div className="holidays">   
        {role === 'admin' && (
            <button onClick={() => setShowModal(true)} className="holidays__button">
                <i className="iconoir-plus icon"></i>
            </button>
        )}     

        {newHolidays.length && !loading ? (
            newHolidays.map(({ year, holidays }) => (
                <div key={year} className='holidays__group'>
                    <h2 className="holidays__title">
                        <span>{year}</span>
                    </h2>
                
                    <ul className="holidays__list">
                        {!!holidays.length && holidays.map(holiday => (
                            <li key={holiday?.id} className="holiday">
                                <span>•</span>
                                <div className="holiday__date">
                                    {holiday?.date && <span>{holiday?.date}</span>}
                                    {holiday?.from && <span>{holiday?.from}</span>}
                                    {holiday?.from && <i className="iconoir-arrow-right icon"></i>}
                                    {holiday?.to && <span>{holiday?.to}</span>}
                                </div>
                                <div className="line"></div>
                                <p className="holiday__text">{holiday?.reason}</p>
                                
                                {role === 'admin' && (
                                    <div className='holiday__buttons'>
                                        <button onClick={() => handleUpdate(holiday)} className="holiday__button">
                                            <i className="iconoir-edit-pencil icon"></i>
                                        </button>

                                        <button onClick={() => handleDelete(holiday?.id)} className="holiday__button">
                                            {(deletingHoliday && clickedButton === holiday?.id) ? <Loader color={'text-1'} /> : <i className="iconoir-trash icon"></i>}                                    
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))                          
                        }
                    </ul>
                </div>
            ))
        ) : (
            <Loader color={'text-1'} />
        )}
        
        {showModal && <Modal type={'holidays'} setShowModal={setShowModal} />}
        {showUpdateModal && <Modal type={'updateHoliday'} setShowModal={setShowUpdateModal} holidayInfo={holidayInfo} />}
    </div>
  )
}

export default Holidays