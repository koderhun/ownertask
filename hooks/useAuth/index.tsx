import React from 'react'

import Cookies from 'universal-cookie'
import {verifyJwtToken} from '@/libs/auth'

interface Cookie {
  value: string
}

const fromServer = async (): Promise<any> => {
  const cookies = require('next/headers').cookies
  console.log(cookies, 'cookies')
  const cookieList = cookies()
  const {value: token}: Cookie = cookieList.get('token') ?? {value: ''}
  const verifiedToken = await verifyJwtToken(token)

  return verifiedToken
}

export function useAuth() {
  const [auth, setAuth] = React.useState<any>(null)

  const getVerifiedtoken = async () => {
    const cookies = new Cookies()
    const token = cookies.get('token') ?? null
    const verifiedToken = await verifyJwtToken(token)
    setAuth(verifiedToken)
  }

  React.useEffect(() => {
    getVerifiedtoken()
  }, [])

  return auth
}

useAuth.fromServer = fromServer
