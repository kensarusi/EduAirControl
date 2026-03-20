function AuthLayout({ children }) {
  return (
    <div className="login-container">
      <div className="login-card">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout