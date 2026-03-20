import { IoArrowBack } from 'react-icons/io5'
import '../../styles/BackButton.css'

function BackButton({ onClick }) {
  return (
    <button className="back-button" onClick={onClick}>
      <IoArrowBack />
    </button>
  )
}

export default BackButton