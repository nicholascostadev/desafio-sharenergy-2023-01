import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Input } from '../components/Input'
import { useSession } from '../hooks'
import { api } from '../libs/axios'
import { AxiosInputError } from '../components/AxiosInputError'
import { LoginFormData, loginSchema } from '../validations/forms'

type LoginData = {
  login: LoginFormData['username']
  password: LoginFormData['password']
}

export const LoginPage = () => {
  const { username } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (username) navigate('/dashboard')
  }, [username, navigate])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    reValidateMode: 'onSubmit',
  })

  const rememberMe = watch('remember-me')

  const {
    mutate: login,
    isError,
    error,
  } = useMutation({
    mutationFn: async (loginData: LoginData) => {
      return await api
        .post(`/auth/login?persist=${rememberMe}`, loginData)
        .then((res) => res.data)
    },
    onSuccess: () => {
      // refresh page for cookie to take effect
      navigate(0)
    },
  })

  const handleLogin = async (data: LoginFormData) => {
    login({
      login: data.username,
      password: data.password,
    })
  }

  return (
    <div className="h-screen flex justify-center items-center bg-page-gradient">
      <div className="p-4 w-96 rounded-md border border-slate-800 backdrop-blur[12px] bg-slate-300/5">
        <h1 className="text-4xl pt-4 pb-10 text-center text-white">Sign In</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <Input
            label="Username"
            error={errors.username}
            placeholder="Username"
            className={
              isError || errors.username
                ? 'ring-red-500 focus:ring-red-500'
                : ''
            }
            {...register('username')}
          />
          {isError && <AxiosInputError error={error} />}
          <Input
            label="Password"
            error={errors.password}
            placeholder="Password"
            className={
              isError || errors.password
                ? 'ring-red-500 focus:ring-red-500'
                : ''
            }
            {...register('password')}
          />
          {isError && <AxiosInputError error={error} />}

          <label className="flex gap-2 text-white">
            <input
              type="checkbox"
              aria-label="remember me"
              {...register('remember-me')}
            />
            Remember me
          </label>
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors font-bold"
            disabled={isSubmitting}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
