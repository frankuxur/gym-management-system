import { useEffect, useState } from "react"
import useLogin from "../../hooks/useLogin"
import Loader from '../loader/Loader'
import toast from "react-hot-toast"

const LoginModal = () => {

  const { loginUser, loading, error } = useLogin()  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser({ email, password })
  }

  // error handling   
  useEffect(() => {
    if (['Firebase: Error (auth/invalid-email).', 'Firebase: Error (auth/invalid-credential).'].includes(error?.message)) {
        toast.error('Invalid credentials')
    } else if (error?.message) {
        toast.error(error?.message)
    }
  }, [error])
    
  const disable = !email.trim() || !password.trim() || (password.trim().length < 6)

  return (
    <div className="modal__body">
        <form onSubmit={handleSubmit} className="form modal__form login">
            <div className="form__content">

                <div className='form__field'>
                    <label className="form__label" htmlFor="email">Email</label>
                    
                    <input 
                        type="email"
                        className="form__input" 
                        id='email'
                        name='email'
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
                            id='password'
                            name='password'
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

                <button disabled={disable} className="modal__button form__button">
                    {loading ? <Loader /> : 'confirm'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default LoginModal