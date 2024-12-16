import { useState } from 'react'
import useRegister from '../../../hooks/useRegister'
import './register.css'
import Loader from '../../../components/loader/Loader'
import formatText from '../../../utils/formatText'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const { register, loading } = useRegister()

    const handleSubmit = (e) => {
        e.preventDefault()
        register({ name, email, password })
    }
    
    // disable is true when name, email or password fields are empty, or password's length is less than 6 
    const disable = !name.trim() || !email.trim() || !password.trim() || (password.length < 6)

  return (
    <form onSubmit={handleSubmit} className="register form">
        <div className="register__content form__content">
            <h3 className="register__title">
                <i className="iconoir-user-plus icon"></i>
                <span>add a new member</span>
            </h3>

            <div className='form__field'>
                <label className="form__label" htmlFor="name">Name</label>
                
                <input 
                    type="text"
                    className="form__input" 
                    name='name'
                    id='name'
                    value={name}
                    onChange={e => setName(formatText(e.target.value))}
                    autoFocus
                />
            </div>

            <div className='form__field'>
                <label className="form__label" htmlFor="email">Email</label>
                
                <input 
                    type="email"
                    className="form__input" 
                    name='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className='form__field'>
                <label className="form__label" htmlFor="password">Password</label>
                
                <div className="password">
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        className="form__input" 
                        name='password'
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value.trim())}
                    />

                    <button onClick={() => setShowPassword(!showPassword)} className='toggle' type='button'>
                        <i className={`iconoir-eye${showPassword ? '' : '-closed'} icon`}></i>
                    </button>
                </div>

                <div className="form__error-message">
                    password must be at least 6 characters long
                </div>
            </div>

            <button disabled={disable} className='form__button'>
                {loading ? <Loader /> : 'create'}
            </button>
        </div>
    </form>
  )
}

export default Register