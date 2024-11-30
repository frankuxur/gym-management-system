import { useState } from 'react'
import './holidays.css'
import Modal from '../../components/modal/Modal'
import { useDeleteHoliday, useGetHolidays } from '../../hooks/useHolidays'
import { useSelector } from 'react-redux'
import sortAndGroupHolidaysByYear from '../../helper/sortAndGroupHolidaysByYear'
import Loader from '../../components/loader/Loader'

const Holidays = () => {

  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [holidayInfo, setHolidayInfo] = useState({})
  const  holidays = useSelector(state => state.user.holidays)
  const newHolidays = sortAndGroupHolidaysByYear(holidays)
  const { loading } = useGetHolidays()
  const { loading: deletingHoliday, deleteHoliday } = useDeleteHoliday()
  const [clickedButton, setClickedButton] = useState('')
  const role = useSelector(state => state.user.user.role)

  const handleDelete = (id) => {
    deleteHoliday(id)
    setClickedButton(id)
  }

  const handleUpdate = (holiday) => {
    setHolidayInfo(holiday)
    setShowUpdateModal(true)
  }

  return (
    <div className="holidays">        
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
                                    <>
                                        <button onClick={() => handleUpdate(holiday)} className="holiday__button">
                                            <i className="iconoir-edit-pencil icon"></i>
                                        </button>

                                        <button onClick={() => handleDelete(holiday?.id)} className="holiday__button">
                                            {(deletingHoliday && clickedButton === holiday?.id) ? <Loader color={'new-3'} /> : <i className="iconoir-trash icon"></i>}                                    
                                        </button>
                                    </>
                                )}
                            </li>
                        ))                          
                        }
                    </ul>
                </div>
            ))
        ) : (
            <Loader color={'new-3'} />
        )}

        <ul className="holidays__list">
            <>
                {/* <li className="holiday">
                    <span>•</span>
                    <div className="holiday__date">26/11</div>
                    <div className="line"></div>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </li>
                <li className="holiday">
                    <span>•</span>
                    <div className="holiday__date">26/11</div>
                    <div className="line"></div>
                    <p className="">Lorem ipsum dolor sit</p>
                </li>
                <li className="holiday">
                    <span>•</span>
                    <div className="holiday__date">26/11</div>
                    <div className="line"></div>
                    <p className="">Lorem ipsum</p>
                </li>
                <li className="holiday">
                    <span>•</span>
                    <div className="holiday__date">26/11</div>
                    <div className="line"></div>
                    <p className="">Lorem ipsum dolor sit amet</p>
                </li>
                <li className="holiday">
                    <span>•</span>
                    <div className="holiday__date">26/11</div>
                    <div className="line"></div>
                    <p className="">Lorem</p>
                </li> */}
            </>
        </ul>

        {role === 'admin' && (
            <button onClick={() => setShowModal(true)} className="holidays__button">
                <i className="iconoir-plus icon"></i>
            </button>
        )}
        
        {showModal && <Modal type={'holidays'} setShowModal={setShowModal} />}
        {showUpdateModal && <Modal type={'updateHoliday'} setShowModal={setShowUpdateModal} holidayInfo={holidayInfo} />}
    </div>
  )
}

export default Holidays