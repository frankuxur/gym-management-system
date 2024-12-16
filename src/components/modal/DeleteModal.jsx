import useDeleteMember from "../../hooks/useDeleteMember"
import Loader from '../../components/loader/Loader'

const DeleteModal = ({ member, setShowModal }) => {

  const { name, email, uid } = member || {}
  const { deleteMember, loading } = useDeleteMember()

  const handleDelete = () => {
    deleteMember(uid, setShowModal)
  }
  
  const handleCancel = () => {
    setShowModal(false)
  }

  return (
    <div className="modal__body">
      <div className="modal__delete-message">This member's account will be permanently deleted</div>

      <div className="modal__user">
        <h2>{name.charAt(0)}</h2>

        <div className="modal__user-info">
          <div className="modal__user-name">{name}</div>
          <div className="modal__user-email">{email}</div>
        </div>
      </div>

      <div className="modal__buttons">
        <button onClick={handleCancel} className="modal__button form__button">
          cancel
        </button>
        <button onClick={handleDelete} className="modal__button form__button delete" >
          {loading ? <Loader color={'text-1'} /> : <i className="iconoir-trash icon"></i>}
        </button>
      </div>
    </div>
  )
}

export default DeleteModal