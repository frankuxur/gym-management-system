import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__content">
            <div className="footer__brand">
                <h2 className="footer__title">fitcon.</h2>
                <span className='footer__subtitle'>GYM & FITNESS <span className="line"></span></span>

                <p className='footer__address'>20 Cooper Square, New York, NY 10003, USA</p>
            </div>

            <div className="footer__contact">
                <div className='footer__contact-title'>Feeling inspired? Let's connect</div>
                
                <ul className="footer__socials">
                    <li className="footer__social">
                        <Link className='footer__link'>ashishfrank.com</Link>
                    </li>
                    <li className="footer__social">
                        <Link className='footer__link'>ashishfrank1234@gmail.com</Link>
                    </li>
                    <li className="footer__social">
                        <Link className='footer__link'>+91 797 993 7939</Link>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer