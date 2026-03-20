function Button({ text, onClick, className, type = "button" }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
    </button>
  )
}

export default Button