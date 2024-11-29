import DeleteModal from './DeleteModal'
import LoginModal from './LoginModal'
import MembershipModal from './MembershipModal'
import './modal.css'

const Modal = ({ type, setShowModal, member }) => { 
  let title
  if (type === 'login') {
    title = 'Login'
  } else if (type === 'membership') {
    title = 'Pick a membership'
  }

  return (
    <div className="modal">
        <div className="modal__content">
            <header className="modal__header">
                <h2 className="modal__title">{title}</h2>

                <button className="modal__close" onClick={() => setShowModal(false)}>
                    <i className="iconoir-xmark"></i>
                </button>
            </header>

            {type === 'delete' && <DeleteModal />}
            {type === 'membership' && <MembershipModal member={member} setShowModal={setShowModal} />}
            {type === 'login' && <LoginModal />}
        </div>
    </div>
  )
}

export default Modal