import { useEffect, useState } from "react"
import useLogin from "../../hooks/useLogin"
import Loader from '../loader/Loader'
import toast from "react-hot-toast"

const LoginModal = () => {

  const { loginUser, loading, error } = useLogin()  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser({ email, password })
  }

  useEffect(() => {
    if (error?.message === 'Firebase: Error (auth/invalid-email).') {
        toast.error('Invalid credentials')
    } else if (error?.message) {
        toast.error(error?.message)
    }
  }, [error])

  return (
    <div className="modal__body">
        <form onSubmit={handleSubmit} className="form modal__form login">
            <div className="form__content">

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

                <button className="modal__button form__button">
                    {loading ? <Loader /> : 'confirm'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default LoginModal