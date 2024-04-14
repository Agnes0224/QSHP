import { IdasAuthResult } from '@/common/interfaces/response'
import { authService, authServiceWithUser, commonUrl } from '@/utils/request'

const authUrl = `${commonUrl}/auth`

export type EphemeralAuthorization = {
  code: string
  ephemeral_authorization: string
}

export type AuthorizationResult = {
  authorization: string
}

export const signIn = (params: {
  username: string
  password: string
  keep_signed_in: boolean
  captcha_value?: string
  captcha_type?: string
}) => {
  return authServiceWithUser.post<AuthorizationResult>(
    `${authUrl}/signin`,
    {
      username: params.username,
      password: params.password,
      keep_signed_in: params.keep_signed_in,
    },
    {
      headers: {
        ...(params.captcha_value && {
          'X-UESTC-BBS-Captcha': params.captcha_value,
        }),
        ...(params.captcha_type && {
          'X-UESTC-BBS-Captcha-Type': params.captcha_type,
        }),
      },
    }
  )
}

export const idasAuth = (params: {
  continue: string
  code: string
  signin?: boolean
  version?: number
}) => {
  return authServiceWithUser.post<IdasAuthResult>(`${authUrl}/idas`, params)
}

export const idasChooseUser = (
  params: EphemeralAuthorization & {
    user_id: number
  }
) => {
  return authServiceWithUser.post<AuthorizationResult>(
    `${authUrl}/signin/user`,
    params
  )
}

export const idasFreshman = (params: EphemeralAuthorization) => {
  return authServiceWithUser.post<AuthorizationResult>(
    `${authUrl}/signin/freshman`,
    params
  )
}

export const checkUserName = (
  params: EphemeralAuthorization & {
    username: string
  }
) => {
  return authService.post<boolean>(`${authUrl}/register/check`, params)
}

export const register = (
  params: EphemeralAuthorization & {
    username: string
    password: string
    email: string
    invitation?: string
  }
) => {
  return authServiceWithUser.post<AuthorizationResult>(
    `${authUrl}/register`,
    params
  )
}

export const signOut = () => {
  return authService.post(`${authUrl}/signout`)
}
