import axios from 'axios'

// SWITCH IP ADDRESS
import myIPaddress from '../../../IPaddress'

// action types
const GET_USER = 'GET_USER'
const CHECK_EMAIL = 'CHECK_EMAIL'
const REMOVE_USER = 'REMOVE_USER'

// initial state
const defaultUser = {}

// action creators
const getUser = user => ({type: GET_USER, user})
const checkEmailAction = email => ({type: CHECK_EMAIL, email})
const removeUser = () => ({type: REMOVE_USER})

// thunks
export const me = () => async dispatch => {
  try {
    const res = await axios.get(`http://${myIPaddress.IP}:8080/auth/me`)
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    next(err)
  }
}

export const checkEmail = email => async dispatch => {
  try {
    const {data} = await axios.get(
      `http://${myIPaddress.IP}:8080/auth/check/${email}`
    )
    dispatch(checkEmailAction(data))
  } catch (checkError) {
    return dispatch(checkEmailAction({error: checkError}))
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`http://${myIPaddress.IP}:8080/auth/${method}`, {
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    next(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post(`http://${myIPaddress.IP}:8080/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    next(err)
  }
}

// reducer
export default (userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case CHECK_EMAIL:
      return action.email
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
})
