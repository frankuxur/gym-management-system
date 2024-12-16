import { useNavigate, useParams } from 'react-router-dom'
import useGetMemberReceipts from '../../hooks/useGetMemberReceipts'
import './receipts.css'
import { useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import Receipt from './Receipt'

const Receipts = () => {

  const { id } = useParams()
  const user = useSelector(state => state.user.user)
  const receipts = useSelector(state => state.user.receipts)

  const { member, loading } = useGetMemberReceipts(id)

  return (
    <div className="receipts">
        <h3 className="receipts__title">
            <span className='icon'>₹</span>
            <span>receipts</span>
            <div className="line"></div>
            <span>{user.role === 'member' ? user?.name : member?.name}</span>
        </h3>

        {loading && <Loader color='text-1' />}

        {!loading && member && !!receipts.length && (
            <div className="receipts__list">
                {receipts.map(receipt => (
                    <Receipt key={receipt.id} receipt={receipt} name={member.name} email={member.email} role={user.role} />
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