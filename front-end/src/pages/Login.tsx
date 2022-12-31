import { FormEvent } from 'react'

export const LoginPage = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <div className="h-screen flex justify-center items-center bg-page-gradient">
      <div className="p-4 w-96 rounded-md border border-slate-800 backdrop-blur[12px] bg-slate-300/5">
        <h1 className="text-4xl pt-4 pb-10 text-center text-white">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="login-label">
            Username
            <input
              type="text"
              placeholder="username"
              className="login-input w-full"
            />
          </label>
          <label className="login-label">
            Password
            <input
              type="text"
              placeholder="password"
              className="login-input w-full"
            />
          </label>

          <label className="flex gap-2 text-white">
            <input type="checkbox" aria-label="remember me" />
            Remember me
          </label>
          <button
            type="submit"
            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
