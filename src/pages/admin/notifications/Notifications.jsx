import { useSelector } from 'react-redux'
import './notifications.css'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import { useEffect, useRef, useState } from 'react'
import useSendNotification from '../../../hooks/useSendNotification'

const Notifications = () => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const { id } = useParams()
  const members = useSelector(state => state.members.members)  
  const member = members.find(member => member.uid === id)
  const navigate = useNavigate()
  const { loading, sendNotification } = useSendNotification()
  const inputRef = useRef(null)

  // if the member id is invalid, user will be redirected to '/' route in 4s 
  useEffect(() => {
    inputRef?.current?.focus()

    let timeout
    if (!member) {
      timeout = setTimeout(() => {
        navigate('/')
      }, 4000);
    }

    return () => clearTimeout(timeout)
  }, [member])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendNotification({ title, text, uid: member?.uid })
  }

  const disable = (!title.trim() || !text.trim())

  
  if (!member) {
    return <Loader color={'new-3'} />
  }
  
  return (
    <form onSubmit={handleSubmit} className="notifications">
      <div className="notifications__content">
        <h3 className="notifications__title">
          <i className="iconoir-bell icon"></i>
          <span>send notifications</span>
        </h3>

        <div className='form__field'>
          <label className="form__label" htmlFor="name">Title</label>
          
          <input 
            type="text" 
            className='form__input'
            id='name'
            name='title' 
            value={title}
            onChange={e => setTitle(e.target.value)}
            ref={inputRef}
          />
        </div>

        <div className='form__field'>
          <label className="form__label" htmlFor="text">Dear {member?.name.split(' ')[0]},</label>
          
          <textarea 
            className="form__input form__textarea" 
            id="text"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
        ></textarea>
        </div>

        <button className='form__button' disabled={disable}>
          {loading ? <Loader /> : 'send'}
        </button>
      </div>
    </form>
  )
}

export default Notifications