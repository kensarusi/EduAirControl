import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodresolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../schemas/authSchemas'
import { Input } from '../ui'
import '../../styles/auth/Login.css'

function LoginForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data) => {
    console.log(data)
    navigate('/dashboard')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Input
        label={t('login.email')}
        type="email"
        placeholder={t('login.placeholderEmail')}
        {...register('email')}
      />
      {errors.email && <p className="error">{errors.email.message}</p>}
      <Input
        label={t('login.password')}
        type="password"
        placeholder={t('login.placeholderPassword')}
        {...register('password')}
      />
      {errors.password && <p className="error">{errors.password.message}</p>} 
      <div className="login-options">
        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          {t('login.rememberMe')}
        </label>
        <a
          href="#"
          className="forgot-password"
          onClick={(e) => { e.preventDefault(); navigate('/forgot-password') }}
        >
          {t('login.forgotPassword')}
        </a>
      </div>

      <button type="submit" className="btn-login">{t('login.loginBtn')}</button>
    </form>
  )
}

export default LoginForm
