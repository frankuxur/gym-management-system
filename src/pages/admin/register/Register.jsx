import { useState } from 'react'
import useRegister from '../../../hooks/useRegister'
import './register.css'
import Loader from '../../../components/loader/Loader'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { register, loading, error } = useRegister()

    const handleSubmit = (e) => {
        e.preventDefault()
        register({ name, email, password })
    }

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
                    onChange={e => setName(e.target.value)}
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
                        type="password"
                        className="form__input" 
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className='toggle'>
                        <i className="iconoir-eye icon"></i>
                        {/* <i className="iconoir-eye-closed icon"></i> */}
                    </button>
                </div>

                <div className="form__error-message">
                    {/* <ErrorMessage name='password' component='span' /> */}
                    <span></span>
                </div>
            </div>

            <button className='form__button'>
                {loading ? <Loader /> : 'create'}
            </button>
        </div>
    </form>
  )
}

export default Register