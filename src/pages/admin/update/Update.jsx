import { useNavigate, useParams } from 'react-router-dom'
import './update.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useUpdateUserInfo from '../../../hooks/useUpdateMemberInfo'
import Loader from '../../../components/loader/Loader'

const Update = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const members = useSelector(state => state.members.members)
  const member = members.find(member => member.uid === id)
  const { updateUserInfo, loading } = useUpdateUserInfo()

  useEffect(() => {
    setName(member?.name || '')

    if (!member) {
      navigate('/') // Redirect to home if the id is invalid
    }
  }, [members, member, navigate])

  const handleChange = (e) => {
    const text = e.target.value
    const newText = text.split('').map((letter, index, array) => {
        if (letter === ' ' && array[index + 1] === ' ') return ''
        return letter
    }).join('')
    setName(newText)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const data = {
        uid: member.uid,
        name: name.trim()
    }
    updateUserInfo(data)
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

                <div className="form__error-message">
                    {/* <ErrorMessage name='email' component='span' /> */}
                    <span></span>
                </div>
            </div>

            <div className='form__field'>
                <label className="form__label" htmlFor="">Name</label>
                
                <input 
                    type="text"
                    className="form__input" 
                    name='name'
                    value={name}
                    onChange={handleChange}
                />

                <div className="form__error-message">
                    {/* <ErrorMessage name='name' component='span' /> */}
                    <span></span>
                </div>
            </div>

            <button disabled={name.trim() === member?.name} className='form__button'>
                {loading ? <Loader /> : 'update'}
            </button>
        </div>
    </form>
  )
}

export default Update