import { useState } from 'react'
import Button from '../common/Button'

function VerifyCodeForm() {
  const [code, setCode] = useState(['', '', '', '', ''])

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus al siguiente input
    if (value && index < 4) {
      document.getElementById(`code-${index + 1}`).focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Code:', code.join(''))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="code-input"
          />
        ))}
      </div>
      <p className="resend-code">Resend Code</p>
      <Button text="Verify Code" className="btn-login" />
    </form>
  )
}

export default VerifyCodeForm