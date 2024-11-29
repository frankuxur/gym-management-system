import { useSelector } from 'react-redux'
import './notifications.css'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import { useEffect, useState } from 'react'
import useSendNotification from '../../../hooks/useSendNotification'

const Notifications = () => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const { id } = useParams()
  const members = useSelector(state => state.members.members)  
  const member = members.find(member => member.uid === id)
  const navigate = useNavigate()
  const { loading, sendNotification } = useSendNotification()

  useEffect(() => {
    let timeout
    if (!member) {
        timeout = setTimeout(() => {
            navigate('/')
        }, 4000);
    }

    return () => clearTimeout(timeout)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendNotification({ title, text, uid: member?.uid })
  }

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
                <label className="form__label" htmlFor="">Title</label>
                
                <input 
                    type="text" 
                    className='form__input' 
                    name='title' 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <div className="form__error-message">
                    {/* <ErrorMessage name='name' component='span' /> */}
                    <span></span>
                </div>
            </div>

            <div className='form__field'>
                <label className="form__label" htmlFor="">Dear {member?.name.split(' ')[0]},</label>
                
                <textarea 
                    className="form__input form__textarea" 
                    name="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                ></textarea>

                <div className="form__error-message">
                    {/* <ErrorMessage name='name' component='span' /> */}
                    <span></span>
                </div>
            </div>

            <button className='form__button'>
                {loading ? <Loader /> : 'send'}
            </button>
        </div>
    </form>
  )
}

export default Notifications