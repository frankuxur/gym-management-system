import { useState } from "react"
import useAssignMembership from "../../hooks/useAssignMembership"
import Loader from '../loader/Loader'
import toast from "react-hot-toast"

const MembershipModal = ({ member, setShowModal }) => {
 
  const [membership, setMembership] = useState('')
  const { assignMembership, loading } = useAssignMembership()

  const handleClick = () => {
    if (!membership) {
        toast.error('Pick a membership', { icon: '⚠️' })
        return
    }

    assignMembership({ member, membership }, setShowModal)
  }

  const disable = !membership

  return (
    <div className="modal__body">
        <ul className="modal__memberships">
            <li className="modal__membership">
                <button onClick={() => setMembership('Core')} className={`${membership === 'Core' ? 'active' : ''}`}>
                    <i className="iconoir-snow-flake icon"></i>
                    <div>core</div>
                </button>
            </li>
            <li className="modal__membership">
                <button onClick={() => setMembership('Pro')} className={`${membership === 'Pro' ? 'active' : ''}`}>
                    <i className="iconoir-flash icon"></i>
                    <div>pro</div>
                </button>
            </li>
            <li className="modal__membership">
                <button onClick={() => setMembership('Elite')} className={`${membership === 'Elite' ? 'active' : ''}`}>
                    <i className="iconoir-fire-flame icon"></i>
                    <div>elite</div>
                </button>
            </li>
        </ul>

        <button onClick={handleClick} className="modal__button form__button" disabled={disable}>
            {loading ? <Loader /> : 'confirm'}
        </button>
    </div>
  )
}

export default MembershipModal