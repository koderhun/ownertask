'use client'
import React, {FC, FormEvent} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'

export const LoginForm: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = React.useState<boolean>(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(false)

    const formData = new FormData(event.target as HTMLFormElement)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })

    const {success} = await res.json()

    if (success) {
      const nextUrl = searchParams.get('next')
      router.push(nextUrl ?? '/coins')
      router.refresh()
    } else {
      console.error('Incorrect username or password')
      setError(true)
    }
  }

  return (
    <div className=" dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl shadow-2xl">
        <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
          </svg>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="p-12 md:p-24">
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
            </svg>
            <input
              type="email"
              id="username"
              name="username"
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              required
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
            </svg>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">
            Login
          </button>

          {error && (
            <div
              className="mt-6 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert">
              <span className="font-medium">Danger!</span> Incorrect login or
              password
            </div>
          )}

          <div
            className="mt-8 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert">
            <p className="font-bold">user@ya.ru</p>
            <p className="text-sm">123456Up</p>
          </div>
        </form>
      </div>
    </div>
  )
}
