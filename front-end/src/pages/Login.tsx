import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../components/Input'
import { useSession } from '../contexts/UserContext'
import { useEffect } from 'react'
import { redirect, Router, useNavigate, useRoutes } from 'react-router-dom'

const loginSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    'remember-me': z.boolean().default(false),
  })
  .refine(
    (values) => values.password.length > 0 && values.username.length > 0,
    {
      message: 'Username and password are both required',
      path: ['username'],
    },
  )
  .refine(
    (values) => values.password.length > 0 && values.username.length > 0,
    {
      message: 'Username and password are both required',
      path: ['password'],
    },
  )
  .refine(
    (values) =>
      values.password === 'sh@r3n3rgy' &&
      values.username === 'desafiosharenergy',
    {
      message: 'Wrong email or password',
      path: ['username'],
    },
  )
  .refine(
    (values) =>
      values.password === 'sh@r3n3rgy' &&
      values.username === 'desafiosharenergy',
    {
      message: 'Wrong email or password',
      path: ['password'],
    },
  )

type LoginData = z.infer<typeof loginSchema>

export const LoginPage = () => {
  const { username, handleSetUsername } = useSession()

  const navigate = useNavigate()

  useEffect(() => {
    if (username) navigate('/dashboard')
  }, [username, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    reValidateMode: 'onSubmit',
  })

  const handleLogin = (data: LoginData) => {
    if (data['remember-me']) {
      handleSetUsername(data.username, true)
    } else {
      handleSetUsername(data.username)
    }

    return data
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
            {...register('username')}
          />
          <Input
            label="Password"
            error={errors.password}
            placeholder="Password"
            {...register('password')}
          />

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
