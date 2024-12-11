import { Link } from "react-router-dom"
import './error.css'

const Error = () => {
  return (
      <div className='error'>
        <div className="error__message">
          <h2 className="error__title">oopsies! this page doesn't exist</h2>
          <p className="error__subtitle">why not try back to the <Link to={'/'} className="error__link">home page</Link></p>
        </div>

        <span className="error__code">404</span>
      </div>
  )
}

export default Error