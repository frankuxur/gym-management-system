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

    const { register, loading, error } = useRegister()

    const handleSubmit = (e) => {
        e.preventDefault()
        register({ name, email, password })
    }
    
    const disable = !name.trim() || !email.trim() || !password.trim() || (password.length < 6)

  return (
    <form onSubmit={handleSubmit} className="register form">
        <div className="register__content form__content">
            <h3 className="register__title">
                <i className="iconoir-user-plus icon"></i>
                <span>add a new member</span>
            </h3>

            <div className='form__field'>
                <label className="form__label" htmlFor="">Name</label>
                
                <input 
                    type="text"
                    className="form__input" 
                    name='name'
                    value={name}
                    onChange={e => setName(formatText(e.target.value))}
                />

                <div className="form__error-message">
                    {/* <ErrorMessage name='name' component='span' /> */}
                    <span></span>
                </div>
            </div>

            <div className='form__field'>
                <label className="form__label" htmlFor="">Email</label>
                
                <input 
                    type="email"
                    className="form__input" 
                    name='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <div className="form__error-message">
                    {/* <ErrorMessage name='email' component='span' /> */}
                    <span></span>
                </div>
            </div>

            <div className='form__field'>
                <label className="form__label" htmlFor="">Password</label>
                
                <div className="password">
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        className="form__input" 
                        name='password'
                        value={password}
                        onChange={e => setPassword(formatText(e.target.value))}
                    />

                    <button onClick={() => setShowPassword(!showPassword)} className='toggle' type='button'>
                        <i className={`iconoir-eye${showPassword ? '' : '-closed'} icon`}></i>
                    </button>
                </div>

                <div className="form__error-message">
                    {/* <ErrorMessage name='password' component='span' /> */}
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