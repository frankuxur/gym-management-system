import { useNavigate, useParams } from 'react-router-dom'
import './update.css'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useUpdateUserInfo from '../../../hooks/useUpdateMemberInfo'
import Loader from '../../../components/loader/Loader'
import formatText from '../../../utils/formatText'
import toast from 'react-hot-toast'

const Update = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const members = useSelector(state => state.members.members)
  const member = members.find(member => member.uid === id)
  const { updateUserInfo, loading } = useUpdateUserInfo()
  const inputRef = useRef(null)

  // if the member id is invalid, user will be redirected to '/' route in 4s 
  useEffect(() => {
    setName(member?.name || '')
    // focus on name input when component renders
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

    if (name.trim() === member?.name) {
      toast('Name must be different', { icon: '⚠️' })
      return
    }
    
    const data = {
      uid: member.uid,
      name: name.trim()
    }
    updateUserInfo(data)
  }
  
  const disable = (name.trim() === member?.name)


  if (!member) {
    return <Loader color={'new-3'} />
  }

  return (
    <form onSubmit={handleSubmit} className="update">
      <div className="update__content">
        <h3 className="update__title">
          <i className="iconoir-upload icon"></i>
          <span>update member info</span>
        </h3>

        <div className='form__field'>
          <label className="form__label" htmlFor="">Email</label>
          
          <input 
            type="email"
            className="form__input" 
            name='email'
            disabled={true}
            value={member?.email}
          />
        </div>

        <div className='form__field'>
          <label className="form__label" htmlFor="name">Name</label>
          
          <input 
            type="text"
            className="form__input" 
            id='name'
            name='name'
            value={name}
            onChange={e => setName(formatText(e.target.value))}
            ref={inputRef}
          />
        </div>

        <button disabled={disable} className='form__button'>
          {loading ? <Loader /> : 'update'}
        </button>
      </div>
    </form>
  )
}

export default Update