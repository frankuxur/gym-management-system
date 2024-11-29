import './update.css'

const Update = () => {
  return (
    <form className="update">
        <div className="update__content">
            <h3 className="update__title">
                <i className="iconoir-upload icon"></i>
                <span>update member info</span>
            </h3>

            <div className='form__field'>
                <label className="form__label" htmlFor="">Name</label>
                
                <input 
                    type="text"
                    className="form__input" 
                    name='name'
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

            <button className='form__button'>update</button>
        </div>
    </form>
  )
}

export default Update