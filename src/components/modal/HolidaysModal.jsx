import { useEffect, useRef, useState } from "react"
import formatText from "../../utils/formatText"
import formatDate from "../../utils/formatDate"
import { useAddHoliday, useUpdateHoliday } from "../../hooks/useHolidays"
import Loader from "../loader/Loader"
import convertToDateInputFormat from "../../utils/convertToDateInputFormat"

const HolidaysModal = ({ setShowModal, holidayInfo }) => {  

  const [reason, setReason] = useState('')
  const [date, setDate] = useState('')
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const dateRef = useRef(null)
  const fromRef = useRef(null)
  const toRef = useRef(null)
  const { addHoliday, loading } = useAddHoliday()
  const { updateHoliday, loading: updatingHoliday } = useUpdateHoliday()

  const showDate = () => {
    dateRef.current.showPicker()
  }

  const showFrom = () => {
    fromRef.current.showPicker()
  }

  const showTo = () => {
    toRef.current.showPicker()
  }

  const handleDate = (e) => {
    if (e.target.name === 'date') {
        setDate(e.target.value)
        setFrom('')
        setTo('')
    } else if (e.target.name === 'from') {
        setDate('')
        setFrom(e.target.value)
    } else if (e.target.name === 'to'){
        setDate('')
        setTo(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!((date && !(from && to)) || (!date && (from && to))) || !reason.trim()) return

    let data
    if (date) {
       data = {
           date: formatDate(date),
           reason: reason.trim(),
       } 
    } else {
        data = {
            from: formatDate(from),
            to: formatDate(to),
            reason: reason.trim(),
        }
    }

    if (holidayInfo) {
        updateHoliday({ id: holidayInfo?.id, ...data }, setShowModal)
        return
    }

    addHoliday(data, setShowModal)
  }

  // set input fields with the holiday to be updated     
  useEffect(() => {
    const { from, reason, to, date } = holidayInfo || {}
    reason && setReason(reason)
    date && setDate(convertToDateInputFormat(date))
    from && setFrom(convertToDateInputFormat(from))
    to && setTo(convertToDateInputFormat(to))
  }, [holidayInfo])

  // disable button if all appropriate fields are not filled
  const disable1 = (!((date && !(from && to)) || (!date && (from && to))) || !reason.trim())
  // disable button if the holiday to be updated is not edited in the form   
  const disable2 = holidayInfo ? (!(holidayInfo.date && (convertToDateInputFormat(holidayInfo.date) !== date)) && !(holidayInfo.from && (convertToDateInputFormat(holidayInfo.from) !== from)) && !(holidayInfo.to && (convertToDateInputFormat(holidayInfo.to) !== to)) && !(holidayInfo.reason && ((holidayInfo.reason) !== reason.trim()))) : false
  const disable = disable1 || disable2

  

  return (
    <>
        <div className="modal__body">
            <form onSubmit={handleSubmit} className="form modal__form modal__holidays">
                <div className="form__content">
                    <div className='form__field'>
                        <label className="form__label" htmlFor="">Date</label>
                        
                        <div onClick={showDate} className="date">
                            <input 
                                type="date"
                                className="form__input" 
                                name='date'
                                value={date}
                                onChange={handleDate}
                                ref={dateRef}
                            />

                            <button type="button" className='toggle'>
                                <i className="iconoir-calendar icon"></i>
                            </button>
                        </div>

                        <div className="form__error-message">
                            {/* <ErrorMessage name='date' component='span' /> */}
                            <span></span>
                        </div>
                    </div>

                    <div className="line">
                        <h5>or</h5>
                    </div>

                    <div className="form__group">
                        <div className='form__field from'>
                            <label className="form__label" htmlFor="">From</label>
                            
                            <div onClick={showFrom} className="date">
                                <input 
                                    type="date"
                                    className="form__input" 
                                    name='from'
                                    value={from}
                                    onChange={handleDate}
                                    ref={fromRef}
                                />

                                <button type="button" className='toggle'>
                                    <i className="iconoir-calendar icon"></i>
                                </button>
                            </div>

                            <div className="form__error-message">
                                {/* <ErrorMessage name='from' component='span' /> */}
                                <span></span>
                            </div>
                        </div>
                        
                        <div className='form__field to'>
                            <label className="form__label" htmlFor="">To</label>
                            
                            <div onClick={showTo} className="date">
                                <input 
                                    type="date"
                                    className="form__input" 
                                    name='to'
                                    value={to}
                                    onChange={handleDate}
                                    ref={toRef}
                                />

                                <button type="button" className='toggle'>
                                    <i className="iconoir-calendar icon"></i>
                                </button>
                            </div>

                            <div className="form__error-message">
                                {/* <ErrorMessage name='to' component='span' /> */}
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <div className='form__field'>
                        <label className="form__label" htmlFor="">Reason</label>
                        
                        <input 
                            type="reason"
                            className="form__input" 
                            name='reason'
                            value={reason}
                            onChange={e => setReason(formatText(e.target.value))}
                        />

                        <div className="form__error-message">
                            {/* <ErrorMessage name='reason' component='span' /> */}
                            <span></span>
                        </div>
                    </div>

                    <button disabled={disable} className="modal__button form__button">
                        {loading || updatingHoliday ? <Loader /> : (
                            holidayInfo ? 'update' : 'add'
                        )}
                    </button>
                </div>
            </form>

        </div>
    </>
  )
}

export default HolidaysModal