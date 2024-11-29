import { useNavigate, useParams } from 'react-router-dom'
import useGetMemberReceipts from '../../hooks/useGetMemberReceipts'
import './receipts.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import formatDate from '../../utils/formatDate'

const Receipts = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)
  const receipts = useSelector(state => state.user.receipts)

  let member
  const members = useSelector(state => state.members.members)
  if (user.role === 'admin') {
    member = members.find(member => member.uid === id)
  } else {
    member = user
  }

  useEffect(() => {
    if (!member) {
      navigate('/') // Redirect to home if the id is invalid
    }
  }, [id, navigate])

  const { loading } = useGetMemberReceipts(id)

  return (
    <div className="receipts">
        <h3 className="receipts__title">
            <span className='icon'>₹</span>
            <span>receipts</span>
            <div className="line"></div>
            <span>{member?.name}</span>
        </h3>

        {loading && <Loader color='new-3' />}

        {!loading && member && !!receipts.length && (
            <div className="receipts__list">
                {receipts.map(({ id, amount, createdAt, expiryDate, membership }) => (
                    <article key={id} className="receipt">
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
                            <div className='receipt__name'>{member?.name}</div>
                            <div className='receipt__email'>{member?.email}</div>
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
                ))}
            </div>
        )}

        {!loading && member && !receipts.length && (
            <h2 className='empty'>
                <span>no receipts found</span>
                <i className="iconoir-coffee-cup icon"></i>
            </h2>
        )}
    </div>
  )
}

export default Receipts