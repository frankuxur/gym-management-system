import { useRef } from 'react'
import formatDate from '../../utils/formatDate'
import { useReactToPrint } from 'react-to-print'

const Receipt = ({ receipt: { amount, createdAt, expiryDate, membership }, email, name, role }) => {
    const receiptRef = useRef(null)

    // react-to-print to enable print option on clicking the receipt
    const handlePrint = useReactToPrint({ contentRef: receiptRef })
    const handleClick = () => {
        if (role === 'admin') {
            handlePrint()
        }
    }

  return (
    <article ref={receiptRef} onClick={handleClick} className={`receipt ${role === 'admin' ? 'active' : ''}`}>
        <header className="receipt__header">
            <h2 className="receipt__title">receipt</h2>
            <div className='receipt__date'>
                <span>ISSUE</span>
                <span>{formatDate(createdAt)}</span>
            </div>
            <div className='receipt__date'>
                <span>EXPIRY</span>
                <span>{formatDate(expiryDate)}</span>
            </div>
        </header>

        <div className="receipt__member">
            <div className='receipt__name'>{name}</div>
            <div className='receipt__email'>{email}</div>
        </div>

        <div className="receipt__info">
            <h4 className='receipt__membership'>{membership} membership</h4>
            <div className="line"></div>
            <div className='receipt__amount'>{amount} INR</div>
        </div>

        <footer className="receipt__footer">
            <div className='receipt__logo'>
                <h3>confit.</h3>
                <span>gym & fitness</span>
            </div>
                
            <p className='receipt__address'>20 Cooper Square, New York, NY 10003, USA</p>
        </footer>                    
    </article>
  )
}

export default Receipt