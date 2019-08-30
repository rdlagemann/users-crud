import compose from 'ramda/src/compose'

export const STORAGE_PREFIX = 'frontend-test'
export const AUTH_KEY_STORAGE = `${STORAGE_PREFIX}.isAuth`
export const USER_INFO_STORAGE = `${STORAGE_PREFIX}.userData`

export const saveAuthKey = value => localStorage.setItem(AUTH_KEY_STORAGE, value)
export const saveUserData = userData =>
  localStorage.setItem(USER_INFO_STORAGE, JSON.stringify(userData))
export const getUserData = () => JSON.parse(localStorage.getItem(USER_INFO_STORAGE))
export const saveAuth = compose(
  saveAuthKey,
  Boolean,
  getUserData,
  saveUserData
)
export const removeAuthKey = () => localStorage.removeItem(AUTH_KEY_STORAGE)
export const removeUserData = () => localStorage.removeItem(USER_INFO_STORAGE)
export const removeAuth = () => {
  removeAuthKey()
  removeUserData()
}
export const getAuth = () => localStorage.getItem(AUTH_KEY_STORAGE)
export const isAuth = compose(
  Boolean,
  JSON.parse,
  getAuth
)
