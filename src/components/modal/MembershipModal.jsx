import { useState } from "react"
import useAssignMembership from "../../hooks/useAssignMembership"
import Loader from '../loader/Loader'
import useSendNotification from "../../hooks/useSendNotification"

const MembershipModal = ({ member, setShowModal }) => {
 
  const [membership, setMembership] = useState('')
  const { assignMembership, loading } = useAssignMembership()
  const { sendNotification } = useSendNotification()

  const handleClick = () => {
    assignMembership({ member, membership })
    const notification = {
        title: `${membership} membership subscription`,
        text: `Kudos for subscribing to our ${membership.split('').map((x, i) => i === 0 ? x.toUpperCase() : x).join('')} membership!`,
        uid: member?.uid
    }
    sendNotification(notification)

    setTimeout(() => {
        setShowModal(false)
    }, 4000);
  }

  return (
    <>
        <div className="modal__body">
            <ul className="modal__memberships">
                <li className="modal__membership">
                    <button onClick={() => setMembership('core')} className={`${membership === 'core' ? 'active' : ''}`}>
                        <i className="iconoir-snow-flake icon"></i>
                        <div>core</div>
                    </button>
                </li>
                <li className="modal__membership">
                    <button onClick={() => setMembership('pro')} className={`${membership === 'pro' ? 'active' : ''}`}>
                        <i className="iconoir-flash icon"></i>
                        <div>pro</div>
                    </button>
                </li>
                <li className="modal__membership">
                    <button onClick={() => setMembership('elite')} className={`${membership === 'elite' ? 'active' : ''}`}>
                        <i className="iconoir-fire-flame icon"></i>
                        <div>elite</div>
                    </button>
                </li>
            </ul>

            <button onClick={handleClick} className="modal__button form__button">
                {loading ? <Loader /> : 'confirm'}
            </button>
        </div>
    </>
  )
}

export default MembershipModal